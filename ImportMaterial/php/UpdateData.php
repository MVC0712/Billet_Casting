<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$id = "";
$note = "";

$id = $_POST["id"];
$note = $_POST["note"];

try {
    $sql = "UPDATE t_import_material SET
        note = '$note'
    WHERE id = '$id'";

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>