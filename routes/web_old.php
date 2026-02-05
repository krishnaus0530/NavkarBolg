<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return view('welcome');
// });

//admin

Route::get('/createPost', function () {
    return Inertia::render('Admin/Blog/create');
})->name('createPost');

//admin

Route::get('/', function () {
    // return "ok";
    return Inertia::render('Home');
})->name('Home');


Route::get('/property', function () {
    // return "ok";
    return Inertia::render('Services/property');
})->name('services.property');


Route::get('/regulatory', function () {
    // return "ok";
    return Inertia::render('Services/regulatory');
})->name('services.regulatory');

Route::get('/contact', function () {
    // return "ok";
    return Inertia::render('contact');
})->name('contact');

Route::get('/resident-portal/rentcafe', function () {
    return redirect()->away(
        'https://www.rentcafe.com/residentservices/apartmentsforrent/userlogin.aspx'
    );
})->name('resident.rentcafe');
Route::get('/CareersPage', function () {
    // return "ok";
    return Inertia::render('CareersPage');
})->name('CareersPage');

Route::get('/StayInTouch', function () {
    // return "ok";
    return Inertia::render('StayInTouch');
})->name('StayInTouch');


Route::get('/BlogPage', function () {
    // return "ok";
    return Inertia::render('BlogPage');
})->name('BlogPage');



Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
});

Route::get('/analytics', function () {
    return Inertia::render('Analytics');
});

Route::get('/users', function () {
    return Inertia::render('Users');
});

Route::get('/orders', function () {
    return Inertia::render('Orders');
});

Route::get('/products', function () {
    return Inertia::render('Products');
});

Route::get('/settings', function () {
    return Inertia::render('Settings');
});

Route::get('/reports/monthly', function () {
    return Inertia::render('Reports/Monthly');
});

Route::get('/reports/financial', function () {
    return Inertia::render('Reports/Financial');
});