<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

include '../db.php';  // Ensure your DB connection is correct

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the data sent by the Angular app
    $employee_id = isset($_POST['employee_id']) ? $_POST['employee_id'] : null;
    $employee_rating = isset($_POST['employee_rating']) ? $_POST['employee_rating'] : null;

    if ($employee_id && $employee_rating !== null) {
        // Check if the employee_id and employee_rating are valid
        if (!is_numeric($employee_id) || !is_numeric($employee_rating)) {
            echo json_encode(['success' => false, 'message' => 'Invalid input parameters']);
            exit;
        }

        // Update the rating in the database
        $query = "UPDATE employee_table SET employee_rating = :employee_rating WHERE employee_id = :employee_id";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(':employee_id', $employee_id, PDO::PARAM_INT);
        $stmt->bindParam(':employee_rating', $employee_rating, PDO::PARAM_INT);

        // Execute the query and check the result
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            $errorInfo = $stmt->errorInfo();  // Get detailed error information
            echo json_encode(['success' => false, 'message' => 'Failed to update rating', 'error' => $errorInfo]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid parameters']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
