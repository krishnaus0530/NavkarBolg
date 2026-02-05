// import { useState, useEffect } from 'react';
// import { Link, router } from '@inertiajs/react';
// import AppLayout from './Layouts/AppLayout';

// export default function PropertyCard({ properties: initialProperties, filters }) {
//     const [searchQuery, setSearchQuery] = useState(filters?.search || '');
//     const [filteredProperties, setFilteredProperties] = useState(initialProperties || []);
//     const [isLoading, setIsLoading] = useState(false);

//     // Update when props change
//     useEffect(() => {
//         setFilteredProperties(initialProperties || []);
//         setSearchQuery(filters?.search || '');
//     }, [initialProperties, filters]);

//     // Handle search with debounce
//     const handleSearch = (query) => {
//         setSearchQuery(query);

//         const timeoutId = setTimeout(() => {
//             // Use direct URL path instead of route() helper
//             router.get('/properties', {
//                 search: query,
//             }, {
//                 preserveScroll: true,
//                 preserveState: true,
//                 replace: true,
//                 onStart: () => setIsLoading(true),
//                 onFinish: () => setIsLoading(false),
//             });
//         }, 500);

//         return () => clearTimeout(timeoutId);
//     };

//     // Clear all filters
//     const clearFilters = () => {
//         setSearchQuery('');

//         router.get('/properties', {}, {
//             preserveScroll: true,
//             preserveState: true,
//             replace: true,
//             onStart: () => setIsLoading(true),
//             onFinish: () => setIsLoading(false),
//         });
//     };

//     return (
//         <AppLayout>
//             <div className="max-w-7xl mx-auto px-4 py-6">
//                 {/* Header */}
//                 <div className="mb-8">

//                     {/* Search Bar */}
//                     <div className="max-w-2xl">
//                         <div className="relative">
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <i className="fas fa-search text-gray-400"></i>
//                             </div>
//                             <input
//                                 type="text"
//                                 value={searchQuery}
//                                 onChange={(e) => handleSearch(e.target.value)}
//                                 placeholder="Search properties by title or location..."
//                                 className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//                                 disabled={isLoading}
//                             />
//                             {searchQuery && (
//                                 <button
//                                     onClick={clearFilters}
//                                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                                     disabled={isLoading}
//                                 >
//                                     <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
//                                 </button>
//                             )}
//                             {isLoading && (
//                                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
//                                     <i className="fas fa-spinner fa-spin text-primary"></i>
//                                 </div>
//                             )}
//                         </div>
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
//                             Search by property title or location
//                         </p>
//                     </div>
//                 </div>

//                 {/* Filters and Results Info */}
//                 <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                     <div className="flex items-center gap-2">
//                         {searchQuery && (
//                             <button
//                                 onClick={clearFilters}
//                                 className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
//                             >
//                                 <i className="fas fa-times mr-2"></i>
//                                 Clear Search
//                             </button>
//                         )}
//                         {isLoading && (
//                             <div className="flex items-center text-primary">
//                                 <i className="fas fa-spinner fa-spin mr-2"></i>
//                                 <span className="text-sm">Searching...</span>
//                             </div>
//                         )}
//                     </div>

//                     <div className="text-sm text-gray-600 dark:text-gray-300">
//                         <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
//                             {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
//                         </span>
//                     </div>
//                 </div>

//                 {/* Search Results Summary */}
//                 {searchQuery && !isLoading && (
//                     <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
//                         <p className="text-sm text-blue-700 dark:text-blue-300">
//                             Showing results for: <span className="font-semibold">"{searchQuery}"</span>
//                         </p>
//                     </div>
//                 )}

