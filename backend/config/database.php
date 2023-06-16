<?php
// include_once("./constant.php");
class Database
{
    private $host = "localhost";
    private $username = "root";
    private $db_name = "cams_db";
    private $password = "";
    private $dsn;
    public $conn;

    public function __construct()
    {
        $this->conn = null;
        $this->dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name;
    }
    public function getConnection()
    {
        try {
            $this->conn = new PDO($this->dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error in connection: " . $e->getMessage();
        }
        return $this->conn;
    }
}
