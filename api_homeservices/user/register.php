<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");

include '../db.php'; // Include database connection

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_name'], $data['user_email'], $data['user_phoneno'], $data['user_address'], $data['user_password'])) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit();
}

// Extract user details
$user_name = $conn->real_escape_string($data['user_name']);
$user_email = $conn->real_escape_string($data['user_email']);
$user_phoneno = $conn->real_escape_string($data['user_phoneno']);
$user_address = $conn->real_escape_string($data['user_address']);
$user_password = password_hash($data['user_password'], PASSWORD_DEFAULT); // Hash password

// Check if email already exists
$checkEmail = $conn->query("SELECT user_id FROM users_table WHERE user_email = '$user_email'");
if ($checkEmail->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already registered."]);
    exit();
}

// Insert into database
$sql = "INSERT INTO users_table (user_name, user_email, user_phoneno, user_address, user_password) VALUES 
        ('$user_name', '$user_email', '$user_phoneno', '$user_address', '$user_password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "User registered successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

// Close database connection
$conn->close();
