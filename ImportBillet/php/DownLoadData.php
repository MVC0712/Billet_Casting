<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$file_path = "../../download/" . $_POST["file_name"] . ".csv";
$export_csv_title = ["die_number"];
try {
    $export_sql = "SELECT 
    t_import.id,
    DATE_FORMAT(import_date, '%y-%m-%d') AS import_date,
    t_casting.code,
    CASE
        WHEN bundle <= 9 THEN CONCAT(0, bundle)
        ELSE bundle
    END AS bundle,
    m_material_type.material_type,
    CASE
        WHEN billet_length = 1 THEN 1200
        ELSE 600
    END AS billet_length,
    CASE
        WHEN billet_position =0 THEN '--'
        WHEN billet_position =1 THEN 'A2'
        WHEN billet_position =2 THEN 'A3'
        WHEN billet_position =3 THEN 'B1'
        WHEN billet_position =4 THEN 'B2'
        WHEN billet_position =5 THEN 'B3'
        WHEN billet_position =6 THEN 'B4'
        WHEN billet_position =7 THEN 'C1'
        WHEN billet_position =8 THEN 'C2'
        WHEN billet_position =9 THEN 'C3'
        WHEN billet_position =10 THEN 'C4'
        WHEN billet_position =11 THEN 'D2'
        WHEN billet_position =12 THEN 'D3'
        ELSE billet_position
    END AS billet_position,
    quantity,
    note
FROM
    t_import
        LEFT JOIN
    t_casting ON t_casting.id = t_import.casting_id
        LEFT JOIN
    m_material_type ON t_casting.product_type = m_material_type.id;";

    foreach ($export_csv_title as $key => $val) {
        $export_header[] = mb_convert_encoding($val, 'UTF-8', 'UTF-8');
    }

    if (touch($file_path)) {
        $file = new SplFileObject($file_path, "w");
        $file->fputcsv($export_header);
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
        while ($row = $stmt->fetchAll(PDO::FETCH_ASSOC)) {
            $file->fputcsv(mb_convert_encoding($row, 'UTF-8', 'UTF-8'));
        }
    }
    echo json_encode("Made a CSV file aa");
} catch(PDOException $e) {
    echo $e;
}
?>
