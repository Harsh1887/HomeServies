<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include '../db.php';

$user_id = $_POST['user_id'];
$employee_id = $_POST['employee_id'];

$sql = "DELETE FROM favorites_table WHERE user_id = '$user_id' AND employee_id = '$employee_id'";
if ($conn->query($sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete favorite']);
}
?>
