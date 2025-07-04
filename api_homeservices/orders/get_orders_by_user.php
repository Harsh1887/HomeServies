<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

// Check if user_id is passed in the payload
if (!isset($data['user_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing user_id"]);
    exit();
}

$user_id = $data['user_id'];

// Include database connection file
include '../db.php';

// SQL query to fetch orders by user_id
$sql = "SELECT * FROM order_table WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();
$orders = [];

while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

// Return the fetched orders as JSON response
echo json_encode($orders);

$stmt->close();
$conn->close();
