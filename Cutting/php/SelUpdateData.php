<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$targetId = "";
$targetId = $_POST['targetId'];
try {
    $sql = "SELECT 
    A2CE, A2CH, A2E, A2EE, A2EH, A2H, A2L, A2Q6, A2Q12, A2S, A2TL, 
    A3CE, A3CH, A3E, A3EE, A3EH, A3H, A3L, A3Q6, A3Q12, A3S, A3TL, 
    B1CE, B1CH, B1E, B1EE, B1EH, B1H, B1L, B1Q6, B1Q12, B1S, B1TL, 
    B2CE, B2CH, B2E, B2EE, B2EH, B2H, B2L, B2Q6, B2Q12, B2S, B2TL, 
    B3CE, B3CH, B3E, B3EE, B3EH, B3H, B3L, B3Q6, B3Q12, B3S, B3TL, 
    B4CE, B4CH, B4E, B4EE, B4EH, B4H, B4L, B4Q6, B4Q12, B4S, B4TL, 
    C1CE, C1CH, C1E, C1EE, C1EH, C1H, C1L, C1Q6, C1Q12, C1S, C1TL, 
    C2CE, C2CH, C2E, C2EE, C2EH, C2H, C2L, C2Q6, C2Q12, C2S, C2TL, 
    C3CE, C3CH, C3E, C3EE, C3EH, C3H, C3L, C3Q6, C3Q12, C3S, C3TL, 
    C4CE, C4CH, C4E, C4EE, C4EH, C4H, C4L, C4Q6, C4Q12, C4S, C4TL, 
    D2CE, D2CH, D2E, D2EE, D2EH, D2H, D2L, D2Q6, D2Q12, D2S, D2TL, 
    D3CE, D3CH, D3E, D3EE, D3EH, D3H, D3L, D3Q6, D3Q12, D3S, D3TL FROM t_cutting 
WHERE casting_id = '$targetId'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>