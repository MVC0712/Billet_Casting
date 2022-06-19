<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$data = file_get_contents('php://input');
$data_json = json_decode($data); 

$selected_id = array_pop($data_json);

try {

    if(count($data_json) > 0){
        foreach($data_json as $val){
          $sql_paramater[] = "('{$selected_id}', '{$val[2]}', '{$val[3]}', '{$val[4]}')";
        }
        $sql = "INSERT INTO t_add_material (t_casting, material_type, 'weight', note) VALUES ".join(",", $sql_paramater);
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
      }
      echo json_encode("INSERTED");
} 
catch(PDOException $e) {
    echo $e;
}
?>