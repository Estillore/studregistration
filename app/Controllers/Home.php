<?php

namespace App\Controllers;

use App\Models\studCredentials;
use App\Models\admin;
use App\Models\idcredentials;

class Home extends BaseController
{
    protected $studModel;
    protected $adminModel;
    protected $studInformation;

    public function __construct()
    {

        $this->adminModel = new admin();
        $this->studModel = new studCredentials();
        $this->studInformation = new idCredentials();
    }

    public function index(): string
    {
        $data = [
            'content' => 'assets/js/pages/login.js'
        ];

        return view('main', $data);
    }

    public function LoginUsers()
    {
        $idnumber = $this->request->getPost('idnumber');
        $password = $this->request->getPost('password');

        $data = [
            'studid' => $idnumber,
            'studpass' => $password
        ];

        $isValid = $this->studModel->loginVal($data);   

        if($isValid){
            if($data['studid'] === "admin" && $data['studpass'] === "admin"){
                $session = session();
                $session->set($data);
                $session->set('loggedIn',true);
                $userSession = $session->get();
                $response = ['status' => 'success', 'role' => 'admin','session' => $userSession, 'valid' => $isValid];
            } else {
                $userData = $this->studModel->getUser($idnumber);
                $session = session();
                $session->set($userData);
                $session->set('loggedIn',true);
                $userSession = $session->get();
                $response = ['status' => 'success', 'session' => $userSession, 'valid' => $isValid];
            }
        } else {
            $response = ['status' => 'error', 'data' => $data, 'valid' => $isValid];
        }

        return $this->response->setJSON($response);
    }

    public function getStudents()
    {
        $response = [
            'status' => true,
            'data' => $this->studModel->findAll()
        ];

        return $this->response->setJSON($response);
    }
}
