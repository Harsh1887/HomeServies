<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include '../db.php'; // Include database connection

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_email'], $data['user_password'])) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit();
}

// Extract user credentials
$user_email = $conn->real_escape_string($data['user_email']);
$user_password = $data['user_password']; // Plain text password entered by the user

// Query to fetch user details
$sqlQuery = "SELECT * FROM users_table WHERE user_email = '$user_email'";
$result = $conn->query($sqlQuery);

if ($result->num_rows > 0) {
    $userData = $result->fetch_assoc();
    
    // Verify hashed password
    if (password_verify($user_password, $userData["user_password"])) {
        echo json_encode([
            "status" => "success",
            "message" => "Login successful.",
            "user" => [
                "id" => $userData["user_id"],
                "name" => $userData["user_name"],
                "email" => $userData["user_email"],
                "phone" => $userData["user_phoneno"],
                "address" => $userData["user_address"]
            ]
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email or password."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid email or password."]);
}

// Close the database connection
$conn->close();
?>
