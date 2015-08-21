<?php
if(!defined('BASEPATH')) exit('Developer: you are not supposed to be here, try <a href="www.eelslap.com">this</a>.');
class DatabaseCalls extends CI_Controller{
    
    //save message
    public function processForm(){
        $agentNameSend = $this->input->post('agentNameSend');
        $keySend = $this->input->post('keySend');
        $msg = $this->input->post('msg');
        
        //print $agentNameSend;
        //print $keySend;
        //print $msg;
        
        //insert query
        $insertQuery = $this->db->query("
            INSERT INTO messages (agentName,keyCode,msg) 
            VALUES (".$this->db->escape($agentNameSend).", ".$this->db->escape($keySend).",".$this->db->escape($msg).")
        ");
        //NEEDS TO BE XHR
        //redirect('/');
        //phpinfo();
    }
    
    //read message
    public function test(){
        
        var testvar = {agentName:'johnsmith',keyCode:'oorgle'};
        return testvar;
        
        $agentNameRead = $this->input->post('agentNameRead');
        $keyRead = $this->input->post('keyRead');
        
        $agentNameRead = $this->input->post('agentNameRead');
        $keyRead = $this->input->post('keyRead');
        //predefine search queries
        $anr = $this->db->escape($agentNameRead);
        $kr = $this->db->escape($keyRead);
        //search query
        $searchQuery = $this->db->query("
            SELECT *
            FROM messages
            WHERE agentName = ".$this->db->escape($agentNameRead)." and keyCode = ".$this->db->escape($keyRead).";
        ");
//        
//        //WHERE agentName = ".$this->db->escape($agentNameRead)." and keyCode = ".$this->db->escape($keyRead).";
//        
        foreach ($searchQuery->result() as $row){
            echo $row->msg;
        };
        
        
    public function test(){
        // get the ajax input
        $input = json_decode(file_get_contents('php://input'));

        // $input can be accessed like an object
        $kc = $input->keyCode;
        $an = $input->agentName;

        // you can encode data back to JSON
        $output = json_encode($input);

        // and the response goes back!
        echo($output);
        
        //
        return $input;
        alert('test fired');
    }
        
        
};
?>