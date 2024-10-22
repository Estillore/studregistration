<?php 

namespace App\Models;

use CodeIgniter\Model;

class idCredentials extends Model
{
    protected $table = 'idcredentials';
    protected $primaryKey = "id";
    protected $allowedFields = ['studentname','studentemail','studentphone','studentaddress','guardianname','guardianphone','guardianemail','alternativeaddress','emergencycontact','studentnumber'];

    public function adduser($data)
    {
        return $this->insert($data);
    }
}