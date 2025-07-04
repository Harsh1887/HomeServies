<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200); // Respond with 200 OK for OPTIONS request
    exit();
}

include '../db.php';  // Adjust the path if needed

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'];

if ($user_id) {
    $stmt = $conn->prepare("SELECT user_name FROM users_table WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode(["user_name" => $row['user_name']]);
    } else {
        echo json_encode(["error" => "User not found"]);
    }
} else {
    echo json_encode(["error" => "User ID not provided"]);
}
?>
