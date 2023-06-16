<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

include_once("../models/User.php");
include_once("../config/database.php");

$database = new Database();
$db = $database->getConnection();


if ($db) {
    $user = new User($db);
    $caseRecords = $user->readCase();
    if (count($caseRecords) > 0) {
        http_response_code(200);
        echo json_encode(array("status" => "success", "data" => $caseRecords));
    } else {
        http_response_code(404);
        echo json_encode(array("status" => "failure", "message" => "No cases found!"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Oops! Database connection could not be established!"));
}
