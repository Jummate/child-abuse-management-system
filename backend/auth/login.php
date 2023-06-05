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
    $userName = $data->username;
    $passWord = $data->password;
    $admin = new User($db);
    $adminInfo = $admin->findAdmin($userName, $passWord);
    $num = $adminInfo->rowCount();

    echo $num > 0 ? json_encode(array("status" => "success", "message" => "Logged in successfully!")) :
        json_encode(array("status" => "error", "message" => "Invalid credentials!"));
} else {
    echo json_encode(array("status" => "error", "message" => "Oops! Database connection could not be established!"));
}
