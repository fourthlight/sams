<?php
if(!defined('BASEPATH')) exit('Developer: you are not supposed to be here, try <a href="www.eelslap.com">this</a>.');
class SamsController extends CI_Controller{
    //index
    public function index(){
        //load main page
        $this->load->view('header');
        $this->load->view('body');
        $this->load->view('footer');
    }
};
?>