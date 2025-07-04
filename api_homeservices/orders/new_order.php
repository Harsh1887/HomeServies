<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Include the database connection
include '../db.php';  // Adjust the path if needed

// Read JSON input
$input_data = json_decode(file_get_contents("php://input"), true);

if (!$input_data) {
    echo json_encode(["error" => "Invalid JSON input"]);
    exit;
}

// Extract variables from JSON
$user_id = $input_data['user_id'];
$employee_id = $input_data['employee_id'];
$order_total_amount = $input_data['order_total_amount'];
$pay_amount_to_emp = $input_data['pay_amount_to_emp'];
$emp_payment_status = $input_data['emp_payment_status'];
$order_payment_status = $input_data['order_payment_status'];
$user_address = $input_data['user_address'];
$user_phoneno = $input_data['user_phoneno'];
$service_date = $input_data['service_date'];
$service_time = $input_data['service_time'];
$booking_time = $input_data['booking_time'];
$order_status = $input_data['order_status'];
$order_location = $input_data['order_location'];

// SQL query to insert data into database
$sql = "INSERT INTO order_table (user_id, employee_id, order_total_amount, pay_amount_to_emp, emp_payment_status, order_payment_status, user_address, user_phoneno, service_date, service_time, booking_time, order_status, order_location) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

// Prepare statement
$stmt = $conn->prepare($sql);
if ($stmt) {
    $stmt->bind_param("iiddsssssssss", $user_id, $employee_id, $order_total_amount, $pay_amount_to_emp, $emp_payment_status, $order_payment_status, $user_address, $user_phoneno, $service_date, $service_time, $booking_time, $order_status, $order_location);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => "Order created successfully"]);
    } else {
        echo json_encode(["error" => "Execution failed: " . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["error" => "Statement preparation failed: " . $conn->error]);
}

$conn->close();
?>
