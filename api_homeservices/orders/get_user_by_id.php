<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Set headers for CORS and content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Include the database connection
include '../db.php';

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"));

// Check if user_id is provided in the request body
if (!isset($data->user_id)) {
    echo json_encode(["success" => false, "message" => "Missing user_id"]);
    exit();
}

$user_id = $data->user_id;

// Ensure the user_id is an integer (sanitize input)
if (!is_int($user_id)) {
    echo json_encode(["success" => false, "message" => "Invalid user_id"]);
    exit();
}

// Prepare the SQL query to fetch user data, excluding the password
$sql = "SELECT user_id, user_name, user_email, user_address, user_phoneno FROM users_table WHERE user_id = ?";

// Prepare the statement
if ($stmt = $conn->prepare($sql)) {
    // Bind the user_id parameter as an integer
    $stmt->bind_param("i", $user_id);

    // Execute the statement
    $stmt->execute();
    
    // Get the result
    $result = $stmt->get_result();

    // Check if the user exists
    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        echo json_encode(["success" => true, "data" => $row]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Database query failed"]);
}

// Close the database connection
$conn->close();

