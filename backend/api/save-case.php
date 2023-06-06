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
    $user->saveCase($data);

    echo $user ? json_encode(array("status" => "success", "message" => "Itme created successfully!")) :
        json_encode(array("status" => "error", "message" => "Oops. Error occurred!"));
} else {
    echo json_encode(array("status" => "error", "message" => "Oops! Database connection could not be established!"));
}
