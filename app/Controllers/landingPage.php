<?php 

namespace App\Controllers;

class landingPage extends BaseController
{
    public function index()
    {
        $data = [
                'content' => 'assets/js/pages/landing.js'
        ];

        return view('main', $data);
    }
}

