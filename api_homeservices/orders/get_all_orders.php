<?php
// Enable error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set necessary headers for API
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");

// Include database connection
include '../db.php';

// Run SQL to fetch all orders
$sql = "SELECT * FROM order_table";
$result = $conn->query($sql);

// Check if orders exist
if ($result->num_rows > 0) {
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    echo json_encode([
        "success" => true,
        "allOrderTable" => $orders
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No orders found"
    ]);
}

// Close DB connection
$conn->close();
?>
