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
        echo json_encode(array("status" => "success", "data" => $caseRecords));
    } else {
        echo json_encode(array("status" => "error", "message" => "Oops. Error occurred!"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Oops! Database connection could not be established!"));
}
