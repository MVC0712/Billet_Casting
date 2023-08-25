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
    CASE
        WHEN LEFT(code_name, 3) = 'N11' THEN 'N11'
        WHEN LEFT(code_name, 3) = 'N14' THEN 'N14'
        ELSE 'V44'
    END AS origin,
    material_type,
    SUM(weight) AS weight
FROM
    t_import_material
        LEFT JOIN
    m_material_type ON t_import_material.material_type_id = m_material_type.id
WHERE t_import_material.import_date BETWEEN '$start' AND '$end'
        AND (t_import_material.code_name LIKE '%$search%' 
        OR material_type LIKE '%$search%')
        GROUP BY material_type_id , origin
ORDER BY origin ASC , material_type ASC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>