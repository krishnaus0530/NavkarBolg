<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = DB::table('properties');

        // Search in title or location fields
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Order by latest
        $query->orderBy('created_at', 'desc');

        // Get properties
        $properties = $query->get();

        return Inertia::render('PropertyCard', [
            'properties' => $properties,
            'filters' => $request->only(['search'])
        ]);
    }
    public function create()
    {
        return Inertia::render('Admin/property/PropertyForm');
    }

    public function store(Request $request)
    {
        // dd( $request);
        // dd(
        //     ['upload_max_filesize' => ini_get('upload_max_filesize'),
        // 'post_max_size' => ini_get('post_max_size'),
        // 'max_file_uploads' => ini_get('max_file_uploads'),
        // 'memory_limit' => ini_get('memory_limit'),
        // 'max_execution_time' => ini_get('max_execution_time'),
        // 'max_input_time' => ini_get('max_input_time'),
        // 'upload_tmp_dir' => ini_get('upload_tmp_dir'),
        // 'file_uploads' => ini_get('file_uploads')]
        // );
        // Validate the request
        $validated = $request->validate([
            'propertyTitle' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            // 'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:1843',// 1.8MB safe limit
        ], [
            // 'image.max' => 'The image must not exceed 5MB.',
            'image.max' => 'The image must not exceed 1.8MB (Current PHP limit is 2MB).',
            'image.mimes' => 'Only JPG, PNG, and WebP images are allowed.',
            'image.required' => 'Please upload a property image.',
            'propertyTitle.required' => 'Property title is required.',
            'location.required' => 'Location is required.',
            'description.required' => 'Description is required.',
        ]);

        try {
            // Handle single image upload with date in filename
            $image = $request->file('image');

            // Generate unique filename with timestamp and date
            $originalName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $image->getClientOriginalExtension();
            $timestamp = time();
            $date = date('Y-m-d');

            // Create safe filename (remove special characters)
            $safeName = preg_replace('/[^A-Za-z0-9\-]/', '_', $originalName);
            $imageName = "{$timestamp}_{$date}_{$safeName}.{$extension}";

            // Store the image
            $imagePath = $image->storeAs('property-images', $imageName, 'public');

            // Save property to database
            $property = Property::create([
                'title' => $validated['propertyTitle'],
                'location' => $validated['location'],
                'description' => $validated['description'],
                'image_url' => $imagePath,
                // 'image' => $imageName, // Save original filename if needed
            ]);

            // dd( $property );
            // Redirect to properties list with success message
            return redirect()->route('properties.admin.index')
                ->with('success', 'Property listed successfully! The image has been uploaded.');

        } catch (\Exception $e) {

            dd( $e);
            // Handle any errors
            return redirect()->back()
                ->withInput()
                ->with('error', 'An error occurred while saving the property. Please try again.');
        }
    }
    public function adminIndex(Request $request)
    {
        $query = DB::table('properties');

        // Search in title or location fields
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        // Order by latest
        $query->orderBy('created_at', 'desc');

        // Get properties
        $properties = $query->get();

        return Inertia::render('Admin/property/PropertyCard', [
            'properties' => $properties,
            'filters' => $request->only(['search'])
        ]);
    }
    public function show($id)
    {
        $property = Property::findOrFail($id);

        return Inertia::render('Admin/property/PropertyForm', [
            'isShow' => true,
            'property' => $property,
        ]);
    }
    public function edit($id)
    {
        $property = Property::findOrFail($id);

        return Inertia::render('Admin/property/PropertyForm', [
            'isEdit' => true,
            'property' => $property,
        ]);
    }
    public function update(Request $request, $id)
    {
        $property = Property::findOrFail($id);

        // Validate the request
        $validated = $request->validate([
            'propertyTitle' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:5120',
        ], [
            'image.max' => 'The image must not exceed 5MB.',
            'image.mimes' => 'Only JPG, PNG, and WebP images are allowed.',
            'propertyTitle.required' => 'Property title is required.',
            'location.required' => 'Location is required.',
            'description.required' => 'Description is required.',
        ]);

        try {
            $updateData = [
                'title' => $validated['propertyTitle'],
                'location' => $validated['location'],
                'description' => $validated['description'],
            ];

            // Handle image update if new image is uploaded
            if ($request->hasFile('image')) {
                $image = $request->file('image');

                // Generate unique filename
                $originalName = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
                $extension = $image->getClientOriginalExtension();
                $timestamp = time();
                $date = date('Y-m-d');

                $safeName = preg_replace('/[^A-Za-z0-9\-]/', '_', $originalName);
                $imageName = "{$timestamp}_{$date}_{$safeName}.{$extension}";

                // Store the new image
                $imagePath = $image->storeAs('property-images', $imageName, 'public');

                $updateData['image_url'] = $imagePath;
            }

            // Update property
            $property->update($updateData);

            return redirect()->route('properties.admin.index')
                ->with('success', 'Property updated successfully!');

        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'An error occurred while updating the property. Please try again.');
        }
    }
    public function destroy($id)
    {
        try {
            $property = Property::findOrFail($id);

            // Delete image from storage if exists
            if ($property->image_url && Storage::disk('public')->exists($property->image_url)) {
                Storage::disk('public')->delete($property->image_url);
            }

            // Delete property from database
            $property->delete();

            return redirect()->route('properties.admin.index')
                ->with('success', 'Property deleted successfully!');

        } catch (\Exception $e) {
            \Log::error('Property delete error: ' . $e->getMessage());

            return redirect()->back()
                ->with('error', 'Failed to delete property. Please try again.');
        }
    }
}

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\DB;
// use Inertia\Inertia;

// class PropertyController extends Controller
// {
//     //
//     public function index(Request $request)
//     {
//         $properties = DB::table('properties') ->get();
//         // dd($properties);
//         return Inertia::render('PropertyCard', [
//             'properties' => $properties
//         ]);
//     }

// }
