<?php 

namespace App\Models;

use CodeIgniter\Model;

class studCredentials extends Model
{
    protected $table = 'studentcred';
    protected $primaryKey = 'id'; 
    protected $allowedFields = ['studid', 'studpass','user_progress','user_stage'];

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

    public function update_progress($user_id,$user_stage,$user_progress)
    {   
        $progress = $this->where('studid' , $user_id)->first();

        if($progress){
            return $this->update($progress['id'], [
                'user_progress' => $user_progress,
                'user_stage' => $user_stage
            ]);
        }

        if (!$progress) {
            log_message('error', "No progress found for user ID: {$user_id}");
            return false;
        }        
    }
}
