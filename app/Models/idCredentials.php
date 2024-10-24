<?php 

namespace App\Models;

use CodeIgniter\Model;

class idCredentials extends Model
{
    protected $table = 'idcredentials';
    protected $primaryKey = "id";
    protected $allowedFields = ['studentname','studentemail','studentphone','studentaddress','guardianname','guardianphone','guardianemail','alternativeaddress','emergencycontact','studentnumber','image','userid'];

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
}