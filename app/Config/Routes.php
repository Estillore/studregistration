<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->post('/Home/Login' , "Home::LoginUsers");

//homepage.
$routes->get('/Home', 'firstPage::index'); //this is for the admin side.
$routes->get('/sidebar' , 'firstPage::getSidebar');

//the user should only have a ID form to fill up. nothing else. 
$routes->get('/userPage' , 'userPage::index');
$routes->post('/createUser' , 'userPage::createUser');
$routes->post('/uploadimage' , 'userPage::uploadImage');