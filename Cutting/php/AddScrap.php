<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$casting_id = "";
$scrap_type = "";
$scrap_weight = "";
$scrap_note = "";

$casting_id = $_POST['casting_id'];
$scrap_type = $_POST['scrap_type'];
$scrap_weight = $_POST['scrap_weight'];
$scrap_note = $_POST['scrap_note'];

try {
    $sql = "INSERT INTO t_scrap (casting_id, scrap_type, scrap_weight, scrap_note
      ) VALUES (
          '$casting_id', '$scrap_type', '$scrap_weight', '$scrap_note'
      )";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode("INSERTED");
} 
catch(PDOException $e) {
    echo $e;
}
?>