<?php

namespace App\Http\Controllers;

use App\Models\PropertyInquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyInquiryController extends Controller
{
    //
    // public function index(){
    //       return Inertia::render('Admin/property/propertyQuery', [
    //         'isShow' => true,
    //     ]);
    // }
    public function index(Request $request)
    {
        $query = PropertyInquiry::query();

        // Search functionality
        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('interested_property', 'like', "%{$search}%");
            });
        }

        // Filter functionality
        if ($request->has('filter') && $request->filter != 'all') {
            switch ($request->filter) {
                case 'interested':
                    $query->where('interested', true);
                    break;
                case 'not-interested':
                    $query->where('interested', false);
                    break;
                case 'new':
                    $query->where('created_at', '>=', now()->subDays(7));
                    break;
            }
        }

        // Order by latest
        $query->orderBy('created_at', 'desc');

        // Pagination
        $inquiries = $query->paginate(5);

        // Calculate stats
        $total = PropertyInquiry::count();
        $interested = PropertyInquiry::where('interested', 1)->count();
        $contacted = PropertyInquiry::whereNotNull('phone')->count();
        $not_intrested = PropertyInquiry::where('interested', 0)->count();

        return Inertia::render('Admin/property/propertyQuery', [
            'isShow' => true,
            'inquiries' => $inquiries,
            'filters' => [
                'search' => $request->input('search', ''),
                'filter' => $request->input('filter', 'all'),
            ],
            'stats' => [
                'total' => $total,
                'interested' => $interested,
                'contacted' => $contacted,
                'not_intrested' => $not_intrested,
            ],
        ]);

    }
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'interested_property' => 'nullable|string|max:255',
            'message' => 'nullable|string',
            'interested' => 'boolean'
        ]);

        $inquiry = PropertyInquiry::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'interested_property' => $request->interested_property,
            'message' => $request->message,
            'interested' => $request->interested ?? false,
        ]);

        // JSON response return करें
        return response()->json([
            'status' => 'success',
            'message' => 'Inquiry submitted successfully!',
            'inquiry' => [
                'id' => $inquiry->id,
                'first_name' => $inquiry->first_name,
                'last_name' => $inquiry->last_name,
                'email' => $inquiry->email,
                'phone' => $inquiry->phone,
                'subject' => $inquiry->subject,
                'interested_property' => $inquiry->interested_property,
                'message' => $inquiry->message,
                'interested' => $inquiry->interested,
                'created_at' => $inquiry->created_at,
            ],
        ]);
    }
    public function destroy($id)
    {
        $inquiry = PropertyInquiry::findOrFail($id);
        $inquiry->delete();

        return redirect()->route('property-inquiries.index')
            ->with('success', 'Inquiry deleted successfully.');
    }
}
