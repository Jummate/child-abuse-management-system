<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once("../models/User.php");
include_once("../config/database.php");
require_once("../config/constant.php");



$database = new Database();
$db = $database->getConnection();

if ($db) {
    $data = json_decode(file_get_contents("php://input"));

    $admin = new User($db);
    $adminInfo = $admin->findAdmin($data);
    extract($adminInfo);

    if (count($adminInfo) > 0 && password_verify($data->password, $password)) {
        http_response_code(200);
        //case-insensitive comparison of strings
        if (strcasecmp($role, "superadmin") == 0) {
            echo json_encode(array("status" => "success", "message" => "A record was found!", "redirect_url" => SUPER_ADMIN_URL));
        } else {
            echo json_encode(array("status" => "success", "message" => "A record was found!", "redirect_url" => DASHBOARD_URL));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("status" => "error", "message" => "Invalid credentials!"));
        die();
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Oops! Database connection could not be established!"));
}
