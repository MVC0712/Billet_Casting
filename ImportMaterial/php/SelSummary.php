<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$start = $_POST['start'];
$end = $_POST['end'];
$search = $_POST['search'];
try {
    $sql = "SELECT 
    t_import_material.id, import_date, code_name, material_type, weight
    FROM t_import_material
        LEFT JOIN
    m_material_type ON t_import_material.material_type_id = m_material_type.id
    WHERE t_import_material.import_date BETWEEN '$start' AND '$end'
        AND (t_import_material.code_name LIKE '%$search%' 
        OR material_type LIKE '%$search%')
    ORDER BY id ASC";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>