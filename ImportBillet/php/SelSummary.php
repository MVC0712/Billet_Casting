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
    t_import.id,
    import_date,
    t_casting.code,
    CASE
        WHEN bundle <= 9 THEN CONCAT(0, bundle)
        ELSE bundle
    END AS bundle,
    m_material_type.material_type,
    billet_length,
    billet_position,
    quantity,
    note
FROM
    t_import
        LEFT JOIN
    t_casting ON t_casting.id = t_import.casting_id
        LEFT JOIN
    m_material_type ON t_casting.product_type = m_material_type.id
    WHERE t_import.import_date BETWEEN '$start' AND '$end'
    ORDER BY t_casting.code DESC";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>