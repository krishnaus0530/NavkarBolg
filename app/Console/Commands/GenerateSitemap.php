<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Blog;
use App\Models\Blog_category;
use App\Models\Property;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate the website sitemap';

    public function handle()
    {
        // --- Set your domain here ---
        $domain =  env('APP_URL', 'http://localhost');

        // --- Create sitemap instance ---
        $sitemap = Sitemap::create();

        // --- Static public pages ---
        $staticPages = [
            '', 'About', 'service', 'contact',
            'propertyBuyingPage', 'propertySellingPage',
            'propertyManagement', 'RegulatoryCompliance',
            'PropertyOperations', 'PrivacyPolicy',
            'CCPACompliance', 'realEstateInvestment',
            'legal_Documentation', 'property', 'login', 'comment'
        ];

        foreach ($staticPages as $page) {
            $url = $page === '' ? $domain : rtrim($domain, '/') . '/' . ltrim($page, '/');
            $sitemap->add(Url::create($url));
        }

        // --- Blog pages ---
        $blogs = Blog::all();
        foreach ($blogs as $blog) {
            $url = rtrim($domain, '/') . "/blog/showDetail/{$blog->id}";
            $sitemap->add(Url::create($url));
        }

        // --- Blog categories ---
        $categories = Blog_category::all();
        foreach ($categories as $category) {
            $url = rtrim($domain, '/') . "/blog?category={$category->id}";
            $sitemap->add(Url::create($url));
        }

        // --- Property pages ---
        $properties = Property::all();
        foreach ($properties as $property) {
            $url = rtrim($domain, '/') . "/properties/{$property->id}";
            $sitemap->add(Url::create($url));
        }

        // --- Write sitemap to public folder ---
        $sitemap->writeToFile(public_path('sitemap.xml'));

        $this->info('Sitemap generated successfully!');
    }
}


// namespace App\Console\Commands;

// use Illuminate\Console\Command;

// class GenerateSitemap extends Command
// {
//     /**
//      * The name and signature of the console command.
//      *
//      * @var string
//      */
//     protected $signature = 'app:generate-sitemap';

//     /**
//      * The console command description.
//      *
//      * @var string
//      */
//     protected $description = 'Command description';

//     /**
//      * Execute the console command.
//      */
//     public function handle()
//     {
//         //
//     }
// }
