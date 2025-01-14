<?php 

namespace App\Controllers;

class downloadPage extends BaseController{

        public function index(){
                $data = [
                        'content' => 'assets/js/pages/downloadPage.js'
                ];

                return view('main', $data);
        }
}