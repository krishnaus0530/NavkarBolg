<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PropertiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('properties')->insert([
            [
                'id' => 1,
                'image_url' => 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop',
                'image' => null,
                'title' => 'Modern Luxury Villa in Beverly Hills',
                'location' => 'Beverly Hills, Los Angeles',
                'description' => 'Stunning modern villa with panoramic city views, infinity pool, and smart home features. This 5-bedroom property features floor-to-ceiling windows, gourmet kitchen, home theater, and private garden.',
                'created_at' => '2026-01-31 06:39:16',
                'updated_at' => '2026-01-31 06:39:16',
            ],
            [
                'id' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w-800&auto=format&fit=crop',
                'image' => null,
                'title' => 'Beachfront Property in Santa Monica',
                'location' => 'Santa Monica, Los Angeles',
                'description' => 'Direct beach access from this contemporary beach house. Features include oceanfront patio, rooftop deck, 4 bedrooms, 3.5 bathrooms, and private beach cabana. Perfect for coastal living.',
                'created_at' => '2026-01-31 06:39:16',
                'updated_at' => '2026-01-31 06:39:16',
            ],
        ]);
    }
}


// large 
// namespace Database\Seeders;

// use Illuminate\Database\Seeder;
// use Illuminate\Support\Facades\DB;
// use Carbon\Carbon;

// class PropertiesTableSeeder extends Seeder
// {
//     /**
//      * Run the database seeds.
//      */
//     public function run(): void
//     {
//         DB::table('properties')->insert([
//             [
//                 'id' => 1,
//                 'image_url' => 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Modern Luxury Villa in Beverly Hills',
//                 'location' => 'Beverly Hills, Los Angeles',
//                 'description' => 'Stunning modern villa with panoramic city views, infinity pool, and smart home features. This 5-bedroom property features floor-to-ceiling windows, gourmet kitchen, home theater, and private garden.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 2,
//                 'image_url' => 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w-800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Beachfront Property in Santa Monica',
//                 'location' => 'Santa Monica, Los Angeles',
//                 'description' => 'Direct beach access from this contemporary beach house. Features include oceanfront patio, rooftop deck, 4 bedrooms, 3.5 bathrooms, and private beach cabana. Perfect for coastal living.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 3,
//                 'image_url' => 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Downtown LA Penthouse with Skyline View',
//                 'location' => 'Downtown Los Angeles',
//                 'description' => 'Luxury penthouse in the heart of downtown with 360-degree city views. Features private elevator, chef\'s kitchen, wine cellar, and expansive terrace with outdoor kitchen and fire pit.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 4,
//                 'image_url' => 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Hollywood Hills Modern Retreat',
//                 'location' => 'Hollywood Hills, Los Angeles',
//                 'description' => 'Architectural masterpiece nestled in Hollywood Hills. Features floor-to-ceiling glass walls, infinity pool overlooking the city, 4 bedrooms, home gym, and integrated smart home system.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 5,
//                 'image_url' => 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Venice Beach Artistic Bungalow',
//                 'location' => 'Venice Beach, Los Angeles',
//                 'description' => 'Charming artistic bungalow steps away from Venice Beach boardwalk. Features custom murals, rooftop deck, 3 bedrooms, open-concept living space, and private courtyard with outdoor shower.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 6,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 7,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 8,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 9,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 10,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 11,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 12,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 13,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 14,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 15,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 16,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 17,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//             [
//                 'id' => 18,
//                 'image_url' => 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
//                 'image' => null,
//                 'title' => 'Malibu Oceanfront Estate',
//                 'location' => 'Malibu, Los Angeles',
//                 'description' => 'Spectacular oceanfront estate in Malibu with private beach access. Property includes main house with 6 bedrooms, guest house, tennis court, wine cellar, and dramatic cliffside pool.',
//                 'created_at' => '2026-01-31 06:39:16',
//                 'updated_at' => '2026-01-31 06:39:16',
//             ],
//         ]);
//     }
// }