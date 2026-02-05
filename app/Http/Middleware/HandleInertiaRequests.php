<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'logo' => env('APP_LOGO', '-'),
            'APP_DOMAIN'=> env('APP_DOMAIN', '-'),
            'APP_URL'=> env('APP_URL', '-'),

            'BRAND_WORD' => env('APP_BRAND_WORD', '-'),
            'HOME_WORD_1' => env('APP_HOME_WORD_1', '-'),
            'HOME_WORD_2' => env('APP_HOME_WORD_2', '-'),
            'HOME_WORD_3' => env('APP_HOME_WORD_3', '-'),
            

            'Contact' => env('APP_LAD_LINE_NO', '-'),
            'Email' => env('APP_EMAIL_ID', '-'),
            'Address_1' => env('APP_ADDRESS_1', '-'),
            'Address_2' => env('APP_ADDRESS_2', '-'),

            'facebook' => env('APP_FACEBOOK_LINK', "https://www.facebook.com"),
            'twitter' => env('APP_TIWEETER_LINK', "https://www.twitter.com"),
            'linkedin' => env('APP_LINKED_LINK', "https://www.linkedin.com"),
            'instagram' => env('APP_INSTAGRAM_LINK', "https://www.instagram.com"),

            'footer_content' => env('APP_FOOTER_CONTENT', '-'),
            //
        ];
    }
}
