<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emp_aadhar_number = $_POST['emp_aadhar_number'];
    $employee_name = $_POST['employee_name'];
    $employee_service_name = $_POST['employee_service_name'];
    $employee_phoneno = $_POST['employee_phoneno'];
    $employee_email = $_POST['employee_email'];
    $employee_password = password_hash($_POST['employee_password'], PASSWORD_DEFAULT);
    $employee_desc = $_POST['employee_desc'];
    $employee_rating = '';
    $employee_location = $_POST['employee_location'];
    $employee_experience = $_POST['employee_experience'];
    $employee_service_fee = $_POST['employee_service_fee'];

    $target_dir = "uploads/";
    $employee_image = $target_dir . basename($_FILES["employee_image"]["name"]);
    move_uploaded_file($_FILES["employee_image"]["tmp_name"], $employee_image);

    $sql = "INSERT INTO employee_table (emp_aadhar_number, employee_name, employee_service_name, 
            employee_image, employee_phoneno, employee_email, employee_password, employee_desc, 
            employee_rating, employee_location, employee_experience, employee_service_fee) 
            VALUES ('$emp_aadhar_number', '$employee_name', '$employee_service_name', '$employee_image', 
            '$employee_phoneno', '$employee_email', '$employee_password', '$employee_desc', '$employee_rating', 
            '$employee_location', '$employee_experience', '$employee_service_fee')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Employee registered successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed"]);
    }
}
