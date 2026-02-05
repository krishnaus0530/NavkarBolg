<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BlogCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('blog_categories')->insert([
            [
                'id' => 1,
                'category_name' => 'Property Tips',
                'icon' => null,
                'created_at' => '2026-01-31 06:39:55',
                'updated_at' => '2026-01-31 06:39:55',
            ],
            [
                'id' => 2,
                'category_name' => 'Market Trends',
                'icon' => null,
                'created_at' => '2026-01-31 06:40:00',
                'updated_at' => '2026-01-31 06:40:00',
            ],
            [
                'id' => 3,
                'category_name' => 'Resident Guides',
                'icon' => null,
                'created_at' => '2026-01-31 06:40:04',
                'updated_at' => '2026-01-31 06:40:04',
            ],
            [
                'id' => 4,
                'category_name' => 'Maintenance',
                'icon' => null,
                'created_at' => '2026-01-31 06:40:08',
                'updated_at' => '2026-01-31 06:40:08',
            ],
            [
                'id' => 5,
                'category_name' => 'Community',
                'icon' => null,
                'created_at' => '2026-01-31 06:40:12',
                'updated_at' => '2026-01-31 06:40:12',
            ],
            [
                'id' => 6,
                'category_name' => 'Industry News',
                'icon' => null,
                'created_at' => '2026-01-31 06:40:16',
                'updated_at' => '2026-01-31 06:40:16',
            ],
        ]);
    }
}