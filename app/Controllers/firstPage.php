<?php 

namespace App\Controllers;

use App\Models\sidebar;

class firstPage extends BaseController
{

    protected $sidebarVal;

    public function __construct()
    {
        $this->sidebarVal = new sidebar();
    }

    public function index()
    {
        $data = [
             'content' => 'assets/js/pages/homepage.js'
        ];

        return view('main', $data);
    }    

    public function getSidebar()
    {
        $response = [
            'status' => true,
            'sidebar' => $this->sidebarVal->findAll()
        ];

        return $this->response->setJSON($response);
    }

}