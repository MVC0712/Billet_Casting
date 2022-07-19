<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$id = $_POST['id'];
$position = $_POST['position'];
$error = $_POST['error'];
$note = $_POST['note'];

$datetime = date("Y-m-d H:i:s");
try {
    $sql = "UPDATE t_mold_error SET 
    position = '$position',
    error = '$error',
    note = '$note'
    WHERE id= '$id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>