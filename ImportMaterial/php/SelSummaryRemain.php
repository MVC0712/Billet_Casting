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
            WHEN LEFT(code_name, 3) = 'V44' THEN 'V44'
            WHEN LEFT(code_name, 3) = 'V33' THEN 'V33'
            ELSE 'N97'
        END AS origin,
        material_type,
        ROUND(SUM(weight), 1) AS weight
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
        AND material_type_id != 10
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
