import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

export default function PropertyCard({ properties: initialProperties, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [filteredProperties, setFilteredProperties] = useState(initialProperties || []);
    const [isLoading, setIsLoading] = useState(false);

    // Update when props change
    useEffect(() => {
        setFilteredProperties(initialProperties || []);
        setSearchQuery(filters?.search || '');
    }, [initialProperties, filters]);

    // Handle search with debounce
    const handleSearch = (query) => {
        setSearchQuery(query);

        const timeoutId = setTimeout(() => {
            router.get('/property/admin/index', {
                search: query,
            }, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery('');

        router.get('/property/admin/index', {}, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    };

    // Handle add property
    const handleAddProperty = () => {
        router.visit('/properties/create');
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Header with Search and Add Button */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                        {/* Middle Section - Search Bar */}
                        <div className="flex-grow max-w-2xl mx-auto lg:mx-0">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-search text-gray-400"></i>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search properties by title or location..."
                                    className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                    disabled={isLoading}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={clearFilters}
                                        className="absolute inset-y-0 right-10 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                        disabled={isLoading}
                                        title="Clear search"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                )}
                                {isLoading && (
                                    <div className="absolute inset-y-0 right-10 flex items-center pr-3">
                                        <i className="fas fa-spinner fa-spin text-primary"></i>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
                                Search by property title or location
                            </p>
                        </div>

                        {/* Right Section - Add Property Button */}
                        <div className="lg:w-auto">
                            <button
                                onClick={handleAddProperty}
                                className="w-full lg:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-plus-circle"></i>
                                <span>Add Property</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Title */}
                    <div className="lg:hidden mt-6 mb-4">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Properties
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage your property listings
                        </p>
                    </div>
                </div>

                {/* Filters and Results Info */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {searchQuery && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                <i className="fas fa-times mr-2"></i>
                                Clear Search
                            </button>
                        )}
                        {isLoading && (
                            <div className="flex items-center text-primary">
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                <span className="text-sm">Searching...</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Additional Filters (optional) */}
                        <div className="hidden sm:flex items-center gap-2">
                            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <i className="fas fa-filter mr-2"></i>
                                Filter
                            </button>
                            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <i className="fas fa-sort mr-2"></i>
                                Sort
                            </button>
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                                {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                            </span>
                        </div>
                    </div>
                </div>

                {/* Search Results Summary */}
                {searchQuery && !isLoading && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                Showing results for: <span className="font-semibold">"{searchQuery}"</span>
                            </p>
                            <button
                                onClick={clearFilters}
                                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                            >
                                <i className="fas fa-times"></i>
                                Clear
                            </button>
                        </div>
                    </div>
                )}

                {/* Mobile Additional Filters */}
                <div className="sm:hidden mb-6">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <button className="flex-shrink-0 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <i className="fas fa-filter mr-2"></i>
                            Filter
                        </button>
                        <button className="flex-shrink-0 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <i className="fas fa-sort mr-2"></i>
                            Sort
                        </button>
                        <button className="flex-shrink-0 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            <i className="fas fa-star mr-2"></i>
                            Featured
                        </button>
                    </div>
                </div>

                {/* No Results */}
                {!isLoading && filteredProperties.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                            <i className="fas fa-search text-2xl text-gray-400"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                            {searchQuery ? 'No properties found' : 'No properties available'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                            {searchQuery
                                ? `No properties match your search for "${searchQuery}". Try different keywords.`
                                : "Currently no properties are available in our database."}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            {searchQuery ? (
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                                >
                                    <i className="fas fa-redo"></i>
                                    Clear Search
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddProperty}
                                    className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                                >
                                    <i className="fas fa-plus-circle"></i>
                                    Add Your First Property
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Properties Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
                            <PropertyCardItem key={property.id} property={property} />
                        ))}
                    </div>
                )}

                {/* Floating Add Button for Mobile */}
                <div className="lg:hidden fixed bottom-6 right-6 z-50">
                    <button
                        onClick={handleAddProperty}
                        className="w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                        title="Add Property"
                    >
                        <i className="fas fa-plus text-xl"></i>
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}

function PropertyCardItem({ property, featured = false }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        setIsDeleting(true);
        
        router.delete(route('properties.destroy', property.id), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setShowDeleteModal(false);
                setIsDeleting(false);
            },
            onError: () => {
                alert('Failed to delete property. Please try again.');
                setIsDeleting(false);
                setShowDeleteModal(false);
            }
        });
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border 
                       border-gray-200 dark:border-gray-700 
                       flex flex-col h-full min-h-[480px] max-h-[520px] overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
            
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                <i className="fas fa-exclamation-triangle text-red-600 dark:text-red-400"></i>
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                            Delete Property
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                            Are you sure you want to delete "{property.title}"? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {isDeleting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-trash"></i>
                                        Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
                <img
                    src={property.image_url ? `/storage/${property.image_url}` : ''}
                    alt={property.title || 'Property Image'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    // onError={(e) => {
                    //     e.target.src = '../desgin/property.png';
                    // }}
                />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Luxury
                    </span>
                    
                    <div className="flex gap-1">
                        <Link
                            href={route('properties.edit', property.id)}
                            className="w-8 h-8 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center transition-colors shadow-sm"
                            title="Edit Property"
                        >
                            <i className="fas fa-edit text-xs"></i>
                        </Link>
                        
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="w-8 h-8 bg-white/90 hover:bg-red-50 text-red-600 rounded-full flex items-center justify-center transition-colors shadow-sm"
                            title="Delete Property"
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <i className="fas fa-spinner fa-spin text-xs"></i>
                            ) : (
                                <i className="fas fa-trash text-xs"></i>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-grow">
                {/* Location */}
                <div className="mb-2">
                    <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                        <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                        <span className="line-clamp-1">
                            {property.location || 'Location not specified'}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 line-clamp-1">
                    {property.title || 'Property Title'}
                </h3>

                {/* Description */}
                <div className="flex-grow mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {property.description
                            ? property.description.length > 150
                                ? property.description.slice(0, 150) + "..."
                                : property.description
                            : "No description available."}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                    <Link
                        href={route('properties.edit', property.id)}
                        className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                        <i className="fas fa-edit"></i>
                        Edit
                    </Link>
                    <Link
                        href={route('properties.show', property.id)}
                        className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                        <i className="fas fa-eye"></i>
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Separate Property Card Component
// function PropertyCardItem({ property, featured = false }) {
//     return (
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border 
//                        border-gray-200 dark:border-gray-700 
//                        flex flex-col h-full min-h-[480px] max-h-[520px] overflow-hidden hover:shadow-xl transition-shadow duration-300">
//             <div className="h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
//                 <img
//                     src={`/storage/${property.image_url}` ?? '../desgin/property.png'}
//                     alt={property.title ?? 'Property Image'}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 />

//                 {/* Status Badges */}
//                 <div className="absolute top-3 left-3 right-3 flex justify-between">
//                     <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
//                         Luxury
//                     </span>
//                     {featured ? (
//                         <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                             Featured
//                         </span>
//                     ) : (
//                         <div className="flex gap-1">
//                             <Link
//                                 href={route('properties.edit', property.id)}
//                                 className="w-8 h-8 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center transition-colors">
//                                 <i className="fas fa-edit"></i>
//                             </Link>
                           
//                             <button className="w-8 h-8 bg-white/90 hover:bg-red-50 text-red-600 rounded-full flex items-center justify-center transition-colors">
//                                 <i className="fas fa-trash text-xs"></i>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <div className="p-5 flex flex-col flex-grow">
//                 {/* Location */}
//                 <div className="mb-2">
//                     <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
//                         <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
//                         <span className="line-clamp-1">
//                             {property.location ?? 'Location not specified'}
//                         </span>
//                     </div>
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 line-clamp-1">
//                     {property.title ?? 'Property Title'}
//                 </h3>

//                 {/* Description */}
//                 <div className="flex-grow mb-4">
//                     <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
//                         {property.description
//                             ? property.description.length > 150
//                                 ? property.description.slice(0, 150) + "..."
//                                 : property.description
//                             : "No description available."}
//                     </p>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2 mt-auto">
//                     <Link
//                         href={route('properties.edit', property.id)}
//                         className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
//                     >
//                         <i className="fas fa-edit"></i>
//                         Edit
//                     </Link>
//                     <Link
//                         href={route('properties.show', property.id)}
//                         className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm"
//                     >
//                         <i className="fas fa-eye"></i>
//                         View
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// }