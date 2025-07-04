<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include '../db.php'; // Include database connection

// Get JSON input
$jsonData = file_get_contents("php://input");
$data = json_decode($jsonData, true);

// Check if JSON is properly received
if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid JSON data received."]);
    exit();
}

// Validate required fields
if (empty($data['admin_email']) || empty($data['admin_password'])) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit();
}

// Extract admin credentials safely
$admin_email = $conn->real_escape_string($data['admin_email']);
$admin_password = $conn->real_escape_string($data['admin_password']); // No hashing

// Debugging: Log request data (remove in production)
error_log("Login Attempt: Email: $admin_email, Password: $admin_password");

// Query to fetch admin details
$sqlQuery = "SELECT * FROM admins_table WHERE admin_email = '$admin_email' AND admin_password = '$admin_password'";
$result = $conn->query($sqlQuery);

// Ensure response is JSON
header('Content-Type: application/json');

if ($result && $result->num_rows > 0) {
    $adminData = $result->fetch_assoc();
    
    echo json_encode([
        "status" => "success",
        "message" => "Login successful.",
        "admin" => [
            "id" => $adminData["admin_id"],
            "name" => $adminData["admin_name"],
            "email" => $adminData["admin_email"],
            "phone" => $adminData["admin_phoneno"] ?? null,
            "address" => $adminData["admin_address"] ?? null
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid email or password."]);
}

// Close the database connection
$conn->close();

