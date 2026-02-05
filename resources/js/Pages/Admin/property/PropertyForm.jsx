import React, { useState, useRef, useEffect } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';

const PropertyForm = ({ isEdit = false, isShow = false, property = null }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [charCount, setCharCount] = useState(0);
    const [imagePreview, setImagePreview] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);
    
    // Get props from Inertia page
    const pageProps = usePage().props;
    
    // Check for flash messages
    const flash = pageProps.flash || {};
    const errors = pageProps.errors || {};

    // Initialize form data based on mode
    const initialFormData = {
        propertyTitle: isEdit || isShow ? property?.title || '' : '',
        location: isEdit || isShow ? property?.location || '' : '',
        description: isEdit || isShow ? property?.description || '' : '',
        image: null,
    };

    const { data, setData, post, put, processing, reset } = useForm(initialFormData);

    // Handle property data on mount
    useEffect(() => {
        if (isEdit || isShow) {
            if (property) {
                setData({
                    propertyTitle: property.title || '',
                    location: property.location || '',
                    description: property.description || '',
                    image: null,
                });
                setCharCount(property.description?.length || 0);
                
                // Set image preview for existing property
                if (property.image_url && !imagePreview) {
                    setImagePreview(`/storage/${property.image_url}`);
                }
            }
        }
    }, [property]);

    // Handle flash messages from Laravel
    useEffect(() => {
        if (flash.success) {
            setSuccessMessage(flash.success);
            setShowSuccess(true);
            setShowError(false);
            
            if (!isEdit) {
                resetForm();
            }
            
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
        
        if (flash.error) {
            setErrorMessage(flash.error);
            setShowError(true);
            setShowSuccess(false);
            
            const timer = setTimeout(() => {
                setShowError(false);
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [flash]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            if (errors.image) {
                setErrorMessage(errors.image);
                setShowError(true);
            }
        }
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // For edit mode, image is not required if already exists
        if (!isEdit && !data.image) {
            setErrorMessage('Please upload a property image.');
            setShowError(true);
            return;
        }

        // Create FormData for file upload
        const formData = new FormData();
        formData.append('propertyTitle', data.propertyTitle.trim());
        formData.append('location', data.location.trim());
        formData.append('description', data.description.trim());

        // Append image only if new one is uploaded
        if (data.image) {
            formData.append('image', data.image);
        }

        // For edit mode, use PUT method
        if (isEdit && property) {
            formData.append('_method', 'PUT');
            
            put(route('properties.update', property.id), {
                data: formData,
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Property updated successfully');
                },
                onError: (err) => {
                    console.error('Update error:', err);
                    if (err.image) {
                        setErrorMessage(err.image);
                        setShowError(true);
                    }
                }
            });
        } else {
            // For create mode
            post(route('properties.store'), {
                data: formData,
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Form submitted successfully');
                },
                onError: (err) => {
                    console.error('Form submission error:', err);
                    if (err.image) {
                        setErrorMessage(err.image);
                        setShowError(true);
                    }
                }
            });
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setCharCount(value.length);
        setData('description', value);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        // const maxSize = 5 * 1024 * 1024; // 5MB
        const maxSize = 1.8 * 1024 * 1024;
        const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);
        const maxSizeMB = 1.8;

        if (!validTypes.includes(file.type)) {
            setErrorMessage('Please upload a valid image file (PNG, JPG, or WebP).');
            setShowError(true);
            return;
        }

        if (file.size > maxSize) {
            // setErrorMessage('Image must be less than 5MB.');
            // setErrorMessage(`Image must be less than ${maxSizeMB}MB (Current: ${fileSizeMB}MB). Server PHP limit is 2MB.`);
            setErrorMessage(`Image must be less than ${maxSizeMB}MB (Current: ${fileSizeMB}MB). `);
            setShowError(true);
            return;
        }

        // Clear previous preview if exists
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        // Set the image in form data
        setData('image', file);
        setShowError(false); // Clear any previous error

        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const removeImage = () => {
        // Revoke object URL to prevent memory leaks
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImagePreview(null);
        setData('image', null);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const resetForm = () => {
        reset();
        setCharCount(0);
        removeImage();
        setShowError(false);
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('border-accent', 'bg-accent/10');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-accent', 'bg-accent/10');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-accent', 'bg-accent/10');

        const file = e.dataTransfer.files[0];
        if (file) {
            const event = {
                target: {
                    files: [file]
                }
            };
            handleFileUpload(event);
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    // Get page title based on mode
    const getPageTitle = () => {
        if (isShow) return 'View Property Details';
        if (isEdit) return 'Edit Property';
        return 'List a New Property';
    };

    // Get form description based on mode
    const getFormDescription = () => {
        if (isShow) return 'View the property details below.';
        if (isEdit) return 'Edit the property details below.';
        return 'Fill in the details below to list your property. Fields marked with <span className="text-accent font-bold">*</span> are required.';
    };

    return (
        <AppLayout>
            <div className={`container mx-auto px-4 py-6 max-w-5xl ${isDarkMode ? 'dark' : ''}`}>
                {/* Success Message */}
                {showSuccess && (
                    <div className="mb-6 animate-fade-in">
                        <div className="bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4 rounded-r-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <i className="fas fa-check-circle text-green-500 text-xl"></i>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-green-800 dark:text-green-200 font-medium">
                                        {successMessage}
                                    </p>
                                    <p className="text-green-700 dark:text-green-300 text-sm mt-1">
                                        {isEdit 
                                            ? 'Property has been updated successfully.' 
                                            : 'You can view your property in the properties list.'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowSuccess(false)}
                                    className="ml-4 text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 transition-colors"
                                    aria-label="Close success message"
                                >
                                    <i className="fas fa-times text-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {showError && (
                    <div className="mb-6 animate-fade-in">
                        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-red-800 dark:text-red-200 font-medium">
                                        {errorMessage}
                                    </p>
                                    <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                                        Please check the form and try again.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setShowError(false)}
                                    className="ml-4 text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100 transition-colors"
                                    aria-label="Close error message"
                                >
                                    <i className="fas fa-times text-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                    <div className="flex flex-wrap gap-3">
                        <a
                            href={route('properties.admin.index')}
                            className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200 flex items-center"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Back to Properties
                        </a>
                        
                        {isShow && property && (
                            <a
                                href={route('properties.edit', property.id)}
                                className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors duration-200 flex items-center"
                            >
                                <i className="fas fa-edit mr-2"></i>
                                Edit Property
                            </a>
                        )}
                    </div> 
                    
                    <div className="flex items-center mb-4 md:mb-0">
                        <a href={route('properties.admin.index')} className="flex items-center space-x-3">
                            <div className="bg-primary p-3 rounded-xl">
                                <i className="fas fa-home text-white text-xl"></i>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-primary dark:text-white">PropertyStore</h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Premium Property Listings</p>
                            </div>
                        </a>
                    </div>
                </header>

                {/* Form Container */}
                <main className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
                    {/* Form Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                            {getPageTitle()}
                        </h2>
                        {!isShow && (
                            <p className="text-gray-600 dark:text-gray-400" 
                               dangerouslySetInnerHTML={{ __html: getFormDescription() }}>
                            </p>
                        )}
                    </div>

                    <form className="p-6" onSubmit={handleSubmit} noValidate>
                        {/* Basic Information Section */}
                        <section className="mb-10">
                            <div className="flex items-center mb-6">
                                <div className="bg-accent/10 p-2 rounded-lg mr-3">
                                    <i className="fas fa-info-circle text-accent text-lg"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Basic Information</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="propertyTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Property Title {!isShow && <span className="text-accent">*</span>}
                                    </label>
                                    <input
                                        type="text"
                                        id="propertyTitle"
                                        value={data.propertyTitle}
                                        onChange={(e) => setData('propertyTitle', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 ${
                                            isShow 
                                                ? 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 cursor-not-allowed' 
                                                : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        placeholder="e.g. Luxury Villa with Ocean View"
                                        required={!isShow}
                                        readOnly={isShow}
                                        disabled={isShow}
                                    />
                                    {errors.propertyTitle && !isShow && (
                                        <p className="text-red-500 text-sm mt-1">{errors.propertyTitle}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location {!isShow && <span className="text-accent">*</span>}
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 ${
                                            isShow 
                                                ? 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 cursor-not-allowed' 
                                                : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        placeholder="e.g. 123 Main St, New York, NY"
                                        required={!isShow}
                                        readOnly={isShow}
                                        disabled={isShow}
                                    />
                                    {errors.location && !isShow && (
                                        <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Description Section */}
                        <section className="mb-10">
                            <div className="flex items-center mb-6">
                                <div className="bg-accent/10 p-2 rounded-lg mr-3">
                                    <i className="fas fa-align-left text-accent text-lg"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Description</h3>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Property Description {!isShow && <span className="text-accent">*</span>}
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={handleDescriptionChange}
                                    className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 ${
                                        isShow 
                                            ? 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 cursor-not-allowed' 
                                            : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                    placeholder="Describe the property features, amenities, neighborhood, etc."
                                    rows="5"
                                    maxLength="2000"
                                    required={!isShow}
                                    readOnly={isShow}
                                    disabled={isShow}
                                ></textarea>
                                <div className="flex justify-between mt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {isShow 
                                            ? 'Property description' 
                                            : 'Provide a detailed description to attract potential buyers/renters'}
                                    </p>
                                    {!isShow && (
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            <span className={charCount > 1900 ? 'text-yellow-600' : ''}>
                                                {charCount}
                                            </span>/2000 characters
                                        </div>
                                    )}
                                </div>
                                {errors.description && !isShow && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>
                        </section>

                        {/* Property Image Section */}
                        {!isShow && (
                            <section className="mb-10">
                                <div className="flex items-center mb-6">
                                    <div className="bg-accent/10 p-2 rounded-lg mr-3">
                                        <i className="fas fa-image text-accent text-lg"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Property Image</h3>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {isEdit ? 'Update Property Image' : 'Upload Property Image'} 
                                        {!isEdit && <span className="text-accent">*</span>}
                                    </label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                        {isEdit 
                                            ? 'Upload a new image to update the property photo. Leave empty to keep current image.'
                                            : 'Upload a high-quality image of your property. This will be used as the main/cover image. Supported formats: PNG, JPG, WebP up to 5MB.'}
                                    </p>

                                    <div className="mb-4">
                                        <div
                                            onClick={triggerFileInput}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
                                                imagePreview 
                                                    ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
                                                    : 'border-gray-300 dark:border-gray-600 hover:border-accent hover:bg-accent/5'
                                            }`}
                                        >
                                            {imagePreview ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="relative mb-4">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Property preview"
                                                            className="w-48 h-48 object-cover rounded-lg shadow-md"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                removeImage();
                                                            }}
                                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
                                                            aria-label="Remove image"
                                                        >
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Click to change image or drag and drop a new one
                                                    </p>
                                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                                        ✓ Image ready for upload
                                                    </p>
                                                </div>
                                            ) : isEdit && property?.image_url ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="relative mb-4">
                                                        <img
                                                            src={`/storage/${property.image_url}`}
                                                            alt="Current property"
                                                            className="w-48 h-48 object-cover rounded-lg shadow-md"
                                                        />
                                                        <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                                                            <p className="text-white font-medium bg-black/50 px-3 py-1 rounded">
                                                                Current Image
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Click to upload new image or drag and drop
                                                    </p>
                                                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                                        Current image will be kept if no new image uploaded
                                                    </p>
                                                </div>
                                            ) : (
                                                <>
                                                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
                                                    <div className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Click to upload image
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                        or drag and drop
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        PNG, JPG, WebP up to 5MB
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            accept="image/jpeg,image/png,image/webp"
                                            className="hidden"
                                        />
                                    </div>

                                    {errors.image && (
                                        <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                    )}

                                    {!isEdit && !imagePreview && !errors.image && (
                                        <div className="text-yellow-600 dark:text-yellow-400 text-sm bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg">
                                            <i className="fas fa-exclamation-circle mr-2"></i>
                                            Please upload a property image to continue
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Show current image in view mode */}
                        {isShow && property?.image_url && (
                            <section className="mb-10">
                                <div className="flex items-center mb-6">
                                    <div className="bg-accent/10 p-2 rounded-lg mr-3">
                                        <i className="fas fa-image text-accent text-lg"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">Property Image</h3>
                                </div>
                                
                                <div className="flex justify-center">
                                    <img
                                        src={`/storage/${property.image_url}`}
                                        alt={property.title}
                                        className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
                                    />
                                </div>
                            </section>
                        )}
                        {showError && (
                        <div className="mb-6 animate-fade-in">
                            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <p className="text-red-800 dark:text-red-200 font-medium">
                                            {errorMessage}
                                        </p>
                                        <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                                            Please check the form and try again.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowError(false)}
                                        className="ml-4 text-red-700 dark:text-red-300 hover:text-red-900 dark:hover:text-red-100 transition-colors"
                                        aria-label="Close error message"
                                    >
                                        <i className="fas fa-times text-lg"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                        {/* Form Actions - Only show for create/edit */}
                        {!isShow && (
                            <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
                                <div className="mb-4 sm:mb-0">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors duration-200 flex items-center"
                                    >
                                        <i className="fas fa-redo mr-2"></i>
                                        Reset Form
                                    </button>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        disabled={processing || (!isEdit && !imagePreview)}
                                        className={`px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center shadow-sm hover:shadow ${
                                            processing || (!isEdit && !imagePreview)
                                                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                                : 'bg-primary hover:bg-primary-light text-white'
                                        }`}
                                    >
                                        <i className={isEdit ? 'fas fa-save mr-2' : 'fas fa-plus-circle mr-2'}></i>
                                        {processing ? (
                                            <>
                                                <span className="mr-2">{isEdit ? 'Updating...' : 'Uploading...'}</span>
                                                <i className="fas fa-spinner fa-spin"></i>
                                            </>
                                        ) : (
                                            isEdit ? 'Update Property' : 'Add Property'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </main>
            </div>
        </AppLayout>
    );
};

export default PropertyForm;