<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$material = "";
$material = $_POST['material'];
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "SELECT 
    *
    FROM
        billet_casting.m_material_element
    WHERE
        material_type = '$material';)";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>