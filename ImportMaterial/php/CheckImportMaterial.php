<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$code_name = $_POST['code_name'];
try {
    $sql = "SELECT 
    t_import_material.id,
    code_name
    FROM
        t_import_material
    WHERE
        t_import_material.code_name  = '$code_name'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>