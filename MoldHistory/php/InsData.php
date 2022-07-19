<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}

$A2CGR = $_POST['A2CGR'];
$A2CTH = $_POST['A2CTH'];
$A2MID = $_POST['A2MID'];
$A2RE = $_POST['A2RE'];
$A3CGR = $_POST['A3CGR'];
$A3CTH = $_POST['A3CTH'];
$A3MID = $_POST['A3MID'];
$A3RE = $_POST['A3RE'];
$B1CGR = $_POST['B1CGR'];
$B1CTH = $_POST['B1CTH'];
$B1MID = $_POST['B1MID'];
$B1RE = $_POST['B1RE'];
$B2CGR = $_POST['B2CGR'];
$B2CTH = $_POST['B2CTH'];
$B2MID = $_POST['B2MID'];
$B2RE = $_POST['B2RE'];
$B3CGR = $_POST['B3CGR'];
$B3CTH = $_POST['B3CTH'];
$B3MID = $_POST['B3MID'];
$B3RE = $_POST['B3RE'];
$B4CGR = $_POST['B4CGR'];
$B4CTH = $_POST['B4CTH'];
$B4MID = $_POST['B4MID'];
$B4RE = $_POST['B4RE'];
$C1CGR = $_POST['C1CGR'];
$C1CTH = $_POST['C1CTH'];
$C1MID = $_POST['C1MID'];
$C1RE = $_POST['C1RE'];
$C2CGR = $_POST['C2CGR'];
$C2CTH = $_POST['C2CTH'];
$C2MID = $_POST['C2MID'];
$C2RE = $_POST['C2RE'];
$C3CGR = $_POST['C3CGR'];
$C3CTH = $_POST['C3CTH'];
$C3MID = $_POST['C3MID'];
$C3RE = $_POST['C3RE'];
$C4CGR = $_POST['C4CGR'];
$C4CTH = $_POST['C4CTH'];
$C4MID = $_POST['C4MID'];
$C4RE = $_POST['C4RE'];
$D2CGR = $_POST['D2CGR'];
$D2CTH = $_POST['D2CTH'];
$D2MID = $_POST['D2MID'];
$D2RE = $_POST['D2RE'];
$D3CGR = $_POST['D3CGR'];
$D3CTH = $_POST['D3CTH'];
$D3MID = $_POST['D3MID'];
$D3RE = $_POST['D3RE'];
$check_date = $_POST['check_date'];
$file_url = $_POST['file_url'];

try {
    $sql = "INSERT INTO t_mold_history(
        A2CGR, A2CTH, A2MID, A2RE, A3CGR, A3CTH, A3MID, A3RE, 
        B1CGR, B1CTH, B1MID, B1RE,  B2CGR, B2CTH, B2MID, B2RE, 
        B3CGR, B3CTH, B3MID, B3RE, B4CGR, B4CTH, B4MID, B4RE,
        C1CGR, C1CTH, C1MID, C1RE, C2CGR, C2CTH, C2MID, C2RE, 
        C3CGR, C3CTH, C3MID, C3RE, C4CGR, C4CTH, C4MID, C4RE, 
        D2CGR, D2CTH, D2MID, D2RE, D3CGR, D3CTH, D3MID, D3RE, 
        check_date, file_url) VALUES (
        '$A2CGR', '$A2CTH', '$A2MID', '$A2RE', '$A3CGR', '$A3CTH', '$A3MID', '$A3RE', 
        '$B1CGR', '$B1CTH', '$B1MID', '$B1RE', '$B2CGR', '$B2CTH', '$B2MID', '$B2RE', 
        '$B3CGR', '$B3CTH', '$B3MID', '$B3RE', '$B4CGR', '$B4CTH', '$B4MID', '$B4RE',
        '$C1CGR', '$C1CTH', '$C1MID', '$C1RE', '$C2CGR', '$C2CTH', '$C2MID', '$C2RE', 
        '$C3CGR', '$C3CTH', '$C3MID', '$C3RE', '$C4CGR', '$C4CTH', '$C4MID', '$C4RE', 
        '$D2CGR', '$D2CTH', '$D2MID', '$D2RE', '$D3CGR', '$D3CTH', '$D3MID', '$D3RE', 
        '$check_date', '$file_url')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();

    $stmt = $dbh->getInstance()->prepare("SELECT MAX(t_mold_history.id) AS id FROM t_mold_history");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>