//                 {/* No Results */}
//                 {!isLoading && filteredProperties.length === 0 ? (
//                     <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
//                         <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
//                             <i className="fas fa-search text-2xl text-gray-400"></i>
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
//                             {searchQuery ? 'No properties found' : 'No properties available'}
//                         </h3>
//                         <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
//                             {searchQuery
//                                 ? `No properties match your search for "${searchQuery}". Try different keywords.`
//                                 : "Currently no properties are available in our database."}
//                         </p>
//                         {searchQuery && (
//                             <button
//                                 onClick={clearFilters}
//                                 className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors inline-flex items-center"
//                             >
//                                 <i className="fas fa-redo mr-2"></i>
//                                 Clear Search
//                             </button>
//                         )}
//                     </div>
//                 ) : (
//                     /* Properties Grid */
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {filteredProperties.map((property) => (
//                             <PropertyCardItem key={property.id} property={property} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </AppLayout>
//     );
// }

// // Separate Property Card Component
// function PropertyCardItem({ property, featured = false }) {
//     return (
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border 
//                        border-gray-200 dark:border-gray-700 
//                        flex flex-col h-[520px] overflow-hidden hover:shadow-xl transition-shadow duration-300">
//             <div className="h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
//                 <img
//                     src={`/storage/${property.image_url}` ?? ''}
//                     alt={property.title ?? 'Property Image'}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 />

//                 {/* Status Badges */}
//                 <div className="absolute top-3 left-3 right-3 flex justify-between">
//                     <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
//                         Luxury
//                     </span>
//                     {featured ?
//                         <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                             Featured
//                         </span> : ""}
//                 </div>
//             </div>

//             <div className="p-5 flex flex-col flex-grow">
//                 {/* Location */}
//                 <div className="h-5 mb-2 text-sm text-gray-600 dark:text-gray-300 flex items-center">
//                     <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
//                     <span className="line-clamp-1">
//                         {property.location ?? 'Location not specified'}
//                     </span>
//                 </div>

//                 {/* Title */}
//                 <h3 className="h-7 mb-3 text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
//                     {property.title ?? 'Property Title'}
//                 </h3>

//                 {/* Description */}
//                 <div className="flex-grow mb-4">
//                     <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4">
//                         {property.description
//                             ? property.description.length > 200
//                                 ? property.description.slice(0, 200) + "..."
//                                 : property.description
//                             : "No description available."}
//                     </p>
//                 </div>

//                 {/* Button - Use direct URL */}
//                 <Link
//                     href={`/properties/${property.id}/schedule`}
//                     className="mt-auto w-full bg-primary hover:bg-primary-dark 
//                                text-white font-medium py-3 rounded-lg 
//                                flex items-center justify-center gap-2 transition-colors"
//                 >
//                     <i className="fas fa-calendar-alt"></i>
//                     Schedule Viewing
//                 </Link>
//             </div>
//         </div>
//     );
// }

import { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from './Layouts/AppLayout';
import ContactForm from './ContactForm';

export default function PropertyCard({ properties: initialProperties, filters }) {
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [filteredProperties, setFilteredProperties] = useState(initialProperties || []);
    const [isLoading, setIsLoading] = useState(false);
    const [showSimpleModal, setShowSimpleModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);

    // Update when props change
    useEffect(() => {
        setFilteredProperties(initialProperties || []);
        setSearchQuery(filters?.search || '');
    }, [initialProperties, filters]);

    // Handle search with debounce
    const handleSearch = (query) => {
        setSearchQuery(query);

        const timeoutId = setTimeout(() => {
            // Use direct URL path instead of route() helper
            router.get('/properties', {
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

        router.get('/properties', {}, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
            onStart: () => setIsLoading(true),
            onFinish: () => setIsLoading(false),
        });
    };

    // Simple modal open function
    const openSimpleModal = (property) => {
        setSelectedProperty(property);
        setShowSimpleModal(true);
    };

    // Close simple modal
    const closeSimpleModal = () => {
        setShowSimpleModal(false);
        setSelectedProperty(null);
    };

    return (
        <AppLayout>
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Header */}
                <div className="mb-8">
                    {/* Search Bar */}
                    <div className="max-w-2xl">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fas fa-search text-gray-400"></i>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search properties by title or location..."
                                className="w-full pl-10 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                disabled={isLoading}
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearFilters}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    disabled={isLoading}
                                >
                                    <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
                                </button>
                            )}
                            {isLoading && (
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <i className="fas fa-spinner fa-spin text-primary"></i>
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
                            Search by property title or location
                        </p>
                    </div>
                </div>

                {/* Filters and Results Info */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2">
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

                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                        </span>
                    </div>
                </div>

                {/* Search Results Summary */}
                {searchQuery && !isLoading && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            Showing results for: <span className="font-semibold">"{searchQuery}"</span>
                        </p>
                    </div>
                )}

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
                        {searchQuery && (
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors inline-flex items-center"
                            >
                                <i className="fas fa-redo mr-2"></i>
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    /* Properties Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
                            <PropertyCardItem
                                key={property.id}
                                property={property}
                                onScheduleClick={openSimpleModal}
                            />
                        ))}
                    </div>
                )}

                {/* Simple Modal */}
                {showSimpleModal && selectedProperty && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50"
                            onClick={closeSimpleModal}
                        ></div>

                        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-7xl  p-6 h-[90vh] overflow-y-auto">
                            <div className="">
                                {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                                    <i className="fas fa-calendar-alt text-blue-600 dark:text-blue-300 text-xl"></i>
                                </div>
                                
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    Schedule Viewing
                                </h3>
                                
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    You clicked on: <span className="font-medium">{selectedProperty.title}</span>
                                </p> */}
                                <div className="">
                                    <div className="flex justify-center space-x-3 absolute right-10">
                                        <button
                                            onClick={closeSimpleModal}
                                            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                        >
                                            Close
                                        </button>
                                    </div>
                                    <ContactForm interested_property={true} interested_property_value={selectedProperty?.title}></ContactForm>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

// Separate Property Card Component
// function PropertyCardItem({ property, featured = false, onScheduleClick }) {
//     return (
//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border 
//                        border-gray-200 dark:border-gray-700 
//                        flex flex-col h-[520px] overflow-hidden hover:shadow-xl transition-shadow duration-300">
//             <div className="h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
//                 <img
//                     src={`/storage/${property.image_url}` ?? ''}
//                     alt={property.title ?? 'Property Image'}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
//                 />

//                 {/* Status Badges */}
//                 <div className="absolute top-3 left-3 right-3 flex justify-between">
//                     <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
//                         Luxury
//                     </span>
//                     {featured ?
//                         <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
//                             Featured
//                         </span> : ""}
//                 </div>
//             </div>

//             <div className="p-5 flex flex-col flex-grow">
//                 {/* Location */}
//                 <div className="h-5 mb-2 text-sm text-gray-600 dark:text-gray-300 flex items-center">
//                     <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
//                     <span className="line-clamp-1">
//                         {property.location ?? 'Location not specified'}
//                     </span>
//                 </div>

//                 {/* Title */}
//                 <h3 className="h-7 mb-3 text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
//                     {property.title ?? 'Property Title'}
//                 </h3>

//                 {/* Description */}
//                 <div className="flex-grow mb-4">
//                     <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-4">
//                         {property.description
//                             ? property.description.length > 100
//                                 ? property.description.slice(0, 100) + "..."
//                                 : property.description
//                             : "No description available."}
//                     </p>
//                 </div>

//                 {/* Button - Click to open modal */}
//                 <button
//                     onClick={() => onScheduleClick(property)}
//                     className="mt-auto w-full bg-primary hover:bg-primary-dark 
//                                text-white font-medium py-3 rounded-lg 
//                                flex items-center justify-center gap-2 transition-colors"
//                 >
//                     <i className="fas fa-calendar-alt"></i>
//                     Contact Us
//                 </button>
//             </div>
//         </div>
//     );
// }
function PropertyCardItem({ property, featured = false, onScheduleClick }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border 
                        border-gray-200 dark:border-gray-700 
                        flex flex-col h-[470px] overflow-hidden hover:shadow-xl  transition-all duration-300 ease-in-out
                        hover:-translate-y-2 hover:scale-[1.02]
                        hover:shadow-2xl hover:border-primary p-5">

            {/* Location */}
            <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1 ">
                
                <span className="line-clamp-1">
                    {/* {property.title ?? 'Property Title'} */}
                    {property.title
                    ? property.title.length > 60
                        ? property.title.slice(0, 60) + "..."
                        : property.title
                    : "No title available."}
                </span>
            </div>

            {/* Image */}
            <div className="h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700 
                            rounded-lg mb-4 relative">
                <img
                    src={property.image_url ? `/storage/${property.image_url}` : ''}
                    alt={property.title ?? 'Property Image'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3  right-3 flex justify-between">
                    

                    {featured && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                        </span>
                    )}
                </div>
            </div>

            {/* Title */}
            <h3 className="text-sm  font-semibold text-gray-600 dark:text-gray-300 flex items-center mb-3">
                <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
                {property.location
                    ? property.location.length > 60
                        ? property.location.slice(0, 60) + "..."
                        : property.location
                    : "No location available."}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-4 flex-grow">
                {property.description
                    ? property.description.length > 100
                        ? property.description.slice(0, 100) + "..."
                        : property.description
                    : "No description available."}
            </p>

            {/* Button */}
            <button
                onClick={() => onScheduleClick(property)}
                className="w-full bg-primary hover:bg-primary-dark 
                           text-white font-medium py-3 rounded-lg 
                           flex items-center justify-center gap-2 transition-colors mt-auto"
            >
                <i className="fas fa-calendar-alt"></i>
                Contact Us
            </button>
        </div>
    );
}

//working below code PropertyCardItem
// function PropertyCardItem({ property, featured = false, onScheduleClick }) {
//     return (
//         <div className="bg-white dark:bg-gray-900 rounded-xl 
//                         border border-gray-200 dark:border-gray-700
//                         shadow-sm hover:shadow-lg transition-all duration-300
//                         flex flex-col h-[540px] overflow-hidden">

//             {/* Image */}
//             <div className="relative h-56 w-full overflow-hidden">
//                 <img
//                     src={property.image_url ? `/storage/${property.image_url}` : "/images/placeholder.jpg"}
//                     alt={property.title || "Property Image"}
//                     className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
//                 />

//                 {/* Badges */}
//                 <div className="absolute top-4 left-4 flex gap-2">
//                     <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs tracking-wide">
//                         {property.type || "Luxury"}
//                     </span>

//                     {featured && (
//                         <span className="bg-primary text-white px-3 py-1 rounded-full text-xs tracking-wide">
//                             Featured
//                         </span>
//                     )}
                    
//                 </div>
//             </div>

//             {/* Content */}
//             <div className="p-6 flex flex-col flex-grow">

//                 {/* Price */}
//                 <p className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
//                     ${property.price?.toLocaleString() || "Price on Request"}
//                 </p>

//                 {/* Title */}
//                 <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 line-clamp-1 mb-2">
//                     {property.title || "Premium Residential Property"}
//                 </h3>

//                 {/* Location */}
//                 <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
//                     <i className="fas fa-location-dot mr-2"></i>
//                     <span className="line-clamp-1">
//                         {property.location || "Prime Location"}
//                     </span>
//                 </div>

//                 {/* Description */}
//                 <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-5">
//                     {property.description || "Carefully designed property offering comfort, space, and modern living."}
//                 </p>

//                 {/* Meta */}
//                 <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-6 border-t pt-4">
//                     <span><i className="fas fa-bed mr-1"></i> {property.bedrooms ?? 1} Beds</span>
//                     <span><i className="fas fa-bath mr-1"></i> {property.bathrooms ?? 1} Baths</span>
//                     <span><i className="fas fa-ruler-combined mr-1"></i> {property.area ?? 1} sqft</span>
//                 </div>

//                 {/* CTA */}
//                 <button
//                     onClick={() => onScheduleClick(property)}
//                     className="mt-auto w-full bg-gray-900 hover:bg-gray-800 
//                                dark:bg-primary dark:hover:bg-primary-dark
//                                text-white text-sm font-medium py-3 rounded-lg 
//                                flex items-center justify-center gap-2 transition-all"
//                 >
//                     <i className="fas fa-envelope"></i>
//                     Contact Agent
//                 </button>
//             </div>
//         </div>
//     );
// }



// import { Link } from '@inertiajs/react';
// import AppLayout from './Layouts/AppLayout';

// export default function PropertyCard({ properties }) {
//     if (!properties || properties.length === 0) {
//         return (
//             <AppLayout>
//                 <div className="text-center py-12 text-gray-600 dark:text-gray-400">
//                     No properties found
//                 </div>
//             </AppLayout>
//         );
//     }

//     return (
//         <AppLayout>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-6 px-4">
//                 {properties.map((property) => (
//                     <div
//                         key={property.id}
//                         className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border
//                                    border-gray-200 dark:border-gray-700
//                                    flex flex-col h-[520px] overflow-hidden"
//                     >
//                         <div className="h-56 w-full overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
//                             <img
//                                 src={property.image_url ?? '../desgin/property.png'}
//                                 alt={property.title ?? 'Property Image'}
//                                 className="w-full h-full object-cover block"
//                             />

//                             {/* Status */}
//                             <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
//                                 Luxury
//                             </span>
//                             <div className="absolute top-3 right-3">
//                                 <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
//                                     Featured
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="p-5 flex flex-col flex-grow">
//                             {/* Location */}
//                             <div className="h-5 mb-2 text-sm text-gray-600 dark:text-gray-300 flex items-center">
//                                 <i className="fas fa-map-marker-alt mr-2 text-accent"></i>
//                                 <span className="line-clamp-1">
//                                     {property.location ?? 'Location not specified'}
//                                 </span>
//                             </div>

//                             {/* Title */}
//                             <h3 className="h-7 mb-2 text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
//                                 {property.title ?? 'Property Title'}
//                             </h3>

//                             {/* Description */}
//                             <p className="text-sm text-gray-600 dark:text-gray-300">
//                                 {property.description
//                                     ? property.description.length > 200
//                                         ? property.description.slice(0, 200) + "..."
//                                         : property.description
//                                     : "No description available."}
//                             </p>


//                             <div className="flex-grow"></div>

//                             {/* Button */}
//                             <Link
//                                 href={route('properties.schedule', property.id)}
//                                 className="mt-4 w-full bg-primary hover:bg-primary-dark
//                                            text-white font-medium py-3 rounded-lg
//                                            flex items-center justify-center gap-2"
//                             >
//                                 <i className="fas fa-calendar-alt"></i>
//                                 Schedule Viewing
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </AppLayout>
//     );
// }
