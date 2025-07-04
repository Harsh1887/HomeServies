<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header('Content-Type: application/json');

// Include the database connection settings
include '../db.php'; // Ensure this path is correct

// SQL query to fetch all users from the users_table
$sql = "SELECT * FROM employee_table";
$result = $conn->query($sql);

// Check if the query was successful
if ($result === false) {
    die(json_encode(['error' => 'SQL Error: ' . $conn->error]));
}

// Check if there are any users
if ($result->num_rows > 0) {
    $emp = [];
    while ($row = $result->fetch_assoc()) {
        $emp[] = $row;  // Add each row to the users array
    }
    echo json_encode($emp);  // Return the users as a JSON response
} else {
    echo json_encode([]);  // Return an empty array if no users are found
}

// Close the connection
