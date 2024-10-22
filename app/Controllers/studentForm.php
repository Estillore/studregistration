<?php

namespace App\Controllers;

use App\Models\studCredentials;

class studentForm extends BaseController
{
    protected $studModel;

    public function __construct()
    {
        $this->studModel = new studCredentials();
    }

    public function index()
    {
        return view('student_form');
    }

    public function upload()
    {
        $image = $this->request->getFile('image');

        if ($image->isValid() && !$image->hasMoved()) {
            $path = WRITEPATH . 'uploads/' . $image->getName();
            
            if ($image->move(WRITEPATH . 'uploads')){
                if (file_exists($path)) {
                   echo 'successfully';
                } 
            } 
        }
    }
}
