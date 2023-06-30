<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include_once("../models/User.php");
include_once("../config/database.php");

$database = new Database();
$db = $database->getConnection();


if ($db) {
    $user = new User($db);
    $admins = $user->getAdmins();
    if (count($admins) > 0) {
        http_response_code(200);
        echo json_encode(array("status" => "success", "data" => $admins));
    } else {
        http_response_code(404);
        echo json_encode(array("status" => "failure", "message" => "No records found!"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Oops! Database connection could not be established!"));
}
