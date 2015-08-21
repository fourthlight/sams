<?php
if(!defined('BASEPATH')) exit('Developer: you are not supposed to be here, try <a href="www.eelslap.com">this</a>.');
class SamsDatabase extends CI_Controller{
    //save message
    public function saveMessage(){
        //header stuff
        header("Content-Type: application/json");
        //agentName variable
        $an = $this->uri->segment(3);
        //keyCode variable
        $kc = $this->uri->segment(4);
        //message variable
        $msg = $this->uri->segment(5);
        //create and run insert query
        $insertQuery = $this->db->query("
            INSERT INTO messages (agentName,keyCode,msg) 
            VALUES (".$this->db->escape($an).", ".$this->db->escape($kc).",".$this->db->escape($msg).")
        ");//end insertQuery method
    }//end saveMessage
    //read message
    public function readMessage(){
        //agentName variable
        $an = $this->input->post('agentName');
        //keyCode variable
        $kc = $this->input->post('keyCode');
        //create and run search query
        $searchQuery = $this->db->query("
            SELECT *
            FROM messages
            WHERE agentName = ".$this->db->escape($an)." and keyCode = ".$this->db->escape($kc).";
        ");
        //foreach loop through results
        foreach ($searchQuery->result() as $row){
            echo json_encode($row);
        }
        //send delete in 30 seconds statement
        $deleteMe = $this->db->query("
            DELETE
            FROM messages 
            WHERE agentName = ".$this->db->escape($an)."
        ");
    }//end readMessage
};//end class
?>