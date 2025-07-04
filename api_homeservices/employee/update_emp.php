<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include '../db.php';

// Get the form data
$employee_id = $_POST['employee_id'];
$emp_aadhar_number = $_POST['emp_aadhar_number'];
$employee_name = $_POST['employee_name'];
$employee_service_name = $_POST['employee_service_name'];
$employee_phoneno = $_POST['employee_phoneno'];
$employee_email = $_POST['employee_email'];
$employee_desc = $_POST['employee_desc'];
$employee_location = $_POST['employee_location'];
$employee_experience = $_POST['employee_experience'];
$employee_service_fee = $_POST['employee_service_fee'];

// Validate input
if (empty($employee_id) || empty($emp_aadhar_number) || empty($employee_name) || empty($employee_service_name) || empty($employee_phoneno) || empty($employee_email) || empty($employee_desc) || empty($employee_location) || empty($employee_experience) || empty($employee_service_fee)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit();
}

// Update query
$sql = "UPDATE employees SET emp_aadhar_number=?, employee_name=?, employee_service_name=?, employee_phoneno=?, employee_email=?, employee_desc=?, employee_location=?, employee_experience=?, employee_service_fee=? WHERE employee_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssssssssdi', $emp_aadhar_number, $employee_name, $employee_service_name, $employee_phoneno, $employee_email, $employee_desc, $employee_location, $employee_experience, $employee_service_fee, $employee_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Employee details updated successfully']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update employee details']);
}

// Close the connection
$stmt->close();
$conn->close();
?>
