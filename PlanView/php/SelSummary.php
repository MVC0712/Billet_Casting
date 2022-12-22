<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$start_s = "";
$end_s = "";
$sql ="";
$sql1 = "";
// $start_s = $_POST['start_s'];
// $end_s = $_POST['end_s'];
$start_s = '2022-07-01';
$end_s = '2022-07-05';

$begin = new DateTime($start_s);
$end = new DateTime($end_s);
$end = $end->modify( '+1 day' );
$interval = DateInterval::createFromDateString('1 day');
$period = new DatePeriod($begin, $interval, $end);
foreach ($period as $dt) {
  $di = $dt->format("Y-m-d");
  $din = $dt->format("Ymd");
}
$sql1 = $sql1."
SELECT 
id,
  '2' AS o,
  product_type,
";
foreach ($period as $dt) {
  $di = $dt->format("Y-m-d");
  $din = $dt->format("Ymd");
  $sql1 = $sql1 ." MAX(CASE WHEN 
    t_casting.product_date = '" . $di . "' 
  THEN 
    t_casting.water_temp else '' END) AS '_" . $din ."',";
}
  $sql2 = substr(trim($sql1), 0, -1);
  $sql2 = $sql2." FROM
  t_casting
UNION SELECT 
id,
'1' AS o,
t_plan.product_type,
";
  $sql3="";
  foreach ($period as $dtp) {
  $dp = $dtp->format("Y-m-d");
  $dpn = $dtp->format("Ymd");
  $sql3 = $sql3 ." MAX(CASE WHEN 
    t_plan.product_date ='". $dp ."' 
  THEN 
    t_plan.code else '' END) AS '_". $dpn ."',";
}
  $sql3 = substr(trim($sql3), 0, -1);
  $sql3 = $sql3." FROM
  t_plan
ORDER BY o ASC;
  ";
  $sql = $sql2.$sql3;
  print_r($sql);
try {
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>