<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200); // Respond with 200 OK for OPTIONS request
    exit();
}

include '../db.php';  // Adjust the path if needed


$data = json_decode(file_get_contents("php://input"), true);

$order_id = $data['order_id'];
$order_status = $data['order_status'];

if ($order_id && $order_status) {
    $query = "UPDATE order_table SET order_status = ? WHERE order_id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("si", $order_status, $order_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Status updated"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
}
?>
