<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['employee_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing employee_id"]);
    exit();
}

$employee_id = $data['employee_id'];

include '../db.php';

$sql = "SELECT * FROM employee_table WHERE employee_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $employee_id);
$stmt->execute();

$result = $stmt->get_result();
$employee = $result->fetch_assoc();

echo json_encode($employee);

$stmt->close();
$conn->close();
?>
