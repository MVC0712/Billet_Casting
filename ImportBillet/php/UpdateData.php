<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$targetId = "";
$import_date = "";
$billet_position = "";
$bundle = "";
$billet_length = "";
$quantity = "";
$note = "";

$targetId = $_POST["targetId"];
$import_date = $_POST["import_date"];
$billet_position = $_POST["billet_position"];
$bundle = $_POST["bundle"];
$billet_length = $_POST["billet_length"];
$quantity = $_POST["quantity"];
$note = $_POST["note"];

try {
    $sql = "UPDATE t_import SET
        import_date = '$import_date',
        billet_position = '$billet_position',
        bundle = '$bundle',
        billet_length = '$billet_length',
        quantity = '$quantity',
        note = '$note'
    WHERE id = '$targetId'";

    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>