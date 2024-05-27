<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
  $data = "";
  $import_date = "";
  $staff_id = "";

  $data = $_POST['data'];
  $import_date = $_POST['import_date'];
  $staff_id = $_POST['staff_id'];
  $data_json = json_decode($data);

try {
    foreach ($data_json as $val) {
        $sql_paramater[] = "('{$val[0]}', '{$val[1]}', '{$val[2]}', '{$val[3]}', '{$import_date}', '{$staff_id}')";
    };
    $sql = "INSERT INTO t_import_material ";
    $sql = $sql."(code_name ,material_type_id, weight, note, import_date, staff_id) VALUES ";
    $sql = $sql.join(",", $sql_paramater);

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo ($e->errorInfo[2]);
}
?>