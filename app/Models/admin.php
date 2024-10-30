<?php 

namespace App\Models;

use CodeIgniter\Model;

class admin extends Model
{
    protected $table = "admin";
    protected $primaryKey = "id";
    protected $allowedFields = ['username','password','role'];

    public function loginVal($data)
    {
        return $this->where($data)->first();
    }
}