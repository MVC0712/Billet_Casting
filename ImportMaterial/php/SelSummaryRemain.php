<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
try {
    $sql = "SELECT 
    CASE
        WHEN LEFT(code_name, 3) = 'N11' THEN 'N11'
        WHEN LEFT(code_name, 3) = 'N14' THEN 'N14'
        ELSE 'V44'
    END AS origin,
    material_name_type,
    SUM(weight) AS weight
FROM
    t_import_material
        LEFT JOIN
    m_material_name_type ON m_material_name_type.id = t_import_material.material_type_id
WHERE
    t_import_material.id NOT IN (SELECT 
            import_material_id
        FROM
            t_add_material
        WHERE
            import_material_id IS NOT NULL)
        AND t_import_material.code_name NOT IN (SELECT 
            note
        FROM
            t_add_material)
GROUP BY material_type_id , origin
ORDER BY origin ASC , material_name_type ASC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>