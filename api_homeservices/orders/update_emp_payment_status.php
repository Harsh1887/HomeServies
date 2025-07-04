<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->order_id)) {
    echo json_encode(["success" => false, "message" => "Missing order_id"]);
    exit();
}

$order_id = $data->order_id;

$sql = "UPDATE order_table SET emp_payment_status = '1' WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $order_id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Payment status updated."]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update."]);
}

$stmt->close();
$conn->close();
?>
