<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->post('/Home/Login' , "Home::LoginUsers");
$routes->post('/Home/adminLogin' , "Home::adminLogin");

//homepage.
$routes->get('/Home', 'firstPage::index'); //this is for the admin side.
$routes->get('/sidebar' , 'firstPage::getSidebar');
$routes->get('/getStudents' , 'Home::getStudents');

//the user should only have a ID form to fill up. nothing else. 
$routes->get('/userPage' , 'userPage::index');
$routes->get('/getUserCredit' , 'userPage::getUserProgress');
$routes->post('/createUser' , 'userPage::createUser');
$routes->post('/statusUpdate' , 'userPage::statusUpdate');
$routes->post('/uploadimage' , 'userPage::uploadImage');
$routes->post('/updateProgress' , 'userPage::updateProgress');
$routes->post('/updateUserId' , 'userPage::updateUserId');

//get user credits
$routes->post('/getStudentCredits', 'userPage::userCredentials');
$routes->post('/userApproval' , 'userPage::requestApproval');