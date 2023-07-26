<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$search = $_POST['search'];
try {
    $sql = "SELECT 
    t_import_material.id,
    import_date,
    code_name,
    material_type,
    weight
FROM
    t_import_material
        LEFT JOIN
    m_material_type ON t_import_material.material_type_id = m_material_type.id
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
        AND (t_import_material.code_name LIKE '%$search%'
        OR material_type LIKE '%$search%');
    ORDER BY id DESC";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>