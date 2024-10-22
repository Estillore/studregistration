<?php 

namespace App\Models;

use CodeIgniter\Model;

class sidebar extends Model 
{
    protected $table ="sidebar";
    protected $primaryKey = "id";
    protected $allowedFields = ['sidebar'];
}