<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$start = $_POST['start'];
$end = $_POST['end'];
try {
    $sql = "SELECT 
    SUM(weight) AS ingot_input
FROM
    billet_casting.t_add_material
        LEFT JOIN
    t_casting ON t_casting.id = t_add_material.t_casting
        LEFT JOIN
    m_material_name_type ON m_material_name_type.id = t_add_material.material_type
        LEFT JOIN
    m_material_name ON m_material_name_type.material_name_id = m_material_name.id
WHERE
    m_material_name.id = 6
        AND t_casting.product_date BETWEEN '$start' AND '$end'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>