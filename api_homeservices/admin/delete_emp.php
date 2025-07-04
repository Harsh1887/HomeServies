<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

include '../db.php';

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate received data
if (!isset($data["employee_id"])) {
    echo json_encode(["success" => false, "message" => "Employee ID is required."]);
    exit();
}

$employee_id = $conn->real_escape_string($data["employee_id"]);

// Delete employee query
$sql = "DELETE FROM employee_table WHERE employee_id = '$employee_id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Employee deleted successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error deleting employee: " . $conn->error]);
}

$conn->close();
?>
