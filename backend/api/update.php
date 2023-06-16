<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once("../models/User.php");
include_once("../config/database.php");


$database = new Database();
$db = $database->getConnection();


if ($db) {
    $data = json_decode(file_get_contents("php://input"));
    $user = new User($db);

    if ($user->updateCaseStatus($data)) {
        http_response_code(200);
        echo json_encode(array("status" => "success", "message" => "Info updated successfully!"));
    } else {
        http_response_code(503);
        echo json_encode(array("status" => "failure", "message" => "Unable to update case info!"));
    }
} else {
    http_response_code(503);
    echo json_encode(array("status" => "error", "message" => "Oops! Database connection could not be established!"));
}
