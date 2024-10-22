<?php 

namespace App\Controllers;

use App\Models\IDcredentials;

class userPage extends BaseController
{
    protected $idCred;

    public function __construct()
    {
        $this->idCred = new IDcredentials();
    }

    public function index()
    {
        $data = [
            'content' => "assets/js/pages/userpage.js"
        ];

        return view('main' , $data);
    }

    public function createUser()
    {
        $studentName = $this->request->getPost('studentName');
        $studentEmail = $this->request->getPost('studentEmail');
        $studentPhone = $this->request->getPost('studentPhone');
        $studentAddress = $this->request->getPost("studentAddress");
        $guardianName = $this->request->getPost("guardianName");
        $guardianPhone = $this->request->getPost("guardianPhone");
        $guardianEmail = $this->request->getPost("guardianEmail");
        $alternativeAddress = $this->request->getPost("alternativeAddress");
        $emergencyContact = $this->request->getPost("emergencyContact");
        $studentnumber = $this->request->getPost("studentnumber");

        $data = [
            'studentname' => $studentName,
            'studentemail' => $studentEmail,
            'studentphone' => $studentPhone,
            'studentaddress' => $studentAddress,
            'guardianname' => $guardianName,
            'guardianphone' => $guardianPhone,
            'guardianemail' => $guardianEmail,
            'alternativeaddress' => $alternativeAddress,
            'emergencycontact' => $emergencyContact,
            'studentnumber' => $studentnumber
        ];

        $this->idCred->adduser($data);

        $response = [
            'status' => true,
            'data' => $data
        ];

        return $this->response->setJSON($response);
    }
}