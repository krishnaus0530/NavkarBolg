<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // ini_set('memory_limit', '512M');
        // ini_set('max_execution_time', '300'); // seconds
        // ini_set('max_input_time', '300');
        //
        // Share authenticated user with all Inertia pages
        Inertia::share([
            'auth.user' => function () {
                $user = Auth::user();
                return $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'last_name' => $user->last_name,
                    'role'=>$user->role,
                    'email' => $user->email,
                    'created_at' => $user->created_at->format('Y-m-d H:i:s'),
                    'updated_at' => $user->updated_at->format('Y-m-d H:i:s'),
                    // Add more fields as needed
                    'profile_pic' => $user->profile_pic ?? null,
                    'about_yourself' => $user->about_yourself ?? '',
                ] : null;
            },
        ]);
    }
}
