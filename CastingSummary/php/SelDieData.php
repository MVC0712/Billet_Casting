<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$start = $_POST['start'];
$end = $_POST['end'];
try {
    $sql = "SELECT 
    'Fix' AS ng, COUNT(*)
FROM
    extrusion.t_dies_status
WHERE
    do_sth_at BETWEEN '$start' AND '$end'
        AND (die_status_id = 7 OR die_status_id = 9) 
UNION SELECT 
    'NG' AS ng, COUNT(*)
FROM
    extrusion.t_dies_status
WHERE
    do_sth_at BETWEEN '$start' AND '$end'
        AND (die_status_id = 31 OR die_status_id = 31) 
UNION SELECT 
    'Wash' AS ng, COUNT(*)
FROM
    extrusion.t_dies_status
WHERE
    do_sth_at BETWEEN '$start' AND '$end'
        AND die_status_id = 4;
        ";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>