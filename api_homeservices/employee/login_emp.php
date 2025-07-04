<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/error_log.txt'); // Log errors to a file

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include '../db.php'; // Include database connection

// Get JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['employee_email'], $data['employee_password'])) {
    echo json_encode(["status" => "error", "message" => "Email and password are required."]);
    exit();
}

// Extract user credentials
$employee_email = $conn->real_escape_string($data['employee_email']);
$employee_password = $data['employee_password']; // Plain text password entered by the user

// Query to fetch user details
$sqlQuery = "SELECT * FROM employee_table WHERE employee_email = '$employee_email'";
$result = $conn->query($sqlQuery);

if ($result->num_rows > 0) {
    $empData = $result->fetch_assoc();
    
    // Verify hashed password
    if (password_verify($employee_password, $empData["employee_password"])) {
        echo json_encode([
            "status" => "success",
            "message" => "Login successful.",
            "emp" => [
                "employee_id" => $empData["employee_id"],
                "emp_aadhar_number" => $empData["emp_aadhar_number"],
                "employee_name" => $empData["employee_name"],
                "employee_service_name" => $empData["employee_service_name"],
                "employee_image" => $empData["employee_image"],
                "employee_phoneno" => $empData["employee_phoneno"],
                "employee_email" => $empData["employee_email"],
                "employee_desc" => $empData["employee_desc"],
                "employee_rating" => $empData["employee_rating"],
                "employee_location" => $empData["employee_location"],
                "employee_experience" => $empData["employee_experience"],
                "employee_service_fee" => $empData["employee_service_fee"]
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
