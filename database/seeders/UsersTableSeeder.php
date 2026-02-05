<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'id' => 1,
                'user_name' => null,
                'role' => '0',
                'name' => 'Admin',
                'last_name' => null,
                'email' => 'admin@gmail.com',
                'email_verified_at' => '2026-01-31 06:39:16',
                'password' => Hash::make('12345678'), // Note: Original hash replaced for seeding
                'profile_pic' => null,
                'about_yourself' => null,
                'remember_token' => 'thC3Cl1L3g',
                'created_at' => '2026-01-31 06:39:16',
                'updated_at' => '2026-01-31 06:39:16',
            ],
        ]);
    }
}