<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
include '../db.php';

// Check if POST data is received
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(array("error" => "Invalid request method"));
    exit();
}

// Validate that 'user_email' is set
if (!isset($_POST['user_email']) || empty($_POST['user_email'])) {
    echo json_encode(array("error" => "Email is required"));
    exit();
}

// Sanitize email input
$userEmail = trim($_POST['user_email']);
$userEmail = filter_var($userEmail, FILTER_SANITIZE_EMAIL);

// Check if the email format is valid
if (!filter_var($userEmail, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(array("error" => "Invalid email format"));
    exit();
}

// Prepare and execute query securely using prepared statements
$sqlQuery = "SELECT COUNT(*) as count FROM users_table WHERE user_email = ?";
$stmt = $connectNow->prepare($sqlQuery);
$stmt->bind_param("s", $userEmail);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row['count'] > 0) {
    echo json_encode(array("emailFound" => true));
} else {
    echo json_encode(array("emailFound" => false));
}

// Close statement and connection
$stmt->close();
$connectNow->close();



