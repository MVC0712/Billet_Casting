<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
  $data = "";
  $import_date = "";

  $data = $_POST['data'];
  $import_date = $_POST['import_date'];
  $data_json = json_decode($data);

try {
    foreach ($data_json as $val) {
        $sql_paramater[] = "('{$val[0]}', '{$val[2]}', '{$val[4]}', '{$val[5]}', '{$val[6]}', '{$val[7]}', '{$import_date}')";
    };
    $sql = "INSERT INTO t_import ";
    $sql = $sql."(casting_id ,bundle, billet_length, billet_position, quantity, note, import_date) VALUES ";
    $sql = $sql.join(",", $sql_paramater);

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>