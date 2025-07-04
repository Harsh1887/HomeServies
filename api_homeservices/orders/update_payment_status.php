<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../db.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->order_id) && isset($data->payment_status)) {
    $order_id = $data->order_id;
    $payment_status = $data->payment_status;

    $stmt = $conn->prepare("UPDATE order_table SET order_payment_status = ? WHERE order_id = ?");
    $stmt->bind_param("si", $payment_status, $order_id);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "error" => "Invalid input"]);
}
?>
