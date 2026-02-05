<?php

namespace App\Http\Controllers;

use App\Models\Blog_category;
use App\Models\BlogView;
use Illuminate\Http\Request;
use App\Models\Blog;
use App\Models\BlogImage;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function create()
    {
        return Inertia::render('Admin/Blog/Create', [
            'categories' => Blog_category::all(),
            'users' => User::select('id', 'name', 'email')->get()
        ]);
    }
    public function store(Request $request)
    {
        // dd($request->all()); // Debug ke liye

        // Validate the request with proper rules
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'summary' => 'required|string|max:500',
            'content' => 'required|string',
            'blog_category_id' => 'required',
            'user_id' => 'required|integer|exists:users,id',
            'tags' => 'nullable',
            'keys' => 'nullable|string',
            // 'banner_image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:1843',
            'banner_image' => 'required',
            'content_images_mapping' => 'nullable|string',
            // 'slug' => 'required|string|max:255|unique:blogs,slug',
            'slug' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'authorBio' => 'nullable|string|max:1000',
            'readTime' => 'required|string|max:50',
            'status' => 'required|string|in:draft,published',
            'featured' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:500',
            'publish_date' => 'nullable|date',
        ], [
            'banner_image.required' => 'Featured image is required',
            'banner_image.image' => 'The file must be an image',
            'banner_image.mimes' => 'Allowed image types: jpeg, png, jpg, gif, webp',
            'banner_image.max' => 'Image size should not exceed 1.8 MB', // custom message
            'banner_image.uploaded' => 'Banner image is too large. Maximum allowed size is ' . ini_get('upload_max_filesize') . '.',
            'title.required' => 'Blog title is required',
            'excerpt.required' => 'Excerpt is required',
            'summary.required' => 'Summary is required',
            'content.required' => 'Content is required',
            'slug.required' => 'Slug is required',
            'slug.unique' => 'This slug is already taken',
            'readTime.required' => 'Read time is required',
            'status.required' => 'Status is required',
        ]);
        if ($validator->fails()) {
            // Inertia ke saath errors return karein
            // dd($validator);
            return back()->withErrors($validator)->withInput();
        }

        // dd("here");
        try {
            // Handle banner image upload
            $bannerImagePath = null;
            if ($request->hasFile('banner_image')) {
                $bannerImage = $request->file('banner_image');
                $bannerImagePath = $bannerImage->store('blog/banners', 'public');
            }

            // Prepare tags
            $tags = $request->input('tags', []);
            if (is_string($tags)) {
                $tags = json_decode($tags, true) ?: [];
            }
            // Convert array to JSON for DB storage
            $tagsJson = json_encode($tags, JSON_UNESCAPED_UNICODE);

            // Prepare keys
            $keys = $request->input('keys', '');
            if (is_string($keys)) {
                $keysArray = explode('||', $keys);
                $keysArray = array_filter(array_map('trim', $keysArray));
                $keys = implode('||', $keysArray);
            }
            // Create blog post
            $blog = Blog::create([
                'title' => $request->input('title'),
                'slug' => $request->input('slug'),
                'excerpt' => $request->input('excerpt'),
                'author_name' => $request->input('author') ?? "No",
                'author_bio' => $request->input('authorBio', ''),
                'summary' => $request->input('summary'),
                'content' => $request->input('content'),
                // 'content' => $request->input('content'),
                // 'original_content' => $request->input('original_content', $request->input('content')),
                'tags' => $tagsJson,
                'keys' => $keys,
                'banner_image' => $bannerImagePath,
                'user_id' => $request->input('user_id'),
                'blog_category_id' => 1,
                'read_time' => $request->input('readTime'),
                'status' => $request->input('status'),
                'featured' => $request->boolean('featured', false),
                'seo_title' => $request->input('seo_title', $request->input('title')),
                'seo_description' => $request->input('seo_description', $request->input('excerpt')),
                'seo_keywords' => $request->input('seo_keywords', ''),
                'publish_date' => $request->input('publish_date', now()),
            ]);
            // dd($blog);
            // Handle content images
            $processedContent = $request->input('content');
            $imagesProcessed = 0;

            $mapping = json_decode($request->input('content_images_mapping'), true);

            if (is_array($mapping)) {
                $contentImages = $request->allFiles()['content_images'] ?? [];

                foreach ($mapping as $index => $imageData) {
                    if (!isset($contentImages[$index])) {

                        // Skip if the file does not exist
                        continue;
                    }
                    $imageFile = $contentImages[$index];
                    // dd( $imageFile);

                    if (!$imageFile->isValid()) {
                        // dd("imageFile invalid");
                        dd($imageFile->getErrorMessage());
                        // Skip invalid files
                        continue;
                    }

                    // Store image
                    $imagePath = $imageFile->store('blog/content-images', 'public');

                    // Create BlogImage record
                    BlogImage::create([
                        'image_path' => $imagePath,
                        'blog_id' => $blog->id,
                        'alt_text' => $imageData['alt'] ?? ''
                    ]);

                    // Replace placeholder in content
                    $placeholder = $imageData['placeholder'] ?? '';
                    if ($placeholder) {
                        $processedContent = str_replace($placeholder, Storage::url($imagePath), $processedContent);
                    }
                }

                $blog->update(['content' => $processedContent]);
            }


            // Inertia ke saath success message ke sath redirect
            return back()
                ->with('success', 'Blog post created successfully!');

        } catch (\Exception $e) {

            // dd($e);
            // Inertia ke saath error message
            return back()->with('error', 'Error creating blog post: ' . $e->getMessage())->withInput();
        }
    }

    public function index(Request $request)
    {
        $query = DB::table('blogs')
            ->join('blog_categories', 'blogs.blog_category_id', '=', 'blog_categories.id')
            ->select(
                'blogs.id',
                'blogs.title',
                'blogs.status',
                'blogs.created_at',
                'blog_categories.category_name'
            )
            ->orderBy('blogs.created_at', 'desc');

        //  Search (title)
        if ($request->filled('search')) {
            $query->where('blogs.title', 'like', '%' . $request->search . '%');
        }

        //  Pagination (Laravel built-in)
        $blogs = $query->paginate(10)->withQueryString();

        //  Categories (filter ke liye)
        $categories = DB::table('blog_categories')
            ->select('id', 'category_name')
            ->orderBy('category_name')
            ->get();
        return Inertia::render('Admin/Blog/index', [
            'blogs' => $blogs,
            'categories' => $categories,
            'filters' => $request->only('search')
        ]);
    }

    public function show($id, Request $request)
    {
        $blog = DB::table('blogs')->where('id', $id)->first();
        $like = DB::table('blog_likes')->where('blog_id', $id)->count();
        $comment = DB::table('blog_comments')->where('blog_id', $id)->count();
        $views = DB::table('blog_views')->where('blog_id', $id)->count();

        if (!$blog)
            abort(404, 'Blog not found');

        $category = DB::table('blog_categories')
            ->where('id', $blog->blog_category_id)
            ->first();

        $related = DB::table('blogs')
            ->where('blog_category_id', $blog->blog_category_id)
            ->where('id', '!=', $blog->id)
            ->limit(2)
            ->get();

        return Inertia::render('Admin/Blog/BlogShow', [
            'blog' => $blog,
            'category' => $category,
            'related' => $related,
            'likes' => $like,
            'comments' => $comment,
            'views' => $views 
        ]);
    }

    public function edit($id)
    {
        // Query Builder का उपयोग करके blog और related data fetch करें
        $blog = DB::table('blogs')
            ->leftJoin('blog_categories', 'blogs.blog_category_id', '=', 'blog_categories.id')
            ->leftJoin('users', 'blogs.user_id', '=', 'users.id')
            ->where('blogs.id', $id)
            ->select(
                'blogs.*',
                'blog_categories.category_name',
                'users.name as user_name',
                'users.email as user_email'
            )
            ->first();

        if (!$blog) {
            abort(404, 'Blog post not found');
        }

        // Convert tags from JSON to array
        $blog->tags = $blog->tags ? json_decode($blog->tags, true) : [];

        // Convert keys from string to array
        $keyPoints = [];
        if ($blog->keys) {
            $keyPoints = explode('||', $blog->keys);
            $keyPoints = array_filter($keyPoints, function ($point) {
                return trim($point) !== '';
            });
        }

        // Get blog images using Query Builder
        $images = DB::table('blog_images')
            ->where('blog_id', $id)
            ->get();

        // Get categories using Query Builder
        $categories = DB::table('blog_categories')
            ->select('id', 'category_name')
            ->get();

        // Get users using Query Builder
        $users = DB::table('users')
            ->select('id', 'name', 'email')
            ->get();

        return Inertia::render('Admin/Blog/Edit', [
            'blog' => $blog,
            'images' => $images,
            'keyPoints' => $keyPoints,
            'categories' => $categories,
            'users' => $users
        ]);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        // Validate the request
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'summary' => 'required|string|max:500',
            'content' => 'required|string',
            'blog_category_id' => 'required|exists:blog_categories,id',
            'user_id' => 'required|integer|exists:users,id',
            'tags' => 'nullable',
            'keys' => 'nullable|string',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'content_images_mapping' => 'nullable|string',
            'author' => 'nullable|string|max:255',
            'authorBio' => 'nullable|string|max:1000',
            'readTime' => 'nullable|string|max:50',
            'status' => 'required|string|in:draft,published',
            'featured' => 'nullable|boolean',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|string|max:500',
            'publish_date' => 'nullable|date',
        ], [
            'title.required' => 'Blog title is required',
            'excerpt.required' => 'Excerpt is required',
            'summary.required' => 'Summary is required',
            'content.required' => 'Content is required',
            'blog_category_id.required' => 'Category is required',
            'blog_category_id.exists' => 'Selected category does not exist',
            'slug.required' => 'Slug is required',
            'readTime.required' => 'Read time is required',
            'status.required' => 'Status is required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        try {
            DB::beginTransaction();

            // Handle banner image upload (only if new image provided)
            $bannerImagePath = $blog->banner_image;
            if ($request->hasFile('banner_image')) {
                // Delete old banner image if exists
                if ($blog->banner_image && Storage::disk('public')->exists($blog->banner_image)) {
                    Storage::disk('public')->delete($blog->banner_image);
                }

                $bannerImage = $request->file('banner_image');
                $bannerImagePath = $bannerImage->store('blog/banners', 'public');
            }

            // Prepare tags
            $tags = $request->input('tags', []);
            if (is_string($tags)) {
                $tags = json_decode($tags, true) ?: [];
            }
            $tagsJson = json_encode($tags, JSON_UNESCAPED_UNICODE);

            // Prepare keys
            $keys = $request->input('keys', '');
            if (is_string($keys)) {
                $keysArray = explode('||', $keys);
                $keysArray = array_filter(array_map('trim', $keysArray));
                $keys = implode('||', $keysArray);
            }

            // Handle content images
            $processedContent = $request->input('content');
            $mapping = json_decode($request->input('content_images_mapping'), true);

            if (is_array($mapping)) {
                $contentImages = $request->allFiles()['content_images'] ?? [];

                foreach ($mapping as $index => $imageData) {
                    if (!isset($contentImages[$index])) {
                        continue;
                    }

                    $imageFile = $contentImages[$index];

                    if (!$imageFile->isValid()) {
                        continue;
                    }

                    // Store image
                    $imagePath = $imageFile->store('blog/content-images', 'public');

                    // Create BlogImage record using DB facade
                    DB::table('blog_images')->insert([
                        'image_path' => $imagePath,
                        'blog_id' => $blog->id,
                        'alt_text' => $imageData['alt'] ?? '',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    // Replace placeholder in content
                    $placeholder = $imageData['placeholder'] ?? '';
                    if ($placeholder) {
                        $processedContent = str_replace($placeholder, Storage::url($imagePath), $processedContent);
                    }
                }
            }

            // Update blog post using DB facade
            DB::table('blogs')
                ->where('id', $blog->id)
                ->update([
                    'title' => $request->input('title'),
                    'slug' => $request->input('slug'),
                    'excerpt' => $request->input('excerpt'),
                    'author_name' => $request->input('author') ?? "No",
                    'author_bio' => $request->input('authorBio', ''),
                    'summary' => $request->input('summary'),
                    'content' => $processedContent,
                    'tags' => $tagsJson,
                    'keys' => $keys,
                    'banner_image' => $bannerImagePath,
                    'user_id' => $request->input('user_id'),
                    'blog_category_id' => $request->input('blog_category_id'),
                    'read_time' => $request->input('readTime') ?? "5 min",
                    'status' => $request->input('status'),
                    'featured' => $request->boolean('featured', false),
                    'seo_title' => $request->input('seo_title', $request->input('title')),
                    'seo_description' => $request->input('seo_description', $request->input('excerpt')),
                    'seo_keywords' => $request->input('seo_keywords', ''),
                    'publish_date' => $request->input('publish_date', now()),
                    'updated_at' => now(),
                ]);

            DB::commit();

            return redirect()->route('admin.blogs.index')
                ->with('success', 'Blog post updated successfully!');

        } catch (\Exception $e) {
            DB::rollBack();

            // Log error for debugging
            dd('Blog update error: ' . $e->getMessage(), [
                'blog_id' => $id,
                'request_data' => $request->except(['banner_image', 'content_images']),
            ]);

            return back()->with('error', 'Error updating blog post: ' . $e->getMessage())->withInput();
        }
    }

    public function destroy($id)
    {
        try {
            $blog = Blog::findOrFail($id);

            DB::beginTransaction();

            if ($blog->banner_image && Storage::disk('public')->exists($blog->banner_image)) {
                Storage::disk('public')->delete($blog->banner_image);
            }

            $contentImages = DB::table('blog_images')->where('blog_id', $id)->get();
            foreach ($contentImages as $image) {
                if (Storage::disk('public')->exists($image->image_path)) {
                    Storage::disk('public')->delete($image->image_path);
                }
            }

            DB::table('blog_images')->where('blog_id', $id)->delete();

            DB::table('blogs')->where('id', $id)->delete();

            DB::commit();

            return redirect()->route('admin.blogs.index')
                ->with('success', 'Blog post deleted successfully!');

        } catch (\Exception $e) {
            DB::rollBack();

            dd($e->getMessage());
            return redirect()->route('admin.blogs.index')
                ->with('error', 'Error deleting blog post: ' . $e->getMessage());
        }
    }

    public function blogListing(Request $request)
    {
        // Get query parameters with defaults
        $search = $request->input('search', '');
        $category = $request->input('category', 'all');
        $page = (int) $request->input('page', 1);
        $perPage = 9;

        // Start building query
        $query = DB::table('blogs')
            ->select(
                'blogs.id',
                'blogs.title',
                'blogs.slug',
                'blogs.excerpt',
                'blogs.summary',
                'blogs.author_name',
                'blogs.publish_date',
                'blogs.created_at',
                'blogs.read_time',
                'blogs.tags',
                'blogs.banner_image',
                'blog_categories.category_name',
                'users.name as user_name',
                DB::raw('(SELECT COUNT(*) FROM blog_likes WHERE blog_likes.blog_id = blogs.id) as likes'),
                // Subquery for comments
                DB::raw('(SELECT COUNT(*) FROM blog_comments WHERE blog_comments.blog_id = blogs.id) as comments'),
                DB::raw('(SELECT COUNT(*) FROM blog_views WHERE blog_views.blog_id = blogs.id) as views')

            )
            ->leftJoin('blog_categories', 'blogs.blog_category_id', '=', 'blog_categories.id')
            ->leftJoin('users', 'blogs.user_id', '=', 'users.id')
            // ->where('blogs.status', 'published')
            ->orderBy('blogs.publish_date', 'desc')
            ->orderBy('blogs.created_at', 'desc');

        // Apply search filter
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('blogs.title', 'like', '%' . $search . '%')
                    ->orWhere('blogs.excerpt', 'like', '%' . $search . '%')
                    ->orWhere('blogs.summary', 'like', '%' . $search . '%')
                    ->orWhere('blog_categories.category_name', 'like', '%' . $search . '%');
            });
        }

        // Apply category filter
        if ($category !== 'all') {
            // First try to find category by ID
            $categoryObj = DB::table('blog_categories')
                ->where('id', $category)
                ->orWhere('category_name', $category)
                ->first();

            if ($categoryObj) {
                $query->where('blog_categories.id', $categoryObj->id);
            }
        }

        // Get total count
        $total = (clone $query)->count();

        // Apply pagination
        $offset = ($page - 1) * $perPage;
        $blogs = $query->offset($offset)->limit($perPage)->get();

        // Get all categories
        $categories = DB::table('blog_categories')
            ->select('id', 'category_name as name')
            ->orderBy('category_name')
            ->get();

        // Format blogs
        $formattedBlogs = $blogs->map(function ($blog) {
            // Parse tags safely
            $tags = [];
            if ($blog->tags && $blog->tags !== 'null') {
                try {
                    $decoded = json_decode($blog->tags, true);
                    if (is_array($decoded)) {
                        $tags = $decoded;
                    }
                } catch (\Exception $e) {
                    $tags = [];
                }
            }

            // Get image
            $imageUrl = $blog->banner_image && file_exists(storage_path('app/public/' . $blog->banner_image))
                ? asset('storage/' . $blog->banner_image)
                : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

            // Format date
            $date = $blog->publish_date
                ? date('M d, Y', strtotime($blog->publish_date))
                : ($blog->created_at ? date('M d, Y', strtotime($blog->created_at)) : 'N/A');

            // dd([
            //     'id' => $blog->id,
            //     'title' => $blog->title ?? 'Untitled',
            //     'excerpt' => $blog->excerpt ?? '',
            //     'author' => $blog->author_name ?? $blog->user_name ?? 'Admin',
            //     'date' => $date,
            //     'readTime' => $blog->read_time ?? '5 min',
            //     'category' => $blog->category_name ?? 'Uncategorized',
            //     'tags' => $tags,
            //     'likes' => $blog->likes,
            //     'comments' => $blog->comments,
            //     'image' => $imageUrl,
            //     'slug' => $blog->slug ?? 'untitled',
            //     'summary' => $blog->summary ?? '',
            // ]);
            return [
                'id' => $blog->id,
                'title' => $blog->title ?? 'Untitled',
                'excerpt' => $blog->excerpt ?? '',
                'author' => $blog->author_name ?? $blog->user_name ?? 'Admin',
                'date' => $date,
                'readTime' => $blog->read_time ?? '5 min',
                'category' => $blog->category_name ?? 'Uncategorized',
                'tags' => $tags,
                // 'likes' => rand(50, 250), // Default values
                // 'comments' => rand(0, 15),
                'likes' => $blog->likes,
                'views'=>$blog->views??0,
                'comments' => $blog->comments,
                'image' => $imageUrl,
                'slug' => $blog->slug ?? 'untitled',
                'summary' => $blog->summary ?? '',
            ];
        });

        // Calculate last page
        $lastPage = max(1, ceil($total / $perPage));
        // dd($formattedBlogs);
        // Return with ALL required props
        return Inertia::render('blog', [
            'blogs' => $formattedBlogs,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category' => $category,
            ],
            'pagination' => [
                'current_page' => $page,
                'last_page' => $lastPage,
                'total' => $total,
                'per_page' => $perPage,
                'has_more_pages' => $page < $lastPage,
            ]
        ]);
    }

    /*
     * Load more blogs via AJAX/API endpoint
     */
    public function loadMoreBlogs(Request $request)
    {
        try {
            $search = $request->input('search', '');
            $category = $request->input('category', 'all');
            $page = (int) $request->input('page', 2); // Default to page 2
            $perPage = 9;

            $query = DB::table('blogs')
                ->select(
                    'blogs.id',
                    'blogs.title',
                    'blogs.slug',
                    'blogs.excerpt',
                    'blogs.summary',
                    'blogs.author_name',
                    'blogs.publish_date',
                    'blogs.created_at',
                    'blogs.read_time',
                    'blogs.tags',
                    'blogs.banner_image',
                    'blog_categories.category_name',
                    'users.name as user_name',
                    // Subquery for likes
                    DB::raw('(SELECT COUNT(*) FROM blog_likes WHERE blog_likes.blog_id = blogs.id) as likes'),
                    // Subquery for comments
                    DB::raw('(SELECT COUNT(*) FROM blog_comments WHERE blog_comments.blog_id = blogs.id) as comments'),
                    DB::raw('(SELECT COUNT(*) FROM blog_views WHERE blog_views.blog_id = blogs.id) as views')
                )
                ->leftJoin('blog_categories', 'blogs.blog_category_id', '=', 'blog_categories.id')
                ->leftJoin('users', 'blogs.user_id', '=', 'users.id')
                ->orderBy('blogs.publish_date', 'desc')
                ->orderBy('blogs.created_at', 'desc');

            // Apply search filter
            if (!empty($search)) {
                $query->where(function ($q) use ($search) {
                    $q->where('blogs.title', 'like', '%' . $search . '%')
                        ->orWhere('blogs.excerpt', 'like', '%' . $search . '%')
                        ->orWhere('blogs.summary', 'like', '%' . $search . '%')
                        ->orWhere('blogs.tags', 'like', '%' . $search . '%')
                        ->orWhere('blog_categories.category_name', 'like', '%' . $search . '%');
                });
            }

            // Apply category filter
            if ($category !== 'all') {
                $categoryObj = DB::table('blog_categories')
                    ->where('id', $category)
                    ->orWhere('category_name', $category)
                    ->first();

                if ($categoryObj) {
                    $query->where('blog_categories.id', $categoryObj->id);
                }
            }

            // Calculate offset
            $offset = ($page - 1) * $perPage;

            // Get the blogs
            $blogs = $query->offset($offset)->limit($perPage)->get();

            // Format blogs
            $formattedBlogs = $blogs->map(function ($blog) {
                // Parse tags safely
                $tags = [];
                if ($blog->tags && $blog->tags !== 'null') {
                    try {
                        $decoded = json_decode($blog->tags, true);
                        if (is_array($decoded)) {
                            $tags = $decoded;
                        }
                    } catch (\Exception $e) {
                        $tags = [];
                    }
                }

                // Get image URL
                $imageUrl = $blog->banner_image && file_exists(storage_path('app/public/' . $blog->banner_image))
                    ? asset('storage/' . $blog->banner_image)
                    : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80';

                // Format date
                $date = $blog->publish_date
                    ? date('M d, Y', strtotime($blog->publish_date))
                    : ($blog->created_at ? date('M d, Y', strtotime($blog->created_at)) : 'N/A');

                return [
                    'id' => $blog->id,
                    'title' => $blog->title ?? 'Untitled',
                    'excerpt' => $blog->excerpt ?? '',
                    'author' => $blog->author_name ?? $blog->user_name ?? 'Admin',
                    'date' => $date,
                    'readTime' => $blog->read_time ?? '5 min',
                    'category' => $blog->category_name ?? 'Uncategorized',
                    'tags' => $tags,
                    'likes' => $blog->likes ?? 0,
                    'views'=>$blog->views??0,
                    'comments' => $blog->comments ?? 0,
                    'image' => $imageUrl,
                    'slug' => $blog->slug ?? 'untitled',
                    'summary' => $blog->summary ?? '',
                ];
            });

            // Check if there are more pages
            $totalResults = $query->count();
            $hasMore = ($page * $perPage) < $totalResults;

            return response()->json([
                'blogs' => $formattedBlogs,
                'has_more' => $hasMore,
                'current_page' => $page,
                'total' => $totalResults
            ]);

        } catch (\Exception $e) {
            \Log::error('Error in loadMoreBlogs: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to load more articles',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function showOne($id, request $request)
    {
        // dd($request);
        // dd([
        //     'ip' => $request->ip(),
        //     'user_agent' => $request->userAgent(),
        //     'url' => $request->fullUrl(),
        //     'method' => $request->method(),
        //     'clientip' => request()->getClientIp()
        // ]);
        $blog = DB::table('blogs')->where('id', $id)->first();
        $like = DB::table('blog_likes')->where('blog_id', $id)->count();
        $comment = DB::table('blog_comments')->where('blog_id', $id)->count();
        $views = DB::table('blog_views')->where('blog_id', $id)->count();

        if (!$blog)
            abort(404, 'Blog not found');

        $category = DB::table('blog_categories')
            ->where('id', $blog->blog_category_id)
            ->first();

        $related = DB::table('blogs')
            ->where('blog_category_id', $blog->blog_category_id)
            ->where('id', '!=', $blog->id)
            ->limit(2)
            ->get();
        
            BlogView::firstOrCreate([
                'blog_id'   => $blog->id,
                'ip_address'=> $request->ip().'_'.$request->userAgent()
            ], [
                'ip_address'=> $request->ip().'_'.$request->userAgent(),
                'user_id'=>Auth::id()
            ]);
        //     dd([
        //     'blog' => $blog,
        //     'category' => $category,
        //     'related' => $related,
        //     'likes' => $like,
        //     'comments' => $comment,
        //     'views' => $views 
        // ]);

        return Inertia::render('BlogShowsingle', [
            'blog' => $blog,
            'category' => $category,
            'related' => $related,
            'likes' => $like,
            'comments' => $comment,
            'views' => $views 
        ]);
    }

}