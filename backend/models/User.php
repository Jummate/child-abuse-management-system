<?php

// include_once("../config/constant.php");
class User
{
    // DB stuff
    private $conn;
    // private $dataTable = 'tb_admin';
    function __construct($db)
    {
        $this->conn = $db;
    }
    function findAdmin($username)
    {
        $query = "SELECT * FROM tb_admin WHERE username = :username";
        $stmt = $this->conn->prepare($query);

        $username = htmlspecialchars(strip_tags($username));
        $stmt->bindParam(":username", $username);

        $stmt->execute();

        return $stmt;
    }
}
