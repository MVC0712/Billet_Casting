<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$homo_id = $_POST['targetId'];
$time = $_POST['time'];
$area1_1 = $_POST['area1_1'];
$area1_2 = $_POST['area1_2'];
$area2 = $_POST['area2'];
$area3_1 = $_POST['area3_1'];
$area3_2 = $_POST['area3_2'];
$staff_id = $_POST['staff_id'];
try {
    $sql = "INSERT INTO t_homo_temp
    (homo_id, time, area1_1, area1_2, area2, area3_1, area3_2, staff_id) VALUES 
    ('$homo_id', '$time', '$area1_1', '$area1_2', '$area2', '$area3_1', '$area3_2', '$staff_id')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>