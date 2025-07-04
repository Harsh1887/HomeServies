<?php
ob_start(); // Start output buffering

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

include '../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_end_clean();
    echo json_encode(["success" => false, "message" => "Only POST requests are allowed"]);
    exit;
}

$user_id = $_POST['user_i   d'] ?? '';

if (empty($user_id)) {
    ob_end_clean();
    echo json_encode(["success" => false, "message" => "Missing user ID"]);
    exit;
}

$favorites = [];
$sql = "SELECT employee_id FROM favorites_table WHERE user_id = '$user_id'";
$result = $connectNow->query($sql);

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $emp_id = $row['employee_id'];

        $emp_sql = "SELECT * FROM employees_table WHERE employee_id = '$emp_id' LIMIT 1";
        $emp_result = $connectNow->query($emp_sql);

        if ($emp_result && $emp_result->num_rows > 0) {
            $emp = $emp_result->fetch_assoc();
            $favorites[] = $emp;
        }
    }
}

ob_end_clean();
echo json_encode(["success" => true, "favorites" => $favorites]);
exit;
