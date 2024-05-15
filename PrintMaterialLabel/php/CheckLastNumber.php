<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$origin_code = $_POST['origin_code'];
try {
    $sql = "SELECT
    CONVERT(SUBSTRING_INDEX(code_name, '-', -1), UNSIGNED INTEGER) AS last_numbers
    FROM
        t_import_material
    WHERE
        t_import_material.code_name  LIKE '%$origin_code%'
    ORDER BY last_numbers DESC
    LIMIT 1";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>