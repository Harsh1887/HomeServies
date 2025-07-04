<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include '../db.php';

$user_id = $_POST['user_id'];

$sqlQuery = "SELECT employee_id FROM favorites_table WHERE user_id = '$user_id'";
$result = $conn->query($sqlQuery);

$favorites = [];
while ($row = $result->fetch_assoc()) {
    $favorites[] = $row;
}

echo json_encode(['success' => true, 'favorites' => $favorites]);
?>
