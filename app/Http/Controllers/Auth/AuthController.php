<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    //

    public function register(Request $request)
    {
        // dd($request);
        $request->validate([
            'firstName' => 'required',
            'lastName' => 'nullable',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            // 'user_name' => strtolower($request->firstName) . '_' . rand(1000, 9999),
            'name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            // 'profile_pic' => 'default.png',
            // 'about_yourself' => '',
        ]);

        // Auth::login($user);

        // return redirect()->route('dashboard');
        // Instead of redirect
        // return response()->json([
        //     'success' => true,
        //     'message' => 'Account created successfully',
        //     'user' => $user
        // ]);
    }
    // Show login page
    public function showLogin()
    {
        return Inertia::render('Auth/AuthPage'); // Your React page
    }

    // Handle login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if (Auth::attempt($credentials, $request->remember)) {
            $request->session()->regenerate();
            return redirect()->intended('/dashboard'); // redirect to dashboard
        }

        return back()->withErrors([
            'email' => 'Invalid email or password',
        ])->onlyInput('email');
    }

    // Show register page (if separate)
    public function showRegister()
    {
        return Inertia::render('Auth/RegisterPage');
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $role = $user->role;
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();


        if ($role == 1) {
            // redirect non-admins
            return redirect('/'); // or any page for non-admins
        }
        return redirect('/login');
    }
}
