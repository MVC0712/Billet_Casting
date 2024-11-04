<?php
require_once('../../connection.php');
$dbh = new DBHandler();
if ($dbh->getInstance() === null) {
    die("No database connection");
}
$A2CE = $_POST['A2CE'];
$A2CH = $_POST['A2CH'];
$A2E = $_POST['A2E'];
$A2EE = $_POST['A2EE'];
$A2EH = $_POST['A2EH'];
$A2H = $_POST['A2H'];
$A2L = $_POST['A2L'];
$A2Q6 = $_POST['A2Q6'];
$A2Q12 = $_POST['A2Q12'];
$A2Q6TT = $_POST['A2Q6TT'];
$A2Q12TT = $_POST['A2Q12TT'];
$A2S = $_POST['A2S'];
$A2TL = $_POST['A2TL'];
$A3CE = $_POST['A3CE'];
$A3CH = $_POST['A3CH'];
$A3E = $_POST['A3E'];
$A3EE = $_POST['A3EE'];
$A3EH = $_POST['A3EH'];
$A3H = $_POST['A3H'];
$A3L = $_POST['A3L'];
$A3Q6 = $_POST['A3Q6'];
$A3Q12 = $_POST['A3Q12'];
$A3Q6TT = $_POST['A3Q6TT'];
$A3Q12TT = $_POST['A3Q12TT'];
$A3S = $_POST['A3S'];
$A3TL = $_POST['A3TL'];
$B1CE = $_POST['B1CE'];
$B1CH = $_POST['B1CH'];
$B1E = $_POST['B1E'];
$B1EE = $_POST['B1EE'];
$B1EH = $_POST['B1EH'];
$B1H = $_POST['B1H'];
$B1L = $_POST['B1L'];
$B1Q6 = $_POST['B1Q6'];
$B1Q12 = $_POST['B1Q12'];
$B1Q6TT = $_POST['B1Q6TT'];
$B1Q12TT = $_POST['B1Q12TT'];
$B1S = $_POST['B1S'];
$B1TL = $_POST['B1TL'];
$B2CE = $_POST['B2CE'];
$B2CH = $_POST['B2CH'];
$B2E = $_POST['B2E'];
$B2EE = $_POST['B2EE'];
$B2EH = $_POST['B2EH'];
$B2H = $_POST['B2H'];
$B2L = $_POST['B2L'];
$B2Q6 = $_POST['B2Q6'];
$B2Q12 = $_POST['B2Q12'];
$B2Q6TT = $_POST['B2Q6TT'];
$B2Q12TT = $_POST['B2Q12TT'];
$B2S = $_POST['B2S'];
$B2TL = $_POST['B2TL'];
$B3CE = $_POST['B3CE'];
$B3CH = $_POST['B3CH'];
$B3E = $_POST['B3E'];
$B3EE = $_POST['B3EE'];
$B3EH = $_POST['B3EH'];
$B3H = $_POST['B3H'];
$B3L = $_POST['B3L'];
$B3Q6 = $_POST['B3Q6'];
$B3Q12 = $_POST['B3Q12'];
$B3Q6TT = $_POST['B3Q6TT'];
$B3Q12TT = $_POST['B3Q12TT'];
$B3S = $_POST['B3S'];
$B3TL = $_POST['B3TL'];
$B4CE = $_POST['B4CE'];
$B4CH = $_POST['B4CH'];
$B4E = $_POST['B4E'];
$B4EE = $_POST['B4EE'];
$B4EH = $_POST['B4EH'];
$B4H = $_POST['B4H'];
$B4L = $_POST['B4L'];
$B4Q6 = $_POST['B4Q6'];
$B4Q12 = $_POST['B4Q12'];
$B4Q6TT = $_POST['B4Q6TT'];
$B4Q12TT = $_POST['B4Q12TT'];
$B4S = $_POST['B4S'];
$B4TL = $_POST['B4TL'];
$C1CE = $_POST['C1CE'];
$C1CH = $_POST['C1CH'];
$C1E = $_POST['C1E'];
$C1EE = $_POST['C1EE'];
$C1EH = $_POST['C1EH'];
$C1H = $_POST['C1H'];
$C1L = $_POST['C1L'];
$C1Q6 = $_POST['C1Q6'];
$C1Q12 = $_POST['C1Q12'];
$C1Q6TT = $_POST['C1Q6TT'];
$C1Q12TT = $_POST['C1Q12TT'];
$C1S = $_POST['C1S'];
$C1TL = $_POST['C1TL'];
$C2CE = $_POST['C2CE'];
$C2CH = $_POST['C2CH'];
$C2E = $_POST['C2E'];
$C2EE = $_POST['C2EE'];
$C2EH = $_POST['C2EH'];
$C2H = $_POST['C2H'];
$C2L = $_POST['C2L'];
$C2Q6 = $_POST['C2Q6'];
$C2Q12 = $_POST['C2Q12'];
$C2Q6TT = $_POST['C2Q6TT'];
$C2Q12TT = $_POST['C2Q12TT'];
$C2S = $_POST['C2S'];
$C2TL = $_POST['C2TL'];
$C3CE = $_POST['C3CE'];
$C3CH = $_POST['C3CH'];
$C3E = $_POST['C3E'];
$C3EE = $_POST['C3EE'];
$C3EH = $_POST['C3EH'];
$C3H = $_POST['C3H'];
$C3L = $_POST['C3L'];
$C3Q6 = $_POST['C3Q6'];
$C3Q12 = $_POST['C3Q12'];
$C3Q6TT = $_POST['C3Q6TT'];
$C3Q12TT = $_POST['C3Q12TT'];
$C3S = $_POST['C3S'];
$C3TL = $_POST['C3TL'];
$C4CE = $_POST['C4CE'];
$C4CH = $_POST['C4CH'];
$C4E = $_POST['C4E'];
$C4EE = $_POST['C4EE'];
$C4EH = $_POST['C4EH'];
$C4H = $_POST['C4H'];
$C4L = $_POST['C4L'];
$C4Q6 = $_POST['C4Q6'];
$C4Q12 = $_POST['C4Q12'];
$C4Q6TT = $_POST['C4Q6TT'];
$C4Q12TT = $_POST['C4Q12TT'];
$C4S = $_POST['C4S'];
$C4TL = $_POST['C4TL'];
$D2CE = $_POST['D2CE'];
$D2CH = $_POST['D2CH'];
$D2E = $_POST['D2E'];
$D2EE = $_POST['D2EE'];
$D2EH = $_POST['D2EH'];
$D2H = $_POST['D2H'];
$D2L = $_POST['D2L'];
$D2Q6 = $_POST['D2Q6'];
$D2Q12 = $_POST['D2Q12'];
$D2Q6TT = $_POST['D2Q6TT'];
$D2Q12TT = $_POST['D2Q12TT'];
$D2S = $_POST['D2S'];
$D2TL = $_POST['D2TL'];
$D3CE = $_POST['D3CE'];
$D3CH = $_POST['D3CH'];
$D3E = $_POST['D3E'];
$D3EE = $_POST['D3EE'];
$D3EH = $_POST['D3EH'];
$D3H = $_POST['D3H'];
$D3L = $_POST['D3L'];
$D3Q6 = $_POST['D3Q6'];
$D3Q12 = $_POST['D3Q12'];
$D3Q6TT = $_POST['D3Q6TT'];
$D3Q12TT = $_POST['D3Q12TT'];
$D3S = $_POST['D3S'];
$D3TL = $_POST['D3TL'];
$staff_id = $_POST['staff_id'];
$targetId = $_POST['targetId'];

