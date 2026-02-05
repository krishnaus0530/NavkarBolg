<?php

use App\Http\Controllers\BlogCategoryController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\PropertyInquiryController;
use App\Models\Blog_category;
use App\Models\Property;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthController;

// Route::get('/', function () {
//     return view('welcome');
// });


//public
Route::get('/', function () {
    return Inertia::render('Home');
})->name('Home');
Route::get('/About', function () {
    return Inertia::render('About');
})->name('About');
Route::get('/service', function () {
    return Inertia::render('Services/Services');
})->name('service');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('Contact');

Route::get('/propertyBuyingPage', function () {
    return Inertia::render('Services/Property_Buying_one');
})->name('propertyBuyingPage');

Route::get('/propertySellingPage', function () {
    return Inertia::render('Services/PropertySellingPage');
})->name('propertySellingPage');

Route::get('/propertyManagement', function () {
    return Inertia::render('Services/PropertyManagement');
})->name('propertyManagement');

Route::get('/RegulatoryCompliance', function () {
    return Inertia::render('Services/RegulatoryCompliance');
})->name('RegulatoryCompliance');

Route::get('/PropertyOperations', function () {
    return Inertia::render('Services/PropertyOperations');
})->name('PropertyOperations');

Route::get('/PrivacyPolicy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('PrivacyPolicy');
Route::get('/CCPACompliance', function () {
    return Inertia::render('CCPACompliance');
})->name('CCPACompliance');


Route::get('/realEstateInvestment', function () {
    return Inertia::render('Services/RealEstateInvestment');
})->name('realEstateInvestment');

Route::get('/legal_Documentation', function () {
    return Inertia::render('Services/Legal_Documentation');
})->name('legal_Documentation');

Route::get('/property', function () {
    return Inertia::render('property');
})->name('property');

Route::get('/blog', [BlogController::class, 'blogListing'])->name('blog');
Route::get('/blog/showDetail/{id}', [BlogController::class, 'showOne'])
    ->name('blog.show');

Route::get('/blogs/load-more', [BlogController::class, 'loadMoreBlogs'])->name('blogs.load-more');

// Route::get('/blog', function () {
//     return Inertia::render('blog');
// })->name('blog');



Route::get('/login', function () {
    return Inertia::render('Auth/AuthPage');
})->name('AuthPage');

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/phpinfo', function() {
    return phpinfo();
});

Route::get('/comment', function () {
    return Inertia::render('Comment');
})->name('comment');

// Optional routes for future enhancements
Route::get('/properties', [PropertyController::class, 'index'])->name('properties.index');

Route::post('/property-inquiry', [PropertyInquiryController::class, 'store'])->name('property.inquiry.store');

Route::get('/comments/{postId}', [CommentController::class, 'fetch']);
Route::post('/comment', [CommentController::class, 'store'])->name('comments.store');
Route::put('/comments/{id}', [CommentController::class, 'update']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

Route::post('/blog/like', [CommentController::class, 'likestore']);
// Route::match(['get', 'post'], '/blog/like', [CommentController::class, 'likestore']);
//protected

Route::middleware(['auth', 'check.admin'])->group(function () {
    $user = Auth::user(); // get the logged-in user

    if ($user && $user->role == 0) {
        return redirect('/');
    }
    Route::get('/dashboard', function () {
        $stats = [
            'total_properties' => DB::table('properties')->count(),
            'total_blogs' => DB::table('blogs')->count(),
            'total_blog_categories' => DB::table('blog_categories')->count(),
            'total_users' => DB::table('users')->count(),
            'total_messages' => DB::table('property_inquiries')->count(),
        ];
        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    })->name('dashboard');


    //property
    Route::get('/properties/create', [PropertyController::class, 'create'])->name('properties.create');
    Route::post('/properties', [PropertyController::class, 'store'])->name('properties.store');
    Route::get('/property/admin/index', [PropertyController::class, 'adminIndex'])->name('properties.admin.index');
    Route::get('/properties/{id}', [PropertyController::class, 'show'])->name('properties.show');
    Route::get('/properties/{id}/edit', [PropertyController::class, 'edit'])->name('properties.edit');
    Route::put('/properties/{id}', [PropertyController::class, 'update'])->name('properties.update');
    Route::delete('/properties/{id}', [PropertyController::class, 'destroy'])->name('properties.destroy');
    //property

    //messages
    Route::get('/messages', [PropertyInquiryController::class, 'index'])->name('property-inquiries.index');
    Route::delete('/messages/{id}', [PropertyInquiryController::class, 'destroy'])->name('property-inquiries.destroy');
    //messages

    //blogs
    Route::get('/blogs', [BlogController::class, 'index'])->name('admin.blogs.index');
    Route::get('/blogs/show/{id}', [BlogController::class, 'show'])
        ->name('admin.blog.show');

    Route::get('/blogs/{id}/edit', [BlogController::class, 'edit'])->name('admin.blog.edit');
    Route::put('/blogs/{id}', [BlogController::class, 'update'])->name('admin.blog.update');

    Route::delete('/blogs/{id}', [BlogController::class, 'destroy'])->name('admin.blog.destroy');
    Route::delete('/blog-images/{id}', [BlogController::class, 'deleteImage'])->name('admin.blog.image.delete');

    Route::get('/blogs/create', [BlogController::class, 'create'])->name('admin.blog.create');
    Route::post('/blogs', [BlogController::class, 'store'])->name('admin.blog.store');
    Route::get('/createPost', function () {
        // dd(Blog_category::all());
        return Inertia::render('Admin/Blog/create', [
            'categories' => Blog_category::all(),
            'users' => User::select('id', 'name', 'email')->get()
        ]);
        // return Inertia::render('Admin/Blog/create');
    })->name('createPost');
    //blogs

    Route::get('/categories', [BlogCategoryController::class, 'index'])->name('categories.index');
    Route::post('/categories', [BlogCategoryController::class, 'store'])->name('categories.store');
    Route::put('/categories/{id}', [BlogCategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{id}', [BlogCategoryController::class, 'destroy'])->name('categories.destroy');

    // });
// Route::get('/dashboard', function () {
//     return Inertia::render('Admin/Dashboard');
});



Route::get('/robots.txt', function () {
    // Domain ko config file se le rahe hain
    $domain = env('APP_URL', 'http://localhost');

    // User-agent aur disallowed routes
    $content = "User-agent: *\n";
    $content .= "Disallow: /dashboard/\n";
    $content .= "Disallow: /properties/create\n";
    $content .= "Disallow: /properties/*/edit\n";
    $content .= "Disallow: /blogs/create\n";
    $content .= "Disallow: /blogs/*/edit\n";
    $content .= "Disallow: /categories\n";
    $content .= "Disallow: /messages\n";
    $content .= "Disallow: /login\n";
    $content .= "Disallow: /register\n";
    $content .= "Disallow: /logout\n\n";

    // Sitemap URL
    $content .= "Sitemap: " . rtrim($domain, '/') . "/sitemap.xml\n";

    // Return plain text response
    return response($content, 200)
        ->header('Content-Type', 'text/plain');
});

// Route::get('/createPost', function () {
//     return Inertia::render('Admin/Blog/create');
// })->name('createPost');
