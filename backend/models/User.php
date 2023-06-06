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
    function findAdmin($username, $password)
    {
        $query = "SELECT * FROM tb_admin WHERE username = :username AND password = :password";
        $stmt = $this->conn->prepare($query);

        $username = htmlspecialchars(strip_tags($username));
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":password", $password);

        $stmt->execute();

        return $stmt;
    }
    function saveCase($data)
    {

        //convert the object into an array
        $arr = json_decode(json_encode($data), TRUE);

        //destructure the resulting array
        extract($arr);

        return $this->saveCaseInfo($case, $caseID, "tb_case_info")
            && $this->saveEachInfo($victim, $caseID, "tb_victim_info")
            && $this->saveEachInfo($reporter, $caseID, "tb_reporter_info")
            && $this->savePerpetratorInfo($perpetrator, $caseID);
    }

    private function saveCaseInfo($data, $caseID, $table)
    {
        extract($data);
        $query = "INSERT INTO " . $table . " (case_id, abuse_type, event_date, location, other_info, case_status)
                VALUES (:case_id, :abuse_type, :event_date, :location, :other_info, 'Unaddressed')";

        $stmt = $this->conn->prepare($query);

        $abuseType = htmlspecialchars(strip_tags($abuseType));
        $eventDate = htmlspecialchars(strip_tags($eventDate));
        $location = htmlspecialchars(strip_tags($location));
        $otherInfo = htmlspecialchars(strip_tags($otherInfo));

        $stmt->bindParam(":case_id", $caseID);
        $stmt->bindParam(":location", $location);
        $stmt->bindParam(":event_date", $eventDate);
        $stmt->bindParam(":abuse_type", $abuseType);
        $stmt->bindParam(":other_info", $otherInfo);


        // execute query
        if ($stmt->execute()) {
            return true;
        }

        echo $stmt->errorCode();
        return false;
    }

    private function saveEachInfo($data, $caseID, $table)
    {
        extract($data);
        $query = "INSERT INTO " . $table . " (case_id, f_name, l_name, gender, age, contact)
                VALUES (:case_id, :f_name, :l_name, :gender, :age, :contact)";

        $stmt = $this->conn->prepare($query);

        $fname = htmlspecialchars(strip_tags($fname));
        $lname = htmlspecialchars(strip_tags($lname));
        $gender = htmlspecialchars(strip_tags($gender));
        $age = htmlspecialchars(strip_tags($age));
        $contact = htmlspecialchars(strip_tags($contact));

        $stmt->bindParam(":case_id", $caseID);
        $stmt->bindParam(":f_name", $fname);
        $stmt->bindParam(":l_name", $lname);
        $stmt->bindParam(":gender", $gender);
        $stmt->bindParam(":age", $age);
        $stmt->bindParam(":contact", $contact);


        // execute query
        if ($stmt->execute()) {
            return true;
        }

        echo $stmt->errorCode();
        return false;
    }

    private function savePerpetratorInfo($data, $caseID)
    {
        $isSuccessful = true;
        foreach ($data as $record) {
            if (!$this->saveEachInfo($record, $caseID, "tb_perpetrator_info")) {
                global $isSuccessful;
                $isSuccessful = false;
                break;
            };
        }
        return $isSuccessful;
    }
}
