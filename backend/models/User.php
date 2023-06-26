<?php

require_once("../config/constant.php");
class User
{
    // DB stuff
    private $conn;
    function __construct($db)
    {
        $this->conn = $db;
    }
    function findAdmin($data)
    {
        //convert the object into an array
        $arr = json_decode(json_encode($data), TRUE);

        extract($arr);
        $query = "SELECT * FROM " . ADMIN_TABLE . " WHERE username = :username";
        $stmt = $this->conn->prepare($query);

        $username = htmlspecialchars(strip_tags($username));

        $stmt->bindParam(":username", $username);

        $stmt->execute();

        return $stmt->rowCount() > 0 ? $stmt->fetch(PDO::FETCH_ASSOC) : array();
    }
    function getAdmins()
    {
        $query = "SELECT id, username FROM " . ADMIN_TABLE . " WHERE NOT role = 'superadmin'";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt->rowCount() > 0 ? $stmt->fetchAll(PDO::FETCH_ASSOC) : array();
    }

    function saveAdmin($data)
    {
        //convert the object into an array
        $arr = json_decode(json_encode($data), TRUE);

        //destructure the resulting array
        extract($arr);
        $query = "INSERT INTO " . ADMIN_TABLE . " (id, username, password, role)
                VALUES (:id, :username, :password, :role)";

        $stmt = $this->conn->prepare($query);

        $ID = htmlspecialchars(strip_tags($ID));
        $username = htmlspecialchars(strip_tags($username));
        $password = htmlspecialchars(strip_tags($password));
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);


        $stmt->bindParam(":id", $ID);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":role", $role);
        $stmt->bindParam(":password", $hashed_password);



        // execute query
        if ($stmt->execute()) {
            return true;
        }

        echo $stmt->errorCode();
        return false;
    }

    public function deleteAdmin($ID)
    {
        $query = "DELETE FROM " . ADMIN_TABLE . " WHERE id = :ID";
        $stmt = $this->conn->prepare($query);

        $ID = htmlspecialchars(strip_tags($ID));
        $stmt->bindParam(":ID", $ID);

        $stmt->execute();
        return $stmt;
    }


    function saveCase($data)
    {

        //convert the object into an array
        $arr = json_decode(json_encode($data), TRUE);

        //destructure the resulting array
        extract($arr);

        return $this->saveCaseInfo($case, $caseID, CASE_TABLE)
            && $this->saveEachInfo($victim, $caseID, VICTIM_TABLE)
            && $this->saveEachInfo($reporter, $caseID, REPORTER_TABLE)
            && $this->savePerpetratorInfo($perpetrator, $caseID, PERPETRATOR_TABLE);
    }

    private function saveCaseInfo($data, $caseID, $table)
    {
        extract($data);
        $query = "INSERT INTO " . $table . " (case_id, abuse_type, event_date, state, city, location, other_info, case_status)
                VALUES (:case_id, :abuse_type, :event_date, :state, :city, :location, :other_info, 'Unaddressed')";

        $stmt = $this->conn->prepare($query);

        $abuseType = htmlspecialchars(strip_tags($abuseType));
        $eventDate = htmlspecialchars(strip_tags($eventDate));
        $location = htmlspecialchars(strip_tags($location));
        $otherInfo = htmlspecialchars(strip_tags($otherInfo));
        $state = htmlspecialchars(strip_tags($state));
        $city = htmlspecialchars(strip_tags($city));

        $stmt->bindParam(":case_id", $caseID);
        $stmt->bindParam(":location", $location);
        $stmt->bindParam(":event_date", $eventDate);
        $stmt->bindParam(":abuse_type", $abuseType);
        $stmt->bindParam(":other_info", $otherInfo);
        $stmt->bindParam(":state", $state);
        $stmt->bindParam(":city", $city);


        // execute query
        if ($stmt->execute()) {
            return true;
        }

        echo $stmt->errorCode();
        return false;
    }


    private function saveEachInfo($data, $caseID, $table)
    {
        list(, $prefix) = explode("_", $table);
        extract($data);
        $varName = $prefix . "_name";
        $varAge = $prefix . "_age";
        $varGender = $prefix . "_gender";
        $varContact = $prefix . "_contact";

        $query = "INSERT INTO {$table} (case_id, {$varName}, {$varAge}, {$varGender}, {$varContact}) 
                VALUES (:case_id, :actor_name, :age, :gender, :contact)";
        $query2 = "INSERT INTO {$table} (case_id, Id, {$varName}, {$varAge}, {$varGender}, {$varContact}) 
                VALUES (:case_id, :id, :actor_name, :age, :gender, :contact)";

        $stmt = $prefix == "perpetrator" ? $this->conn->prepare($query2) : $this->conn->prepare($query);


        $name = htmlspecialchars(strip_tags($name));
        $gender = htmlspecialchars(strip_tags($gender));
        $age = htmlspecialchars(strip_tags($age));
        $contact = htmlspecialchars(strip_tags($contact));


        if ($prefix == "perpetrator") {
            $stmt->bindParam(":id", $ID);
        }
        $stmt->bindParam(":case_id", $caseID);
        $stmt->bindParam(":actor_name", $name);
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

    private function savePerpetratorInfo($data, $caseID, $table)
    {
        list(, $prefix) = explode("_", $table);
        $isSuccessful = true;
        foreach ($data as $record) {
            if (!$this->saveEachInfo($record, $caseID, $table, $prefix)) {
                global $isSuccessful;
                $isSuccessful = false;
                break;
            };
        }
        return $isSuccessful;
    }

    function readCase()
    {
        $query = "SELECT * FROM " . CASE_TABLE . " c JOIN " . VICTIM_TABLE . " v ON c.case_id = v.case_id 
                    JOIN " . REPORTER_TABLE . " r ON v.case_id = r.case_id 
                    JOIN " . PERPETRATOR_TABLE . " p ON r.case_id = p.case_id";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();
        return $stmt->rowCount() > 0 ? $stmt->fetchAll(PDO::FETCH_ASSOC) : array();
    }

    function updateCaseStatus($data)
    {
        //convert the object into an array
        $arr = json_decode(json_encode($data), TRUE);

        extract($arr);
        $query = "UPDATE " . CASE_TABLE . " SET case_status = :case_status WHERE case_id = :case_id";

        $stmt = $this->conn->prepare($query);

        $case_id = htmlspecialchars(strip_tags($case_id));
        $case_status = htmlspecialchars(strip_tags($case_status));


        $stmt->bindParam(":case_id", $case_id);
        $stmt->bindParam(":case_status", $case_status);


        return ($stmt->execute()) ? true : false;
    }
}
