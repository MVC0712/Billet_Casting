<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$code_input = $_POST['code_input'];
try {
    $sql = "SELECT 
    t_import.id,
    DATE_FORMAT(import_date, '%y-%m-%d') AS import_date,
    CONCAT(t_casting.code,
            '.',
            CASE
                WHEN bundle <= 9 THEN CONCAT(0, bundle)
                ELSE bundle
            END,
            '-A',
            m_material_type.material_type,
            ':',
            quantity) AS lbm,
    CASE
        WHEN billet_length = 1 THEN 1200
        ELSE 600
    END AS billet_length
FROM
    t_import
        LEFT JOIN
    t_casting ON t_casting.id = t_import.casting_id
        LEFT JOIN
    m_material_type ON t_casting.product_type = m_material_type.id
WHERE
    t_import.id NOT IN (SELECT 
            import_id
        FROM
            t_export)
            AND t_casting.code LIKE '%$code_input%' OR material_type LIKE '%$code_input%'
            
ORDER BY t_casting.code DESC";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>