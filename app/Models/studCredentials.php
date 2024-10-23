<?php 

namespace App\Models;

use CodeIgniter\Model;

class studCredentials extends Model
{
    protected $table = 'studentcred';
    protected $primaryKey = 'id'; 
    protected $allowedFields = ['studid', 'studpass'];

    public function loginVal(array $data)
    {
        $student = $this->where('studid', $data['studid'])->first();
    
        if ($student && $data['studpass'] === $student['studpass']) {
            return $student;
        }
    
        return false;
    }
    
    public function getUser($idnumber)
    {
        return $this->where('studid', $idnumber)->first();
    }
}
