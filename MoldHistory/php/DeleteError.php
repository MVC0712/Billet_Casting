<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$error_id = "";
$error_id = $_POST['error_id'];

try {
    $sql = "DELETE FROM t_mold_error WHERE id = '$error_id'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode("DELETED");
} 
catch(PDOException $e) {
    echo $e;
}
?>