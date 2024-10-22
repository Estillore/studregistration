<?php

namespace App\Controllers;

use App\Models\studCredentials;

class Home extends BaseController
{
    protected $studModel;

    public function __construct()
    {
        $this->studModel = new studCredentials();
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
            $response = ['status' => 'success', 'data' => $data, 'valid' => $isValid];
        }else{
            $response = ['status' => 'error', 'data' => $data, 'valid' => $isValid];
        }

        return $this->response->setJSON($response);
    }
}
