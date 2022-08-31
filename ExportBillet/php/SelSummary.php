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
    t_export.id,
    DATE_FORMAT(export_date, '%y-%m-%d') AS export_date,
    t_casting.code,
    t_import.bundle,
    m_material_type.material_type,
    CASE
        WHEN billet_length = 1 THEN 1200
        ELSE 600
    END AS billet_length,
    t_import.quantity,
    t_export.note
FROM
    billet_casting.t_export
        LEFT JOIN
    t_import ON t_import.id = t_export.import_id
        LEFT JOIN
    t_casting ON t_casting.id = t_import.casting_id
        LEFT JOIN
    m_material_type ON m_material_type.id = t_casting.product_type
    WHERE t_export.export_date BETWEEN '$start' AND '$end'
    ORDER BY t_casting.code DESC";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>