try {
    $sql = "DELETE FROM t_cutting WHERE casting_id = '$targetId'";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();

    $sql = "INSERT INTO t_cutting (
    A2CE, A2CH, A2E, A2EE, A2EH, A2H, A2L, A2Q6, A2Q12, A2Q6TT, A2Q12TT, A2S, A2TL,
    A3CE, A3CH, A3E, A3EE, A3EH, A3H, A3L, A3Q6, A3Q12, A3Q6TT, A3Q12TT, A3S, A3TL,
    B1CE, B1CH, B1E, B1EE, B1EH, B1H, B1L, B1Q6, B1Q12, B1Q6TT, B1Q12TT, B1S, B1TL,
    B2CE, B2CH, B2E, B2EE, B2EH, B2H, B2L, B2Q6, B2Q12, B2Q6TT, B2Q12TT, B2S, B2TL,
    B3CE, B3CH, B3E, B3EE, B3EH, B3H, B3L, B3Q6, B3Q12, B3Q6TT, B3Q12TT, B3S, B3TL,
    B4CE, B4CH, B4E, B4EE, B4EH, B4H, B4L, B4Q6, B4Q12, B4Q6TT, B4Q12TT, B4S, B4TL,
    C1CE, C1CH, C1E, C1EE, C1EH, C1H, C1L, C1Q6, C1Q12, C1Q6TT, C1Q12TT, C1S, C1TL,
    C2CE, C2CH, C2E, C2EE, C2EH, C2H, C2L, C2Q6, C2Q12, C2Q6TT, C2Q12TT, C2S, C2TL,
    C3CE, C3CH, C3E, C3EE, C3EH, C3H, C3L, C3Q6, C3Q12, C3Q6TT, C3Q12TT, C3S, C3TL,
    C4CE, C4CH, C4E, C4EE, C4EH, C4H, C4L, C4Q6, C4Q12, C4Q6TT, C4Q12TT, C4S, C4TL,
    D2CE, D2CH, D2E, D2EE, D2EH, D2H, D2L, D2Q6, D2Q12, D2Q6TT, D2Q12TT, D2S, D2TL,
    D3CE, D3CH, D3E, D3EE, D3EH, D3H, D3L, D3Q6, D3Q12, D3Q6TT, D3Q12TT, D3S, D3TL, staff_id, casting_id) VALUES (
'$A2CE', '$A2CH', '$A2E', '$A2EE', '$A2EH', '$A2H', '$A2L', '$A2Q6', '$A2Q12', '$A2Q6TT', '$A2Q12TT', '$A2S', '$A2TL', 
'$A3CE', '$A3CH', '$A3E', '$A3EE', '$A3EH', '$A3H', '$A3L', '$A3Q6', '$A3Q12', '$A3Q6TT', '$A3Q12TT','$A3S', '$A3TL', 
'$B1CE', '$B1CH', '$B1E', '$B1EE', '$B1EH', '$B1H', '$B1L', '$B1Q6', '$B1Q12', '$B1Q6TT', '$B1Q12TT', '$B1S', '$B1TL', 
'$B2CE', '$B2CH', '$B2E', '$B2EE', '$B2EH', '$B2H', '$B2L', '$B2Q6', '$B2Q12', '$B2Q6TT', '$B2Q12TT', '$B2S', '$B2TL', 
'$B3CE', '$B3CH', '$B3E', '$B3EE', '$B3EH', '$B3H', '$B3L', '$B3Q6', '$B3Q12', '$B3Q6TT', '$B3Q12TT', '$B3S', '$B3TL', 
'$B4CE', '$B4CH', '$B4E', '$B4EE', '$B4EH', '$B4H', '$B4L', '$B4Q6', '$B4Q12', '$B4Q6TT', '$B4Q12TT', '$B4S', '$B4TL', 
'$C1CE', '$C1CH', '$C1E', '$C1EE', '$C1EH', '$C1H', '$C1L', '$C1Q6', '$C1Q12', '$C1Q6TT', '$C1Q12TT', '$C1S', '$C1TL', 
'$C2CE', '$C2CH', '$C2E', '$C2EE', '$C2EH', '$C2H', '$C2L', '$C2Q6', '$C2Q12', '$C2Q6TT', '$C2Q12TT', '$C2S', '$C2TL', 
'$C3CE', '$C3CH', '$C3E', '$C3EE', '$C3EH', '$C3H', '$C3L', '$C3Q6', '$C3Q12', '$C3Q6TT', '$C3Q12TT', '$C3S', '$C3TL', 
'$C4CE', '$C4CH', '$C4E', '$C4EE', '$C4EH', '$C4H', '$C4L', '$C4Q6', '$C4Q12', '$C4Q6TT', '$C4Q12TT', '$C4S', '$C4TL', 
'$D2CE', '$D2CH', '$D2E', '$D2EE', '$D2EH', '$D2H', '$D2L', '$D2Q6', '$D2Q12', '$D2Q6TT', '$D2Q12TT', '$D2S', '$D2TL', 
'$D3CE', '$D3CH', '$D3E', '$D3EE', '$D3EH', '$D3H', '$D3L', '$D3Q6', '$D3Q12', '$D3Q6TT', '$D3Q12TT', '$D3S', '$D3TL', '$staff_id', '$targetId')";
    $stmt = $dbh->getInstance()->prepare($sql);
    $stmt->execute();

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} 
catch(PDOException $e) {
    echo $e;
}
?>