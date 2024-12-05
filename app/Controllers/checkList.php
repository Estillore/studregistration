<?php 

namespace App\Controllers;

class checkList extends BaseController 
{
        public function index()
        {
                $data = [
                        'content' => 'assets/js/pages/checklist.js'
                ];
        
                return view('main', $data);
        }
}