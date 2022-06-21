<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "SELECT 
    t_casting.id,
    code,
    material_type,
    DATE_FORMAT(casting_start, '%y-%m-%d') AS casting_start
FROM
    billet_casting.t_casting
        LEFT JOIN
    m_material_type ON m_material_type.id = t_casting.product_type
    ORDER BY casting_start DESC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>