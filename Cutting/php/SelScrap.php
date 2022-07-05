<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$t_casting = "";
$t_casting = $_POST['t_casting'];
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "SELECT 
    id, scrap_type, scrap_weight, scrap_note
FROM
t_scrap
    WHERE
    casting_id  = '$t_casting';";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>