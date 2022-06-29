<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$id = $_POST['targetId'];
$mea_date = $_POST['mea_date'];
$file_url_1 = $_POST['file_url_1'];
$file_url_2 = $_POST['file_url_2'];
$file_url_3 = $_POST['file_url_3'];
try {
    $sql = "UPDATE t_mea_file SET 
    mea_date = '$mea_date' ,
    file_url_1 = '$file_url_1' ,
    file_url_2 = '$file_url_2' ,
    file_url_3 = '$file_url_3'
    WHERE id= '$id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>