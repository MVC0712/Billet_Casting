<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$datetime = date("Y-m-d H:i:s");
try {
    $sql = "SELECT 
    t_casting.id,
    code,
    material_type,
    DATE_FORMAT(product_date, '%y-%m-%d') AS product_date,
    CASE
        WHEN t10.exist > 0 THEN 'Đã lưu'
        ELSE 'C lưu'
    END AS confirm
FROM
    billet_casting.t_casting
        LEFT JOIN
    m_material_type ON m_material_type.id = t_casting.product_type
    LEFT JOIN
    (SELECT 
        t_cutting.casting_id, COUNT(*) AS exist
    FROM
        t_cutting
    GROUP BY t_cutting.casting_id) AS t10 ON t10.casting_id = t_casting.id
    ORDER BY product_date DESC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>