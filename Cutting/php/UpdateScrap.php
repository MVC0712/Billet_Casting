<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$id = "";
$scrap_type = "";
$scrap_weight = "";
$scrap_note = "";

$id = $_POST['id'];
$scrap_type = $_POST['scrap_type'];
$scrap_weight = $_POST['scrap_weight'];
$scrap_note = $_POST['scrap_note'];

try {
    $sql = "UPDATE t_scrap SET 
    scrap_type = '$scrap_type',
    scrap_weight = '$scrap_weight',
    scrap_note = '$scrap_note'
     WHERE id = '$id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode("INSERTED");
} 
catch(PDOException $e) {
    echo $e;
}
?>