<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$mold_history_id = "";
$material = "";
$error = "";
$note = "";

$mold_history_id = $_POST['mold_history_id'];
$material = $_POST['material'];
$error = $_POST['error'];
$note = $_POST['note'];

try {
    $sql = "INSERT INTO t_mold_error (mold_history_id, position, error, note
        ) VALUES (
            '$mold_history_id', '$position', '$error', '$note'
        )";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode("INSERTED");
} 
catch(PDOException $e) {
    echo $e;
}
?>