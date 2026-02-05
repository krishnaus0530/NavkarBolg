<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Blog_category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogCategoryController  extends Controller
{
    public function index()
    {
        $categories = Blog_category::orderBy('id', 'desc')->get();

        return Inertia::render('Admin/BlogCategory/Index', [
            'categories' => $categories,
            'flash' => session()->all(), // pass flash messages
        ]);
    }

    public function store(Request $request)
    {
      
        $request->validate([
            'category_name' => 'required|string|max:255|unique:blog_categories,category_name',
        ]);
        Blog_category::create([
            'category_name' => $request->category_name,
        ]);

        return redirect()->route('categories.index')->with('success', 'Category added successfully.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category_name' => 'required|string|max:255|unique:blog_categories,category_name,' . $id,
        ]);

        $category = Blog_category::findOrFail($id);
        $category->update([
            'category_name' => $request->category_name,
        ]);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy($id)
    {
        $category = Blog_category::findOrFail($id);
        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}
