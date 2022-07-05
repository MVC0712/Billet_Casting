<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$data = file_get_contents('php://input');
$data_json = json_decode($data); 

$targetId = array_pop($data_json);

try {
    if(count($data_json) > 0){
        foreach($data_json as $val){
          $sql_paramater[] = "('{$targetId}', '{$val[1]}', '{$val[2]}', '{$val[3]}')";
        }
        $sql = "DELETE FROM t_scrap WHERE casting_id = '$targetId'";
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();

        $sql = "INSERT INTO t_scrap (casting_id, scrap_type, scrap_weight, scrap_note) VALUES ".join(",", $sql_paramater);
        $stmt = $dbh->getInstance()->prepare($sql);
        $stmt->execute();
      }
      echo json_encode("INSERTED");
} 
catch(PDOException $e) {
    echo $e;
}
?>