<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$code_input = $_POST['code_input'];
try {
    $sql = "SELECT 
    t_casting.id,
    DATE_FORMAT(product_date,'%y/%m/%d') AS product_date,
    code,
    material_type
FROM
    billet_casting.t_casting
        LEFT JOIN
    m_material_type ON m_material_type.id = t_casting.product_type
    WHERE t_casting.code LIKE '%$code_input%' OR material_type LIKE '%$code_input%'
    ORDER BY product_date DESC;";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>