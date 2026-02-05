<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
            BlogCategoriesTableSeeder::class,
            BlogsTableSeeder::class,
            PropertiesTableSeeder::class,
        ]);
    }
}
// namespace Database\Seeders;

// use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
// use Illuminate\Database\Seeder;

// class DatabaseSeeder extends Seeder
// {
//     use WithoutModelEvents;

//     /**
//      * Seed the application's database.
//      */
//     public function run(): void
//     {
//         $this->call([
//             PropertySeeder::class,
//             // Add other seeders here
//         ]);
//         // User::factory(10)->create();

//        User::factory()->create([
//             'name' => 'Krishna Singh',
//             'email' => 'krishna@gmail.com',
//             'password' => bcrypt('12345678'), // Set a password
//             'role'=>0
//         ]);
//     }
// }
