<?php 

namespace App\Controllers;

use App\Models\idCredentials;
use App\Models\studCredentials;

class userPage extends BaseController
{
    protected $idCred;
    protected $stud_credentials;

    public function __construct()
    {
        $this->stud_credentials = new studCredentials();
        $this->idCred = new idCredentials();
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

    public function uploadImage()
    {
        $image = $this->request->getFile('image');
        $userid = $this->request->getPost('user_id');

        if ($image && $image->isValid() && !$image->hasMoved()) {
            $uploadPath = WRITEPATH . 'uploads/'.$userid; 
    
            $image->move($uploadPath);
    
            $newFileName = $image->getName();

            if($newFileName){
                $this->idCred->updateUserImage($userid, $newFileName);

                $response = [
                    'userid' => $userid,
                    'status' => true,
                    'message' => 'Image uploaded successfully.',
                    'fileName' => $newFileName,
                    'filePath' => $uploadPath . '/' . $newFileName
                ];

                return $this->response->setJSON($response);
            }else{
                $response = [
                    'status' => false,
                    'message' => 'File upload failed!',
                ];

                return $this->response->setJSON($response);

            }
        } else {
            $response = [
                'status' => false,
                'message' => 'File upload failed!',
            ];

            return $this->response->setJSON($response);

        }

    }

    public function updateProgress()
    {
        $input = $this->request->getJSON();

        if($input){
            $user_id = $input->userid ?? null;
            $user_stage = $input->stage ?? null;
            $user_progress = $input->progress ?? null;

            if($user_id && $user_stage && $user_progress){
                $this->stud_credentials->update_progress($user_id, $user_stage, $user_progress);
                return $this->response->setJSON([
                    'status' => true,
                    'stage' => $user_stage,
                    'progress' => $user_progress
                ]);
            }
        }
    }

    public function getUserProgress()
    {
        $response = [
            'status' => true,
            'user_data' => $this->stud_credentials->findAll()
        ];

        return $this->response->setJSON($response);
    }

    public function statusUpdate()
    {
        $input = $this->request->getJSON();

        if($input){
            $user_status = $input->status ?? null;
            $user_id = $input->userid ?? null;

            if($user_status){
                $this->stud_credentials->userstatus($user_status, $user_id);
                return $this->response->setJSON([
                    'status' => true,
                    'userid' => $user_id,
                    'status_code' => $user_status
                ]);
            }
        }
    }

    public function updateUserId()
    {
        $input = $this->request->getJSON();

        if($input){
            $userid = $input->userid ?? null;
            $username = $input->username ?? null;

            if($username && $userid){
                $this->idCred->updateUserId($userid,$username);
            }
        }

        $response = [
            'status' => true,
            'userid' => $input->userid ?? null,
            'username' => $input->username ?? null
        ];

        return $this->response->setJSON($response);
    }
}