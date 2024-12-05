<?php 

namespace App\Models;

use CodeIgniter\Model;

class idCredentials extends Model
{
    protected $table = 'idcredentials';
    protected $primaryKey = "id";
    protected $allowedFields = ['studentname','studentemail','studentphone','studentaddress','guardianname','guardianphone','guardianemail','alternativeaddress','emergencycontact','studentnumber','image','userid','pdf'];

    public function adduser($data)
    {
        return $this->insert($data);
    }

    public function updateUserImage($userid, $newFileName)
    {
        $user_row = $this->where('userid' , $userid)->first();

        if($user_row){
            $data = [
                'image' => $newFileName
            ];

            return $this->update($user_row['id'], $data);
        }

        return false;
    }

    public function updateUserId($userid,$username)
    {
        $student = $this->where('studentname', $username)->first();

        if($student){
            return $this->update($student['id'], [
                'userid' => $userid
            ]);
        }
    }

    public function studentCredentials($studentid)
    {   
        if (is_array($studentid)) {
            $user_exist = $this->whereIn('userid', $studentid)->find();
            return $user_exist;
        }
    }

    public function getPdf($file, $id)
    {   
        $user = $this->where('userid', $id)->first();

        if($user){
            return $this->update($user['id'], [
                'pdf' => $file
            ]);
        }
    }
}