<?php
require_once("constant.php");
class Database
{
    private $host = HOST;
    private $username = USERNAME;
    private $db_name = DB_NAME;
    private $password = PASSWORD;
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
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $e) {
            echo "Error in connection: " . $e->getMessage();
        }
        return $this->conn;
    }
}
