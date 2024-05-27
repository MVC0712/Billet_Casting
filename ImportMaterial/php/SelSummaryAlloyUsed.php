<?php
    require_once('../../connection.php');
    $dbh = new DBHandler();
    if ($dbh->getInstance() === null) {
        die("No database connection");
    }
    try {
        $sql = "SELECT 
        SUM(t10000.tt_ppig) AS IG,
        ROUND(SUM(input_cr_1 + input_cr_2), 1) AS CR,
        ROUND(SUM(input_cu_1 + input_cu_2), 1) AS CU,
        ROUND(SUM(input_mg_1 + input_mg_2), 1) AS MG,
        ROUND(SUM(input_mn_1 + input_mn_2), 1) AS MN,
        ROUND(SUM(input_si_1 + input_si_2), 1) AS SI,
        ROUND(SUM(input_ti_b_1 + input_ti_b_1), 1) AS TI,
        ROUND(SUM(input_zn_1 + input_zn_2), 1) AS ZN
    FROM
        t_casting
            LEFT JOIN
        (SELECT 
            t_add_material.t_casting AS ppig_id,
                t_casting.code,
                SUM(weight) AS tt_ppig
        FROM
            billet_casting.t_add_material
        LEFT JOIN t_casting ON t_casting.id = t_add_material.t_casting
        LEFT JOIN m_material_name_type ON m_material_name_type.id = t_add_material.material_type
        LEFT JOIN m_material_name ON m_material_name_type.material_name_id = m_material_name.id
        WHERE
            m_material_name.id = 6
        GROUP BY t_add_material.t_casting) t10000 ON t_casting.id = t10000.ppig_id;";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    } 
    catch(PDOException $e) {
        echo $e;
    }
?>
