<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200); // Respond with 200 OK for OPTIONS request
    exit();
}


// Handle preflight request (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Respond with 200 OK for OPTIONS request
    exit();
}

// Fetching the data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

// Check if employee_id is provided
if (!isset($data['employee_id'])) {
    http_response_code(400); // Bad request if no employee_id is sent
    echo json_encode(["error" => "Missing employee_id"]);
    exit();
}

$employee_id = $data['employee_id'];

include '../db.php';  // Include database connection

// Prepare and execute the query
$sql = "SELECT * FROM order_table WHERE employee_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $employee_id);
$stmt->execute();
$result = $stmt->get_result();

// Collect the results
$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

// Return the orders as JSON
echo json_encode($orders);

// Clean up
$stmt->close();
$conn->close();
?>
