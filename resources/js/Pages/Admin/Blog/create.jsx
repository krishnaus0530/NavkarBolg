
// resources/js/Pages/Admin/Blogs/CreateEdit.jsx
// import React, { useState, useEffect } from 'react';
// import { Head, useForm, Link, router } from '@inertiajs/react';

// import AppLayout from '../Layouts/AppLayout';
// import QuillRichTextEditor from '@/Components/QuillRichTextEditor';
// import { 
//     Save, 
//     Eye, 
//     Upload, 
//     X, 
//     Plus, 
//     Image as ImageIcon,
//     Trash2,
//     Edit2,
//     Layout,
//     FileText,
//     Hash,
//     Type,
//     ChevronDown,
//     Calendar,
//     Tag,
//     Clock,
//     Settings,
//     Globe,
//     Lock,
//     Check
// } from 'lucide-react';

// export default function CreateEditBlog({ blog = null, categories = [] }) {
//     const isEdit = !!blog;

//     // Separate state for content images from Quill editor
//     const [contentImages, setContentImages] = useState([]);

//     const { data, setData, post, put, processing, errors } = useForm({
//         title: blog?.title || '',
//         slug: blog?.slug || '',
//         content: blog?.content || '',
//         excerpt: blog?.excerpt || '',
//         featured_image: null,
//         featured_image_url: blog?.featured_image_url || '',
//         status: blog?.status || 'draft',
//         category_id: blog?.category_id || '',
//         tags: blog?.tags?.map(t => t.name).join(', ') || '',
//         meta_title: blog?.meta_title || '',
//         meta_description: blog?.meta_description || '',
//         sections: blog?.sections || [],
//         images: blog?.images?.filter(img => img.type === 'gallery') || [], // Gallery images only
//         new_images: [], // New gallery images
//         published_at: blog?.published_at || new Date().toISOString().split('T')[0],
//     });

//     const [previewImage, setPreviewImage] = useState(blog?.featured_image_url || null);
//     const [activeTab, setActiveTab] = useState('content');
//     const [showPreview, setShowPreview] = useState(false);

//     // Auto-generate slug from title
//     useEffect(() => {
//         if (!isEdit && data.title) {
//             const generatedSlug = data.title
//                 .toLowerCase()
//                 .replace(/[^a-z0-9\s-]/g, '')
//                 .replace(/\s+/g, '-')
//                 .replace(/-+/g, '-')
//                 .substring(0, 100);
//             setData('slug', generatedSlug);
//         }
//     }, [data.title, isEdit]);

//     // Handle featured image change
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (file.size > 5 * 1024 * 1024) {
//                 alert('Image size should be less than 5MB');
//                 return;
//             }
//             setData('featured_image', file);
//             setPreviewImage(URL.createObjectURL(file));
//         }
//     };

//     // Handle multiple gallery images upload
//     const handleMultipleImages = (e) => {
//         const files = Array.from(e.target.files).slice(0, 10);

//         files.forEach(file => {
//             if (file && file.size <= 5 * 1024 * 1024) {
//                 const newImage = {
//                     file: file,
//                     caption: '',
//                     type: 'gallery',
//                     previewUrl: URL.createObjectURL(file)
//                 };
//                 setData('new_images', [...data.new_images, newImage]);
//             }
//         });
//     };

//     // Add new section
//     const addSection = () => {
//         const newSection = {
//             title: '',
//             content: '',
//             order: data.sections.length,
//         };
//         setData('sections', [...data.sections, newSection]);
//     };

//     // Update section
//     const updateSection = (index, field, value) => {
//         const updatedSections = [...data.sections];
//         updatedSections[index][field] = value;
//         setData('sections', updatedSections);
//     };

//     // Remove section
//     const removeSection = (index) => {
//         const updatedSections = data.sections.filter((_, i) => i !== index);
//         setData('sections', updatedSections);
//     };

//     // Handle content images from Quill editor
//     const handleContentImagesChange = (images) => {
//         setContentImages(images);
//     };

//     // Remove gallery image
//     const removeGalleryImage = (index, isNew = false) => {
//         if (isNew) {
//             // Remove from new_images
//             const updatedImages = data.new_images.filter((_, i) => i !== index);
//             setData('new_images', updatedImages);
//         } else {
//             // Remove from existing gallery images
//             const updatedImages = data.images.filter((_, i) => i !== index);
//             setData('images', updatedImages);
//         }
//     };

//     // Update gallery image caption
//     const updateGalleryImageCaption = (index, caption, isNew = false) => {
//         if (isNew) {
//             const updatedImages = [...data.new_images];
//             updatedImages[index].caption = caption;
//             setData('new_images', updatedImages);
//         } else {
//             const updatedImages = [...data.images];
//             updatedImages[index].caption = caption;
//             setData('images', updatedImages);
//         }
//     };

//     // Preview blog
//     const handlePreview = () => {
//         if (isEdit) {
//             window.open(route('blogs.preview', blog.id), '_blank');
//         } else {
//             // Show preview modal or alert for new posts
//             alert('Preview is only available for saved posts. Please save as draft first.');
//         }
//     };

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Create FormData object for file uploads
//         const formData = new FormData();
//         formData.append('title', data.title);
//         formData.append('content', data.content);
//         formData.append('excerpt', data.excerpt);
//         formData.append('status', data.status);
//         formData.append('slug', data.slug);
//         formData.append('category_id', data.category_id || '');
//         formData.append('tags', data.tags);
//         formData.append('meta_title', data.meta_title);
//         formData.append('meta_description', data.meta_description);
//         formData.append('published_at', data.published_at);

//         // Add sections as JSON
//         if (data.sections.length > 0) {
//             formData.append('sections', JSON.stringify(data.sections));
//         }

//         // Add featured image if exists
//         if (data.featured_image) {
//             formData.append('featured_image', data.featured_image);
//         }

//         // Add gallery images (new_images array)
//         data.new_images.forEach((image, index) => {
//             if (image.file) {
//                 formData.append(`gallery_images[${index}][image]`, image.file);
//                 formData.append(`gallery_images[${index}][caption]`, image.caption || '');
//             }
//         });

//         // Add existing gallery images info
//         data.images.forEach((image, index) => {
//             if (image.id) { // Only for existing images
//                 formData.append(`existing_images[${index}][id]`, image.id);
//                 formData.append(`existing_images[${index}][caption]`, image.caption || '');
//             }
//         });

//         // Add content images from Quill editor
//         contentImages.forEach((image, index) => {
//             if (image.file) {
//                 formData.append(`content_images[${index}][file]`, image.file);
//                 formData.append(`content_images[${index}][caption]`, image.caption || '');
//                 formData.append(`content_images[${index}][placeholder]`, image.placeholder || '');
//             }
//         });

//         // Calculate reading time
//         const words = data.content.trim().split(/\s+/).length;
//         const readingTime = Math.ceil(words / 200);
//         formData.append('reading_time', readingTime);

//         if (isEdit) {
//             formData.append('_method', 'PUT');
//             try {
//                 await router.post(route('admin.blogs.update', blog.id), formData, {
//                     preserveScroll: true,
//                     preserveState: false,
//                     forceFormData: true,
//                     onSuccess: () => {
//                         router.visit(route('admin.blogs.index'));
//                     },
//                     onError: (errors) => {
//                         console.error('Update errors:', errors);
//                     }
//                 });
//             } catch (error) {
//                 console.error('Update error:', error);
//             }
//         } else {
//             try {
//                 await router.post(route('admin.blogs.store'), formData, {
//                     preserveScroll: true,
//                     preserveState: false,
//                     forceFormData: true,
//                     onSuccess: () => {
//                         router.visit(route('admin.blogs.index'));
//                     },
//                     onError: (errors) => {
//                         console.error('Create errors:', errors);
//                     }
//                 });
//             } catch (error) {
//                 console.error('Create error:', error);
//             }
//         }
//     };

//     // Save as draft
//     const handleSaveDraft = async () => {
//         setData('status', 'draft');
//         // Use setTimeout to ensure status is updated before submitting
//         setTimeout(() => {
//             const formData = new FormData();
//             formData.append('title', data.title || 'Untitled');
//             formData.append('content', data.content || '');
//             formData.append('status', 'draft');
//             formData.append('_method', isEdit ? 'PUT' : 'POST');

//             // For new posts, we need to create first
//             if (!isEdit) {
//                 router.post(route('admin.blogs.store'), formData, {
//                     preserveScroll: true,
//                     forceFormData: true,
//                     onSuccess: () => {
//                         alert('Draft saved successfully!');
//                     }
//                 });
//             } else {
//                 router.post(route('admin.blogs.update', blog.id), formData, {
//                     preserveScroll: true,
//                     forceFormData: true,
//                     onSuccess: () => {
//                         alert('Draft updated successfully!');
//                     }
//                 });
//             }
//         }, 100);
//     };

//     const tabs = [
//         { id: 'content', label: 'Content', icon: FileText },
//         { id: 'media', label: 'Media', icon: ImageIcon },
//         // { id: 'seo', label: 'SEO', icon: Globe },
//         // { id: 'settings', label: 'Settings', icon: Settings },
//     ];

//     // Get all gallery images (existing + new)
//     const allGalleryImages = [
//         ...data.images.map(img => ({ ...img, isNew: false })),
//         ...data.new_images.map(img => ({ ...img, isNew: true }))
//     ];

//     return (
//         <AppLayout>

//             <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     {/* Header */}
//                     <div className="py-6">
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                             <div>
//                                 <h1 className="text-3xl font-bold text-[#22346e]" style={{ fontFamily: "'Playfair Display', serif" }}>
//                                     {isEdit ? 'Edit Blog Post' : 'Create New Blog'}
//                                 </h1>
//                                 <p className="text-gray-600 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
//                                     {isEdit ? 'Update your existing blog post' : 'Create a new blog post for your website'}
//                                 </p>
//                             </div>

//                             <div className="flex items-center gap-3">
//                                 <button
//                                     type="button"
//                                     onClick={handlePreview}
//                                     className="flex items-center gap-2 px-4 py-2.5 border border-[#22346e] text-[#22346e] hover:bg-[#22346e] hover:text-white rounded-xl transition-all duration-300"
//                                     style={{ fontFamily: "'Montserrat', sans-serif" }}
//                                 >
//                                     <Eye className="w-4 h-4" />
//                                     Preview
//                                 </button>

//                                 {/* <Link
//                                     href={route('admin.blogs.index')}
//                                     className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-[#22346e] transition-colors duration-300"
//                                     style={{ fontFamily: "'Montserrat', sans-serif" }}
//                                 >
//                                     ← Back to All Posts
//                                 </Link> */}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="grid lg:grid-cols-4 gap-8">
//                         {/* Left Sidebar - Settings */}
//                         <div className="lg:col-span-1">
//                             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
//                                 {/* Publish Card */}
//                                 <div className="mb-8">
//                                     <h3 className="text-lg font-semibold text-[#22346e] mb-4 flex items-center gap-2">
//                                         <Settings className="w-5 h-5" />
//                                         Publish
//                                     </h3>

//                                     <div className="space-y-4">
//                                         {/* Status */}
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                 Status
//                                             </label>
//                                             <div className="grid grid-cols-2 gap-2">
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => setData('status', 'draft')}
//                                                     className={`flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all duration-300 ${data.status === 'draft' ? 'bg-gray-100 text-[#22346e] border-2 border-[#22346e]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
//                                                 >
//                                                     <Lock className="w-4 h-4" />
//                                                     Draft
//                                                 </button>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => setData('status', 'published')}
//                                                     className={`flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all duration-300 ${data.status === 'published' ? 'bg-green-100 text-green-700 border-2 border-green-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
//                                                 >
//                                                     <Globe className="w-4 h-4" />
//                                                     Published
//                                                 </button>
//                                             </div>
//                                         </div>

//                                         {/* Published Date */}
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                                                 <Calendar className="w-4 h-4" />
//                                                 Publish Date
//                                             </label>
//                                             <input
//                                                 type="date"
//                                                 value={data.published_at}
//                                                 onChange={e => setData('published_at', e.target.value)}
//                                                 className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e] transition-all duration-300"
//                                             />
//                                         </div>

//                                         {/* Category */}
//                                         {categories.length > 0 && (
//                                             <div>
//                                                 <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
//                                                     <Tag className="w-4 h-4" />
//                                                     Category
//                                                 </label>
//                                                 <select
//                                                     value={data.category_id}
//                                                     onChange={e => setData('category_id', e.target.value)}
//                                                     className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e] transition-all duration-300"
//                                                 >
//                                                     <option value="">Select a category</option>
//                                                     {categories.map(category => (
//                                                         <option key={category.id} value={category.id}>
//                                                             {category.name}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             </div>
//                                         )}

//                                         {/* Tags */}
//                                         <div>
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                                 Tags (comma separated)
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 value={data.tags}
//                                                 onChange={e => setData('tags', e.target.value)}
//                                                 className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e] transition-all duration-300"
//                                                 placeholder="property, investment, tips"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Submit Card */}
//                                 <div className="pt-6 border-t border-gray-200">
//                                     <div className="space-y-3">
//                                         <button
//                                             type="button"
//                                             onClick={handleSubmit}
//                                             disabled={processing}
//                                             className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#f1424b] to-[#ff6b6b] text-white py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-[#f1424b]/30 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                                             style={{ fontFamily: "'Montserrat', sans-serif" }}
//                                         >
//                                             <Save className="w-5 h-5" />
//                                             {processing ? (
//                                                 isEdit ? 'Updating...' : 'Creating...'
//                                             ) : (
//                                                 isEdit ? 'Update Blog Post' : 'Publish Blog Post'
//                                             )}
//                                         </button>

//                                         <button
//                                             type="button"
//                                             onClick={handleSaveDraft}
//                                             disabled={processing}
//                                             className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
//                                             style={{ fontFamily: "'Montserrat', sans-serif" }}
//                                         >
//                                             <Check className="w-5 h-5" />
//                                             Save as Draft
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Main Content Area */}
//                         <div className="lg:col-span-3">
//                             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//                                 {/* Tabs */}
//                                 <div className="border-b border-gray-200">
//                                     <div className="flex overflow-x-auto">
//                                         {tabs.map(tab => {
//                                             const Icon = tab.icon;
//                                             return (
//                                                 <button
//                                                     key={tab.id}
//                                                     type="button"
//                                                     onClick={() => setActiveTab(tab.id)}
//                                                     className={`flex items-center gap-2 px-6 py-4 border-b-2 font-medium whitespace-nowrap transition-colors duration-300 ${activeTab === tab.id ? 'border-[#f1424b] text-[#f1424b]' : 'border-transparent text-gray-600 hover:text-[#22346e]'}`}
//                                                     style={{ fontFamily: "'Montserrat', sans-serif" }}
//                                                 >
//                                                     <Icon className="w-4 h-4" />
//                                                     {tab.label}
//                                                 </button>
//                                             );
//                                         })}
//                                     </div>
//                                 </div>

//                                 <form onSubmit={handleSubmit}>
//                                     {/* Tab Content */}
//                                     <div className="p-6">
//                                         {/* Content Tab */}
//                                         {activeTab === 'content' && (
//                                             <div className="space-y-6">
//                                                 {/* Title */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
//                                                         <Type className="w-4 h-4" />
//                                                         Title *
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={data.title}
//                                                         onChange={e => setData('title', e.target.value)}
//                                                         className="w-full px-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e] transition-all duration-300 text-lg"
//                                                         placeholder="Enter a compelling blog post title"
//                                                         required
//                                                     />
//                                                     {errors.title && (
//                                                         <p className="mt-2 text-sm text-red-600">{errors.title}</p>
//                                                     )}
//                                                 </div>

//                                                 {/* Slug */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
//                                                         <Hash className="w-4 h-4" />
//                                                         URL Slug
//                                                     </label>
//                                                     <div className="flex items-center gap-3">
//                                                         <span className="text-gray-500">excelresidential.com/blog/</span>
//                                                         <input
//                                                             type="text"
//                                                             value={data.slug}
//                                                             onChange={e => setData('slug', e.target.value)}
//                                                             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e] transition-all duration-300"
//                                                             placeholder="url-slug"
//                                                         />
//                                                     </div>
//                                                     {errors.slug && (
//                                                         <p className="mt-2 text-sm text-red-600">{errors.slug}</p>
//                                                     )}
//                                                 </div>

//                                                 {/* Excerpt */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                                                         Excerpt
//                                                     </label>
//                                                     <textarea
//                                                         value={data.excerpt}
//                                                         onChange={e => setData('excerpt', e.target.value)}
//                                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e] transition-all duration-300"
//                                                         rows="3"
//                                                         placeholder="A brief summary of your blog post (used in listings and meta descriptions)"
//                                                         maxLength="300"
//                                                     />
//                                                     <div className="flex justify-between mt-2">
//                                                         <p className="text-sm text-gray-500">
//                                                             {data.excerpt.length}/300 characters
//                                                         </p>
//                                                         <p className="text-sm text-gray-500">
//                                                             {300 - data.excerpt.length} characters remaining
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 {/* Main Content */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
//                                                         <Edit2 className="w-4 h-4" />
//                                                         Content *
//                                                     </label>
//                                                     <div className="rounded-xl overflow-hidden border border-gray-300">
//                                                         <QuillRichTextEditor
//                                                             value={data.content}
//                                                             onChange={(content) => setData('content', content)}
//                                                             onImagesChange={handleContentImagesChange}
//                                                             existingImages={[]} // Don't pass gallery images here
//                                                             error={errors.content}
//                                                             placeholder="Start writing your blog post..."
//                                                         />
//                                                     </div>
//                                                     {errors.content && (
//                                                         <p className="mt-2 text-sm text-red-600">{errors.content}</p>
//                                                     )}
//                                                 </div>

//                                                 {/* Additional Sections */}
//                                                 <div>
//                                                     <div className="flex items-center justify-between mb-4">
//                                                         <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
//                                                             <Layout className="w-4 h-4" />
//                                                             Additional Sections
//                                                         </label>
//                                                         {/* <button
//                                                             type="button"
//                                                             onClick={addSection}
//                                                             className="flex items-center gap-2 px-3 py-2 bg-[#22346e] text-white rounded-lg hover:bg-[#1a2a5a] transition-colors duration-300"
//                                                         >
//                                                             <Plus className="w-4 h-4" />
//                                                             Add Section
//                                                         </button> */}
//                                                     </div>

//                                                     {data.sections.map((section, index) => (
//                                                         <div key={index} className="mb-4 p-5 bg-gray-50 rounded-xl border border-gray-200">
//                                                             <div className="flex justify-between items-center mb-4">
//                                                                 <h4 className="font-semibold text-[#22346e] flex items-center gap-2">
//                                                                     Section {index + 1}
//                                                                 </h4>
//                                                                 <button
//                                                                     type="button"
//                                                                     onClick={() => removeSection(index)}
//                                                                     className="p-1.5 text-gray-400 hover:text-red-600 transition-colors duration-300"
//                                                                 >
//                                                                     <Trash2 className="w-4 h-4" />
//                                                                 </button>
//                                                             </div>

//                                                             <div className="space-y-4">
//                                                                 <input
//                                                                     type="text"
//                                                                     value={section.title || ''}
//                                                                     onChange={e => updateSection(index, 'title', e.target.value)}
//                                                                     className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e]"
//                                                                     placeholder="Section Title (Optional)"
//                                                                 />

//                                                                 <textarea
//                                                                     value={section.content}
//                                                                     onChange={e => updateSection(index, 'content', e.target.value)}
//                                                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e]"
//                                                                     rows="4"
//                                                                     placeholder="Section content..."
//                                                                 />
//                                                             </div>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* Media Tab */}
//                                         {activeTab === 'media' && (
//                                             <div className="space-y-6">
//                                                 {/* Featured Image */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-4">
//                                                         Featured Image *
//                                                     </label>
//                                                     <div className="grid md:grid-cols-2 gap-6">
//                                                         <div>
//                                                             <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#f1424b] transition-colors duration-300 cursor-pointer">
//                                                                 <input
//                                                                     type="file"
//                                                                     accept="image/*"
//                                                                     onChange={handleImageChange}
//                                                                     className="hidden"
//                                                                     id="featured-image"
//                                                                 />
//                                                                 <label htmlFor="featured-image" className="cursor-pointer">
//                                                                     <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                                                                     <p className="text-gray-600 font-medium mb-2">
//                                                                         Click to upload featured image
//                                                                     </p>
//                                                                     <p className="text-sm text-gray-500">
//                                                                         Recommended: 1200x630px, max 5MB
//                                                                     </p>
//                                                                 </label>
//                                                             </div>
//                                                             {errors.featured_image && (
//                                                                 <p className="mt-2 text-sm text-red-600">{errors.featured_image}</p>
//                                                             )}
//                                                         </div>

//                                                         {previewImage && (
//                                                             <div className="relative rounded-xl overflow-hidden">
//                                                                 <img
//                                                                     src={previewImage}
//                                                                     alt="Featured preview"
//                                                                     className="w-full h-48 object-cover"
//                                                                 />
//                                                                 <button
//                                                                     type="button"
//                                                                     onClick={() => {
//                                                                         setPreviewImage(null);
//                                                                         setData('featured_image', null);
//                                                                     }}
//                                                                     className="absolute top-3 right-3 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors duration-300"
//                                                                 >
//                                                                     <X className="w-4 h-4" />
//                                                                 </button>
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 </div>

//                                                 {/* Gallery Images */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-4">
//                                                         Gallery Images
//                                                     </label>
//                                                     <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#f1424b] transition-colors duration-300">
//                                                         <input
//                                                             type="file"
//                                                             accept="image/*"
//                                                             multiple
//                                                             onChange={handleMultipleImages}
//                                                             className="hidden"
//                                                             id="gallery-images"
//                                                         />
//                                                         <label htmlFor="gallery-images" className="cursor-pointer">
//                                                             <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
//                                                             <p className="text-gray-600 font-medium mb-2">
//                                                                 Click to upload multiple images
//                                                             </p>
//                                                             <p className="text-sm text-gray-500">
//                                                                 Upload up to 10 images, max 5MB each
//                                                             </p>
//                                                         </label>
//                                                     </div>

//                                                     {/* Gallery Images Previews */}
//                                                     {allGalleryImages.length > 0 && (
//                                                         <div className="mt-6">
//                                                             <h4 className="text-sm font-medium text-gray-700 mb-4">
//                                                                 Gallery Images ({allGalleryImages.length})
//                                                             </h4>
//                                                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                                                                 {allGalleryImages.map((image, index) => (
//                                                                     <div key={index} className="relative group rounded-xl overflow-hidden border border-gray-200">
//                                                                         <img
//                                                                             src={image.previewUrl || image.image_url}
//                                                                             alt={`Gallery ${index + 1}`}
//                                                                             className="w-full h-32 object-cover"
//                                                                         />
//                                                                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
//                                                                             <button
//                                                                                 type="button"
//                                                                                 onClick={() => removeGalleryImage(index, image.isNew)}
//                                                                                 className="self-end bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors duration-300"
//                                                                             >
//                                                                                 <X className="w-4 h-4" />
//                                                                             </button>
//                                                                             <input
//                                                                                 type="text"
//                                                                                 value={image.caption || ''}
//                                                                                 onChange={(e) => updateGalleryImageCaption(index, e.target.value, image.isNew)}
//                                                                                 className="w-full px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded text-sm"
//                                                                                 placeholder="Add caption..."
//                                                                             />
//                                                                         </div>
//                                                                         {image.isNew && (
//                                                                             <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
//                                                                                 New
//                                                                             </div>
//                                                                         )}
//                                                                     </div>
//                                                                 ))}
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* SEO Tab */}



//                                         {activeTab === 'seo' && (
//                                             <div className="space-y-6">
//                                                 <div className="p-4 bg-blue-50 rounded-xl">
//                                                     <p className="text-blue-800 text-sm">
//                                                         Optimize your blog post for search engines. These fields will help improve your visibility in search results.
//                                                     </p>
//                                                 </div>

//                                                 {/* Meta Title */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                                                         Meta Title
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={data.meta_title}
//                                                         onChange={e => setData('meta_title', e.target.value)}
//                                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e] transition-all duration-300"
//                                                         placeholder="Title for search engines (recommended: 50-60 characters)"
//                                                         maxLength="60"
//                                                     />
//                                                     <div className="flex justify-between mt-2">
//                                                         <p className="text-sm text-gray-500">
//                                                             {data.meta_title.length}/60 characters
//                                                         </p>
//                                                         <p className="text-sm text-gray-500">
//                                                             {60 - data.meta_title.length} characters remaining
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 {/* Meta Description */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                                                         Meta Description
//                                                     </label>
//                                                     <textarea
//                                                         value={data.meta_description}
//                                                         onChange={e => setData('meta_description', e.target.value)}
//                                                         className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22346e]/20 focus:border-[#22346e] transition-all duration-300"
//                                                         rows="4"
//                                                         placeholder="Description for search engines (recommended: 150-160 characters)"
//                                                         maxLength="160"
//                                                     />
//                                                     <div className="flex justify-between mt-2">
//                                                         <p className="text-sm text-gray-500">
//                                                             {data.meta_description.length}/160 characters
//                                                         </p>
//                                                         <p className="text-sm text-gray-500">
//                                                             {160 - data.meta_description.length} characters remaining
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 {/* SEO Preview */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                                                         Search Engine Preview
//                                                     </label>
//                                                     <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
//                                                         <p className="text-blue-600 font-medium text-lg truncate">
//                                                             {data.meta_title || data.title || 'Your Blog Title'}
//                                                         </p>
//                                                         <p className="text-green-700 text-sm mt-1">
//                                                             excelresidential.com/blog/{data.slug || 'your-blog-slug'}
//                                                         </p>
//                                                         <p className="text-gray-600 text-sm mt-2 line-clamp-2">
//                                                             {data.meta_description || data.excerpt || 'Your blog description will appear here...'}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {/* Settings Tab */}
//                                         {activeTab === 'settings' && (
//                                             <div className="space-y-6">
//                                                 <div className="p-4 bg-gray-50 rounded-xl">
//                                                     <p className="text-gray-700 text-sm">
//                                                         Advanced settings for your blog post.
//                                                     </p>
//                                                 </div>

//                                                 {/* Reading Time */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                                                         Reading Time (minutes)
//                                                     </label>
//                                                     <input
//                                                         type="number"
//                                                         min="1"
//                                                         value={Math.ceil(data.content.split(/\s+/).length / 200) || 5}
//                                                         readOnly
//                                                         className="w-32 px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
//                                                     />
//                                                     <p className="mt-2 text-sm text-gray-500">
//                                                         Estimated reading time based on content length (200 words per minute)
//                                                     </p>
//                                                 </div>

//                                                 {/* Advanced Options */}
//                                                 <div>
//                                                     <label className="block text-sm font-medium text-gray-700 mb-3">
//                                                         Advanced Options
//                                                     </label>
//                                                     <div className="space-y-3">
//                                                         <label className="flex items-center">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 defaultChecked={true}
//                                                                 className="rounded border-gray-300 text-[#22346e] focus:ring-[#22346e]"
//                                                             />
//                                                             <span className="ml-2 text-gray-700">
//                                                                 Allow comments on this post
//                                                             </span>
//                                                         </label>
//                                                         <label className="flex items-center">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="rounded border-gray-300 text-[#22346e] focus:ring-[#22346e]"
//                                                             />
//                                                             <span className="ml-2 text-gray-700">
//                                                                 Feature this post on homepage
//                                                             </span>
//                                                         </label>
//                                                         <label className="flex items-center">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 className="rounded border-gray-300 text-[#22346e] focus:ring-[#22346e]"
//                                                             />
//                                                             <span className="ml-2 text-gray-700">
//                                                                 Send email notification to subscribers
//                                                             </span>
//                                                         </label>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Form Actions */}
//                                     <div className="border-t border-gray-200 p-6 bg-gray-50">
//                                         <div className="flex justify-between items-center">
//                                             <div className="text-sm text-gray-600">
//                                                 {isEdit ? (
//                                                     <span>Last updated: {new Date(blog.updated_at).toLocaleDateString()}</span>
//                                                 ) : (
//                                                     <span>All fields marked with * are required</span>
//                                                 )}
//                                             </div>

//                                             <div className="flex gap-3">
//                                                 <Link
//                                                     href={route('admin.blogs.index')}
//                                                     className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300"
//                                                     style={{ fontFamily: "'Montserrat', sans-serif" }}
//                                                 >
//                                                     Cancel
//                                                 </Link>
//                                                 <button
//                                                     type="submit"
//                                                     disabled={processing}
//                                                     className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#22346e] to-[#1a2a5a] text-white rounded-lg hover:shadow-lg hover:shadow-[#22346e]/20 transition-all duration-300 disabled:opacity-50"
//                                                     style={{ fontFamily: "'Montserrat', sans-serif" }}
//                                                 >
//                                                     <Save className="w-4 h-4" />
//                                                     {processing 
//                                                         ? (isEdit ? 'Updating...' : 'Creating...') 
//                                                         : (isEdit ? 'Update Changes' : 'Publish Now')}
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AppLayout>
//     );
// }

import React, { useState, useRef, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { router, usePage } from '@inertiajs/react';
import 'react-quill/dist/quill.snow.css';
import {
    Image as ImageIcon,
    Tag,
    FileText,
    User,
    Clock,
    X,
    Eye,
    Save,
    Upload,
    BarChart,
    CheckCircle,
    TrendingUp,
    Hash,
    Plus,
    Calendar,
    Shield,
    BookOpen,
    Menu,
    Zap,
    Filter,
    MoveVertical,
    Maximize2,
    Minimize2
} from 'lucide-react';

// Custom Quill Editor Component
const QuillEditor = forwardRef(({ value, onChange, placeholder, isResizable, onResizeToggle }, ref) => {
    const quillRef = useRef(null);
    const editorContainerRef = useRef(null);
    const isResizing = useRef(false);
    const startY = useRef(0);
    const startHeight = useRef(0);
    const [showMobileToolbar, setShowMobileToolbar] = useState(false);

    useImperativeHandle(ref, () => ({
        getEditor: () => quillRef.current?.getEditor(),
        getQuill: () => quillRef.current,
        focus: () => quillRef.current?.getEditor()?.focus()
    }));

    const handleQuillRef = (node) => {
        quillRef.current = node;
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true;
        startY.current = e.clientY;
        startHeight.current = editorContainerRef.current.offsetHeight;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        document.body.style.cursor = 'ns-resize';
        document.body.style.userSelect = 'none';
    };

    const handleMouseMove = (e) => {
        if (!isResizing.current) return;
        const deltaY = e.clientY - startY.current;
        const newHeight = Math.max(300, Math.min(window.innerHeight - 100, startHeight.current + deltaY));
        editorContainerRef.current.style.height = `${newHeight}px`;

        if (quillRef.current) {
            const quillEditor = quillRef.current.getEditor();
            if (quillEditor.root) {
                quillEditor.root.style.height = `${newHeight - 80}px`;
            }
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    };

    const handleFullscreen = () => {
        if (!editorContainerRef.current) return;
        if (!document.fullscreenElement) {
            editorContainerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen = !!document.fullscreenElement;
            if (isFullscreen) {
                document.documentElement.style.overflow = 'hidden';
                editorContainerRef.current.classList.add('fullscreen-mode');
            } else {
                document.documentElement.style.overflow = '';
                editorContainerRef.current.classList.remove('fullscreen-mode');
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    useEffect(() => {
        if (editorContainerRef.current) {
            const defaultHeight = isResizable ? 700 : 500;
            editorContainerRef.current.style.height = `${defaultHeight}px`;
            setTimeout(() => {
                const quillEditor = quillRef.current?.getEditor();
                if (quillEditor?.root) {
                    quillEditor.root.style.height = `${defaultHeight - 80}px`;
                }
            }, 100);
        }
    }, [isResizable]);

    const sizePresets = [
        { height: 400, label: 'S', title: 'Small (400px)' },
        { height: 500, label: 'M', title: 'Medium (500px)' },
        { height: 600, label: 'L', title: 'Large (600px)' },
        { height: 700, label: 'XL', title: 'Extra Large (700px)' },
    ];

    const applyPresetSize = (height) => {
        if (editorContainerRef.current) {
            editorContainerRef.current.style.height = `${height}px`;
            const quillEditor = quillRef.current?.getEditor();
            if (quillEditor?.root) {
                quillEditor.root.style.height = `${height - 80}px`;
            }
        }
    };

    // Quill modules configuration
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }]
            ]
        },
        clipboard: {
            matchVisual: false,
        }
    }), []);

    const formats = useMemo(() => [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'link', 'image', 'video',
        'color', 'background', 'align'
    ], []);

    return (
        <div
            ref={editorContainerRef}
            className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-colors"
        >
            <button
                type="button"
                onClick={() => setShowMobileToolbar(!showMobileToolbar)}
                className="lg:hidden absolute top-3 left-3 z-30 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                title="Toggle Toolbar"
            >
                <Menu className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>

            {isResizable && (
                <div
                    className="absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize z-20 group"
                    onMouseDown={handleMouseDown}
                    title="Drag to resize height"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-gray-700 to-transparent group-hover:from-gray-200 dark:group-hover:from-gray-600 transition-colors"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-1 opacity-60 group-hover:opacity-100">
                        <MoveVertical className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </div>
                </div>
            )}

            <div className={`absolute top-3 right-3 z-10 flex space-x-2 ${showMobileToolbar ? 'flex' : 'hidden lg:flex'}`}>
                {isResizable && (
                    <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm p-1 flex space-x-1 mr-2">
                        {sizePresets.map((size) => (
                            <button
                                key={size.height}
                                type="button"
                                onClick={() => applyPresetSize(size.height)}
                                className="w-7 h-7 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
                                title={size.title}
                            >
                                {size.label}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    type="button"
                    onClick={onResizeToggle}
                    className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
                    title={isResizable ? "Fixed Height" : "Resizable Height"}
                >
                    <div className="relative w-4 h-4">
                        <div className="absolute inset-0 border border-gray-600 dark:border-gray-400 rounded-sm group-hover:border-gray-900 dark:group-hover:border-gray-300"></div>
                        {isResizable && (
                            <>
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-gray-600 dark:border-gray-400 rounded-sm"></div>
                                <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-gray-600 dark:bg-gray-400"></div>
                            </>
                        )}
                    </div>
                </button>

                <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                    title="Toggle Fullscreen"
                >
                    {document.fullscreenElement ? (
                        <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    ) : (
                        <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    )}
                </button>
            </div>

            <ReactQuill
                ref={handleQuillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="h-full border-0 text-gray-600 dark:text-gray-400"
            />
        </div>
    );
});

QuillEditor.displayName = 'QuillEditor';

// Main Create Blog Component
const CreateBlogPost = () => {
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        summary: '',
        original_content: '',
        content: '',
        category: '',
        tags: [],
        image: null,
        user_id: 1,
        blog_category_id: 1,
        keys: '',
        banner_image: '',
        author: '',
        authorBio: '',
        readTime: '5 min',
        status: 'draft',
        featured: false,
        seo_title: '',
        seo_description: '',
        seo_keywords: '',
        publish_date: new Date().toISOString().split('T')[0],
        slug: ''
    });

    const [imagePreview, setImagePreview] = useState('');
    const [newTag, setNewTag] = useState('');
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');
    const [isEditorResizable, setIsEditorResizable] = useState(true);
    const [activeTab, setActiveTab] = useState('content');
    const [featuredImageFile, setFeaturedImageFile] = useState(null);
    const [contentImageFile, setContentImageFile] = useState(null);
    const [isInsertingImage, setIsInsertingImage] = useState(false);
    const [keyPoints, setKeyPoints] = useState(['']);
    const [loading, setLoading] = useState(false);
    const quillRef = useRef(null);
    const { categories } = usePage().props;
    console.log(categories);
    // const categories = [
    //     { id: 1, category_name: 'Property Tips', icon: '💡' },
    //     { id: 2, category_name: 'Market Trends', icon: '📈' },
    //     { id: 3, category_name: 'Legal Advice', icon: '⚖️' },
    //     { id: 4, category_name: 'Tenant Management', icon: '👥' },
    //     { id: 5, category_name: 'Maintenance', icon: '🔧' },
    //     { id: 6, category_name: 'Investment', icon: '💰' },
    //     { id: 7, category_name: 'Finance', icon: '📊' },
    //     { id: 8, category_name: 'Technology', icon: '💻' }
    // ];

    const tagSuggestions = [
        'Landlord', 'Management', 'Tips', 'Beginner',
        'Market', 'Legal', 'Tenant', 'Maintenance',
        'Investment', 'Real Estate', 'Property', 'Rental'
    ];

    // Update form data helper
    const updateFormData = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Helper Functions
    const analyzeContent = () => {
        const quill = quillRef.current?.getEditor();
        const html = quill ? quill.root.innerHTML : formData.content;
        const text = quill ? quill.getText() : formData.content.replace(/<[^>]*>/g, '');
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

        // Extract images from content
        const images = [];
        if (html) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const imgElements = tempDiv.querySelectorAll('img');
            imgElements.forEach(img => {
                images.push({
                    src: img.src,
                    alt: img.alt || ''
                });
            });
        }

        return {
            wordCount,
            images,
            imageCount: images.length,
            readingTime: Math.max(1, Math.ceil(wordCount / 200))
        };
    };

    const validateForm = () => {
        const errors = [];
        if (!formData.title.trim()) errors.push('Title is required');
        if (!formData.excerpt.trim()) errors.push('Excerpt is required');
        if (!formData.image) errors.push('Featured image is required');

        const analysis = analyzeContent();
        if (analysis.wordCount < 50) {
            errors.push(`Content should have at least 50 words (currently: ${analysis.wordCount})`);
        }

        return errors;
    };

    // Handle Featured Image Upload
    const handleFeaturedImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFeaturedImageFile(file);
            updateFormData('image', file);

            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle Content Image Upload
    const handleContentImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setContentImageFile(file);

            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target.result);
                setImageAlt(file.name.split('.')[0]);
            };
            reader.readAsDataURL(file);
        }
    };

    // Insert Image in Editor
    const insertImageInEditor = async () => {
        if (!imageUrl || isInsertingImage) {
            return;
        }

        setIsInsertingImage(true);

        try {
            const quill = quillRef.current?.getEditor();
            if (!quill) {
                throw new Error('Quill editor not available');
            }

            const range = quill.getSelection();
            const position = range ? range.index : quill.getLength();

            // Insert image directly
            quill.insertEmbed(position, 'image', imageUrl);

            // Add alt text if provided
            if (imageAlt) {
                setTimeout(() => {
                    const imgElement = quill.root.querySelector(`img[src="${imageUrl}"]`);
                    if (imgElement) {
                        imgElement.alt = imageAlt;
                    }
                }, 100);
            }

            quill.setSelection(position + 1);

            // Update content
            const newContent = quill.root.innerHTML;
            updateFormData('content', newContent);

            setShowImageModal(false);
            setImageUrl('');
            setImageAlt('');
            setContentImageFile(null);

        } catch (error) {
            console.error('Error inserting image:', error);
            alert('Failed to insert image. Please try again.');
        } finally {
            setIsInsertingImage(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Form validation
        const formErrors = validateForm();
        if (formErrors.length > 0) {
            alert('Please fix the following errors:\n\n' + formErrors.join('\n'));
            setLoading(false);
            return;
        }

        const analysis = analyzeContent();

        console.log('📄 Form Data:', formData);

        // Extract images from content
        const contentImages = extractImagesFromContent(formData.content);

        // Step 1: Process content to replace base64 images
        let processedContent = formData.content;
        const imageReplacements = [];

        // Filter only convertible base64 images
        const base64Images = contentImages.filter(img => img.isBase64 && img.file);

        base64Images.forEach((image, index) => {
            const timestamp = Date.now();
            const uniqueId = `${timestamp}_${index}`;
            const fileExtension = image.fileExtension || 'jpg';
            const placeholderUrl = `/storage/blog-content-images/content_image_${uniqueId}.${fileExtension}`;

            // Store replacement info
            imageReplacements.push({
                originalSrc: image.src,
                placeholder: placeholderUrl,
                file: image.file,
                alt: image.alt || '',
                uniqueId: uniqueId,
                fileExtension: fileExtension
            });

            // Simple string replace
            processedContent = processedContent.replace(image.src, placeholderUrl);
        });

        // Step 2: Create FormData
        const submitFormData = new FormData();

        // Add basic fields
        submitFormData.append('title', formData.title);
        submitFormData.append('summary', formData.excerpt);
        submitFormData.append('excerpt', formData.excerpt);
        // submitFormData.append('original', formData.content);
        submitFormData.append('content', processedContent);
        submitFormData.append('blog_category_id', formData.category || 1);
        submitFormData.append('user_id', formData.user_id || 1);
        submitFormData.append('tags', JSON.stringify(formData.tags));
        submitFormData.append('keys', keyPoints.join('||'));
        submitFormData.append('author', formData.author || '');
        submitFormData.append('authorBio', formData.authorBio || '');
        submitFormData.append('readTime', formData.readTime);
        submitFormData.append('status', formData.status);
        submitFormData.append('featured', formData.featured ? '1' : '0');
        submitFormData.append('seo_title', formData.seo_title);
        submitFormData.append('seo_description', formData.seo_description);
        submitFormData.append('seo_keywords', formData.seo_keywords);
        submitFormData.append('publish_date', formData.publish_date);
        submitFormData.append('slug', formData.slug);

        // Add banner image
        if (formData.image instanceof File) {
            submitFormData.append('banner_image', formData.image);
        }

        // Add content images with proper structure
        if (imageReplacements.length > 0) {
            // Create a mapping object
            const contentImagesMapping = {};

            imageReplacements.forEach((replacement, index) => {
                const key = `content_images[${index}]`;

                // Add file to form data
                if (replacement.file instanceof File) {
                    // Use proper filename with extension
                    const fileName = `content_image_${replacement.uniqueId}.${replacement.fileExtension}`;
                    submitFormData.append(key, replacement.file, fileName);
                }

                // Add mapping info
                contentImagesMapping[index] = {
                    placeholder: replacement.placeholder,
                    alt: replacement.alt,
                    uniqueId: replacement.uniqueId,
                    fileExtension: replacement.fileExtension
                };
            });

            // Add mapping as JSON
            submitFormData.append('content_images_mapping', JSON.stringify(contentImagesMapping));
        }


        try {
            router.post(route('admin.blog.store'), submitFormData, {
                forceFormData: true,
                preserveScroll: true,
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
                onSuccess: (response) => {
                    // console.log('✅ SUCCESS RESPONSE:', response);

                    alert('Blog post created successfully!');

                    // Reset form
                    setFormData({
                        title: '',
                        excerpt: '',
                        summary: '',
                        original_content: '',
                        content: '',
                        category: '',
                        tags: [],
                        image: null,
                        user_id: 1,
                        blog_category_id: 1,
                        keys: '',
                        banner_image: '',
                        author: '',
                        authorBio: '',
                        readTime: '5 min',
                        status: 'draft',
                        featured: false,
                        seo_title: '',
                        seo_description: '',
                        seo_keywords: '',
                        publish_date: new Date().toISOString().split('T')[0],
                        slug: ''
                    });
                    setKeyPoints(['']);
                    setImagePreview('');
                    setFeaturedImageFile(null);

                    // Optionally redirect
                    // router.visit('/blogs');
                },
                onError: (errors) => {
                    console.error('❌ ERROR RESPONSE:', errors);

                    if (errors && typeof errors === 'object') {
                        const errorMessages = Object.values(errors).join('\n');
                        alert('Please fix the following errors:\n\n' + errorMessages);
                    } else {
                        alert('Error creating blog post. Please try again.');
                    }
                }
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating blog post: ' + error.message);
            setLoading(false);
        }
    };


    // Helper function to extract images from HTML content
    const extractImagesFromContent = (htmlContent) => {
        if (!htmlContent || typeof htmlContent !== 'string') {
            return [];
        }

        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const imgElements = doc.querySelectorAll('img');

        const images = [];

        imgElements.forEach((img, index) => {
            const src = img.getAttribute('src') || '';
            const alt = img.getAttribute('alt') || '';

            // Check if it's base64
            const isBase64 = src.includes('data:image');

            let file = null;
            let fileExtension = null;

            if (isBase64) {
                // Extract MIME type more robustly
                const mimeMatch = src.match(/data:image\/([a-zA-Z+]+);/);
                if (mimeMatch && mimeMatch[1]) {
                    fileExtension = mimeMatch[1].toLowerCase();
                    // Handle special cases
                    if (fileExtension.includes('jpeg')) fileExtension = 'jpg';

                    // Generate filename
                    const timestamp = Date.now();
                    const filename = `content_image_${timestamp}_${index}.${fileExtension}`;

                    // Convert to File object
                    try {
                        file = base64ToFile(src, filename);
                    } catch (error) {
                        console.log(`❌ Error converting: ${error.message}`);
                    }
                }
            }

            images.push({
                src,
                alt,
                position: index,
                isBase64: isBase64,
                file: file,
                fileExtension: fileExtension
            });
        });

        return images;
    };

    // Helper function to convert base64 to File object
    const base64ToFile = (base64String, filename) => {
        try {
            // Find the comma that separates the metadata from the actual data
            const commaIndex = base64String.indexOf(',');

            if (commaIndex === -1) {
                console.log('❌ No comma found in base64 string');
                return null;
            }

            // Extract metadata and data separately
            const metadata = base64String.substring(0, commaIndex);
            const data = base64String.substring(commaIndex + 1);

            // Extract MIME type from metadata
            const mimeMatch = metadata.match(/data:(image\/[a-zA-Z+]+);/);
            if (!mimeMatch) {
                console.log('❌ Could not extract MIME type from metadata:', metadata);
                return null;
            }

            const mimeType = mimeMatch[1];

            // Decode base64
            const binaryString = atob(data);
            const bytes = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Create File object
            const file = new File([bytes], filename, {
                type: mimeType,
                lastModified: Date.now()
            });

            return file;
        } catch (error) {
            console.error('❌ Error converting base64 to file:', error);
            return null;
        }
    };

    const handleContentChange = (content) => {
        updateFormData('content', content);
    };

    const handleAddTag = (tag) => {
        if (!formData.tags.includes(tag)) {
            updateFormData('tags', [...formData.tags, tag]);
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        updateFormData('tags', formData.tags.filter(tag => tag !== tagToRemove));
    };

    const addKeyPoint = () => {
        setKeyPoints([...keyPoints, '']);
    };

    const updateKeyPoint = (index, value) => {
        const updatedPoints = [...keyPoints];
        updatedPoints[index] = value;
        setKeyPoints(updatedPoints);
    };

    const removeKeyPoint = (index) => {
        const updatedPoints = keyPoints.filter((_, i) => i !== index);
        setKeyPoints(updatedPoints);
    };

    const displayWordCount = useMemo(() => {
        const analysis = analyzeContent();
        return analysis.wordCount || 0;
    }, [formData.content]);

    useEffect(() => {
        if (formData.title && !formData.seo_title) {
            updateFormData('seo_title', `${formData.title} | Blog`);
        }

        if (formData.excerpt && !formData.seo_description) {
            updateFormData('seo_description', formData.excerpt.substring(0, 160));
        }

        if (formData.tags.length > 0 && !formData.seo_keywords) {
            updateFormData('seo_keywords', formData.tags.join(', '));
        }

        if (formData.title && !formData.slug) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .replace(/\s+/g, '-')
                .substring(0, 60);
            updateFormData('slug', slug);
        }

        if (formData.excerpt && !formData.summary) {
            updateFormData('summary', formData.excerpt);
        }
    }, [formData.title, formData.excerpt, formData.tags]);

    const toggleEditorResize = () => {
        setIsEditorResizable(!isEditorResizable);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Image Modal */}
            {showImageModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Insert Image</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add image to content</p>
                            </div>
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                            >
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleContentImageUpload}
                                    className="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                />
                                {contentImageFile && (
                                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
                                        <p className="text-sm text-blue-800 dark:text-blue-300">{contentImageFile.name}</p>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Alt Text (for SEO)
                                </label>
                                <input
                                    type="text"
                                    value={imageAlt}
                                    onChange={(e) => setImageAlt(e.target.value)}
                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                    placeholder="Describe the image"
                                />
                            </div>

                            {imageUrl && (
                                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-700">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
                                    <img
                                        src={imageUrl}
                                        alt="Preview"
                                        className="w-full h-32 object-contain rounded-lg bg-gray-100 dark:bg-gray-800"
                                    />
                                </div>
                            )}

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowImageModal(false)}
                                    className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition text-base text-gray-700 dark:text-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={insertImageInEditor}
                                    disabled={!imageUrl.trim() || isInsertingImage}
                                    className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-medium flex items-center justify-center"
                                >
                                    {isInsertingImage ? 'Inserting...' : 'Insert Image'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Status Bar */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                            <div className="grid grid-cols-2 md:flex md:flex-row gap-6">
                                <div className="text-center">
                                    <div className="text-2xl mb-1">📝</div>
                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Words</div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">{displayWordCount}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl mb-1">⏱️</div>
                                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Read Time</div>
                                    <div className="font-bold text-gray-900 dark:text-gray-100">{formData.readTime}</div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                <div className="flex items-center space-x-4">
                                    {/* <div className="h-10 w-px bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
                                    <label className="flex items-center space-x-3 cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={formData.featured}
                                                onChange={e => updateFormData('featured', e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div className={`w-12 h-6 rounded-full transition ${formData.featured ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}>
                                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${formData.featured ? 'transform translate-x-6' : ''}`}></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                                            <span className="font-medium text-base text-gray-700 dark:text-gray-300">Featured</span>
                                        </div>
                                    </label> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700">
                                <div className="flex border-b dark:border-gray-700">
                                    {['content', 'seo', 'advanced'].map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 py-4 font-medium capitalize transition ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="p-6">
                                    {activeTab === 'content' && (
                                        <div className="space-y-8">
                                            {/* Title */}
                                            <div>
                                                <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                                    Post Title *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={e => updateFormData('title', e.target.value)}
                                                    className="w-full px-5 py-4 text-xl border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                    placeholder="Enter blog title"
                                                    required
                                                />
                                            </div>

                                            {/* Excerpt */}
                                            <div>
                                                <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                                                    Excerpt *
                                                </label>
                                                <textarea
                                                    value={formData.excerpt}
                                                    onChange={e => updateFormData('excerpt', e.target.value)}
                                                    rows="3"
                                                    className="w-full px-5 py-4 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                    placeholder="Brief summary..."
                                                    required
                                                />
                                            </div>

                                            {/* Content Editor */}
                                            <div>
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Content</h2>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Write your main content</p>
                                                    </div>
                                                </div>

                                                <QuillEditor
                                                    ref={quillRef}
                                                    value={formData.content}
                                                    onChange={handleContentChange}
                                                    placeholder="Start writing here..."
                                                    isResizable={isEditorResizable}
                                                    onResizeToggle={toggleEditorResize}
                                                />

                                                <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-sm">💡 Use headers for structure</span>
                                                        <span className="text-sm">🖼️ Click image button to insert</span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <BookOpen className="w-4 h-4 mr-1" />
                                                        <span>{displayWordCount} words</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Key Points */}
                                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/30">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div>
                                                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                                                            <Hash className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                                                            Key Points
                                                        </h2>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">Main points summary</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={addKeyPoint}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium flex items-center"
                                                    >
                                                        <Plus className="w-4 h-4 mr-1" />
                                                        Add Point
                                                    </button>
                                                </div>

                                                <div className="space-y-4">
                                                    {keyPoints.map((point, index) => (
                                                        <div key={index} className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
                                                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold">
                                                                {index + 1}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                value={point}
                                                                onChange={e => updateKeyPoint(index, e.target.value)}
                                                                className="flex-1 px-3 py-2 border-0 focus:ring-0 focus:outline-none text-base bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                                placeholder="Enter key point..."
                                                            />
                                                            {keyPoints.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeKeyPoint(index)}
                                                                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'seo' && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                    SEO Title
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.seo_title}
                                                    onChange={e => updateFormData('seo_title', e.target.value)}
                                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                    placeholder="SEO Title"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                    Meta Description
                                                </label>
                                                <textarea
                                                    value={formData.seo_description}
                                                    onChange={e => updateFormData('seo_description', e.target.value)}
                                                    rows="3"
                                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                    placeholder="Meta description..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                    Keywords
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.seo_keywords}
                                                    onChange={e => updateFormData('seo_keywords', e.target.value)}
                                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                    placeholder="keyword1, keyword2, keyword3"
                                                />
                                            </div>

                                            {/* <div>
                                                <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                    URL Slug
                                                </label>
                                                <div className="flex items-center">
                                                    <span className="px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-r-0 border-gray-300 dark:border-gray-700 rounded-l-xl text-gray-600 dark:text-gray-400">
                                                        yourblog.com/
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={formData.slug}
                                                        onChange={e => updateFormData('slug', e.target.value)}
                                                        className="flex-1 px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-r-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                        placeholder="blog-slug"
                                                    />
                                                </div>
                                            </div> */}
                                        </div>
                                    )}

                                    {activeTab === 'advanced' && (
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    Author Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.author}
                                                    onChange={e => updateFormData('author', e.target.value)}
                                                    className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                    placeholder="Author name"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    Read Time
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.readTime}
                                                    onChange={e => updateFormData('readTime', e.target.value)}
                                                    className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                    placeholder="5 min"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                                    Publish Date
                                                </label>
                                                <input
                                                    type="date"
                                                    value={formData.publish_date}
                                                    onChange={e => updateFormData('publish_date', e.target.value)}
                                                    className="px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Column */}
                        <div className="space-y-8">
                            {/* Featured Image */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
                                <div className="flex items-center mb-6">
                                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
                                        <ImageIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Featured Image</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Main blog image</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Upload Image *
                                        </label>
                                        <div className="flex flex-col items-center space-y-4">
                                            <label className="w-full cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFeaturedImageUpload}
                                                    className="hidden"
                                                />
                                                <div className="px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-center hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
                                                    <Upload className="w-5 h-5 mx-auto mb-1 text-gray-400" />
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">Choose File</span>
                                                </div>
                                            </label>
                                            {featuredImageFile && (
                                                <div className="w-full">
                                                    <div className="px-4 py-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900/30 rounded-xl">
                                                        <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                                            {featuredImageFile.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {imagePreview && (
                                        <div className="mt-4">
                                            <div className="rounded-xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-700">
                                                <img
                                                    src={imagePreview}
                                                    alt="Featured preview"
                                                    className="w-full h-48 object-cover"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                                                Image Preview
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Category */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
                                <div className="flex items-center mb-6">
                                    <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mr-3">
                                        <Filter className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-600 dark:text-gray-400 text-base">Category</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Select category</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            onClick={() => updateFormData('category', category.id)}
                                            className={`p-3 rounded-xl border-2 transition-all ${formData.category == category.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                                        >
                                            <div className="flex items-center justify-center mb-2">
                                                {/* <span className="text-2xl">{category.icon}</span> */}
                                            </div>
                                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">{category.category_name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
                                <div className="flex items-center mb-6">
                                    <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center mr-3">
                                        <Tag className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Tags</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Add relevant tags</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Popular Tags
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {tagSuggestions.map(tag => (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => handleAddTag(tag)}
                                                disabled={formData.tags.includes(tag)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${formData.tags.includes(tag) ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                        Selected Tags
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {formData.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(tag)}
                                                    className="ml-2 hover:text-blue-200"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            value={newTag}
                                            onChange={e => setNewTag(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                            placeholder="Enter custom tag"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
                                                        updateFormData('tags', [...formData.tags, newTag.trim()]);
                                                        setNewTag('');
                                                    }
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
                                                    updateFormData('tags', [...formData.tags, newTag.trim()]);
                                                    setNewTag('');
                                                }
                                            }}
                                            className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition flex items-center justify-center"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Custom Tag
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border dark:border-gray-700 p-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        title: '',
                                        excerpt: '',
                                        summary: '',
                                        original_content: '',
                                        content: '',
                                        category: '',
                                        tags: [],
                                        image: null,
                                        user_id: 1,
                                        blog_category_id: 1,
                                        keys: '',
                                        banner_image: '',
                                        author: '',
                                        authorBio: '',
                                        readTime: '5 min',
                                        status: 'draft',
                                        featured: false,
                                        seo_title: '',
                                        seo_description: '',
                                        seo_keywords: '',
                                        publish_date: new Date().toISOString().split('T')[0],
                                        slug: ''
                                    });
                                    setKeyPoints(['']);
                                    setImagePreview('');
                                    setFeaturedImageFile(null);
                                }}
                                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
                            >
                                Reset
                            </button>

                            <div className="flex items-center space-x-4">
                                {/* <div className="flex items-center space-x-3">
                                    <div className={`w-3 h-3 rounded-full ${formData.status === 'published' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                                        <p className="font-bold text-gray-600 dark:text-gray-400 capitalize">{formData.status}</p>
                                    </div>
                                </div> */}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium shadow-lg disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Publish Blog'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};


const BlogCreate = () => {
    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-6">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                </span>
                <Link
                    href={route('admin.blogs.index')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                    View Posts
                </Link>
            </div>
            <CreateBlogPost />
        </AppLayout>
    );
};

export default BlogCreate;
// export default CreateBlogPost;

// // working code
// import React, { useState, useRef, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
// import { Head, useForm } from '@inertiajs/react';
// import AppLayout from '../Layouts/AppLayout';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import {
//     Image as ImageIcon,
//     Tag,
//     FileText,
//     User,
//     Clock,
//     X,
//     Eye,
//     Save,
//     Upload,
//     BarChart,
//     CheckCircle,
//     TrendingUp,
//     Hash,
//     Plus,
//     Calendar,
//     Shield,
//     BookOpen,
//     Menu,
//     Zap,
//     Filter,
//     MoveVertical,
//     Maximize2,
//     Minimize2
// } from 'lucide-react';

// // Custom Quill Editor Component
// const QuillEditor = forwardRef(({ value, onChange, placeholder, isResizable, onResizeToggle }, ref) => {
//     const quillRef = useRef(null);
//     const editorContainerRef = useRef(null);
//     const isResizing = useRef(false);
//     const startY = useRef(0);
//     const startHeight = useRef(0);
//     const [showMobileToolbar, setShowMobileToolbar] = useState(false);

//     useImperativeHandle(ref, () => ({
//         getEditor: () => quillRef.current?.getEditor(),
//         getQuill: () => quillRef.current,
//         focus: () => quillRef.current?.getEditor()?.focus()
//     }));

//     const handleQuillRef = (node) => {
//         quillRef.current = node;
//     };

//     const handleMouseDown = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         isResizing.current = true;
//         startY.current = e.clientY;
//         startHeight.current = editorContainerRef.current.offsetHeight;

//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', handleMouseUp);

//         document.body.style.cursor = 'ns-resize';
//         document.body.style.userSelect = 'none';
//     };

//     const handleMouseMove = (e) => {
//         if (!isResizing.current) return;
//         const deltaY = e.clientY - startY.current;
//         const newHeight = Math.max(300, Math.min(window.innerHeight - 100, startHeight.current + deltaY));
//         editorContainerRef.current.style.height = `${newHeight}px`;

//         if (quillRef.current) {
//             const quillEditor = quillRef.current.getEditor();
//             if (quillEditor.root) {
//                 quillEditor.root.style.height = `${newHeight - 80}px`;
//             }
//         }
//     };

//     const handleMouseUp = () => {
//         isResizing.current = false;
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//         document.body.style.cursor = '';
//         document.body.style.userSelect = '';
//     };

//     const handleFullscreen = () => {
//         if (!editorContainerRef.current) return;
//         if (!document.fullscreenElement) {
//             editorContainerRef.current.requestFullscreen();
//         } else {
//             document.exitFullscreen();
//         }
//     };

//     useEffect(() => {
//         const handleFullscreenChange = () => {
//             const isFullscreen = !!document.fullscreenElement;
//             if (isFullscreen) {
//                 document.documentElement.style.overflow = 'hidden';
//                 editorContainerRef.current.classList.add('fullscreen-mode');
//             } else {
//                 document.documentElement.style.overflow = '';
//                 editorContainerRef.current.classList.remove('fullscreen-mode');
//             }
//         };

//         document.addEventListener('fullscreenchange', handleFullscreenChange);
//         return () => {
//             document.removeEventListener('fullscreenchange', handleFullscreenChange);
//         };
//     }, []);

//     useEffect(() => {
//         if (editorContainerRef.current) {
//             const defaultHeight = isResizable ? 700 : 500;
//             editorContainerRef.current.style.height = `${defaultHeight}px`;
//             setTimeout(() => {
//                 const quillEditor = quillRef.current?.getEditor();
//                 if (quillEditor?.root) {
//                     quillEditor.root.style.height = `${defaultHeight - 80}px`;
//                 }
//             }, 100);
//         }
//     }, [isResizable]);

//     const sizePresets = [
//         { height: 400, label: 'S', title: 'Small (400px)' },
//         { height: 500, label: 'M', title: 'Medium (500px)' },
//         { height: 600, label: 'L', title: 'Large (600px)' },
//         { height: 700, label: 'XL', title: 'Extra Large (700px)' },
//     ];

//     const applyPresetSize = (height) => {
//         if (editorContainerRef.current) {
//             editorContainerRef.current.style.height = `${height}px`;
//             const quillEditor = quillRef.current?.getEditor();
//             if (quillEditor?.root) {
//                 quillEditor.root.style.height = `${height - 80}px`;
//             }
//         }
//     };

//     // Quill modules configuration
//     const modules = useMemo(() => ({
//         toolbar: {
//             container: [
//                 [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//                 ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//                 [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//                 ['link', 'image', 'video'],
//                 ['clean'],
//                 [{ 'color': [] }, { 'background': [] }],
//                 [{ 'align': [] }]
//             ]
//         },
//         clipboard: {
//             matchVisual: false,
//         }
//     }), []);

//     const formats = useMemo(() => [
//         'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
//         'list', 'bullet', 'indent', 'link', 'image', 'video',
//         'color', 'background', 'align'
//     ], []);

//     return (
//         <div
//             ref={editorContainerRef}
//             className="relative bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-colors"
//         >
//             <button
//                 type="button"
//                 onClick={() => setShowMobileToolbar(!showMobileToolbar)}
//                 className="lg:hidden absolute top-3 left-3 z-30 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//                 title="Toggle Toolbar"
//             >
//                 <Menu className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//             </button>

//             {isResizable && (
//                 <div
//                     className="absolute bottom-0 left-0 right-0 h-4 cursor-ns-resize z-20 group"
//                     onMouseDown={handleMouseDown}
//                     title="Drag to resize height"
//                 >
//                     <div className="absolute inset-0 bg-gradient-to-t from-gray-100 dark:from-gray-700 to-transparent group-hover:from-gray-200 dark:group-hover:from-gray-600 transition-colors"></div>
//                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-1 opacity-60 group-hover:opacity-100">
//                         <MoveVertical className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                     </div>
//                 </div>
//             )}

//             <div className={`absolute top-3 right-3 z-10 flex space-x-2 ${showMobileToolbar ? 'flex' : 'hidden lg:flex'}`}>
//                 {isResizable && (
//                     <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm p-1 flex space-x-1 mr-2">
//                         {sizePresets.map((size) => (
//                             <button
//                                 key={size.height}
//                                 type="button"
//                                 onClick={() => applyPresetSize(size.height)}
//                                 className="w-7 h-7 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
//                                 title={size.title}
//                             >
//                                 {size.label}
//                             </button>
//                         ))}
//                     </div>
//                 )}

//                 <button
//                     type="button"
//                     onClick={onResizeToggle}
//                     className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group"
//                     title={isResizable ? "Fixed Height" : "Resizable Height"}
//                 >
//                     <div className="relative w-4 h-4">
//                         <div className="absolute inset-0 border border-gray-600 dark:border-gray-400 rounded-sm group-hover:border-gray-900 dark:group-hover:border-gray-300"></div>
//                         {isResizable && (
//                             <>
//                                 <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-gray-600 dark:border-gray-400 rounded-sm"></div>
//                                 <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-gray-600 dark:bg-gray-400"></div>
//                             </>
//                         )}
//                     </div>
//                 </button>

//                 <button
//                     type="button"
//                     onClick={handleFullscreen}
//                     className="p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
//                     title="Toggle Fullscreen"
//                 >
//                     {document.fullscreenElement ? (
//                         <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                     ) : (
//                         <Maximize2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
//                     )}
//                 </button>
//             </div>

//             <ReactQuill
//                 ref={handleQuillRef}
//                 theme="snow"
//                 value={value}
//                 onChange={onChange}
//                 modules={modules}
//                 formats={formats}
//                 placeholder={placeholder}
//                 className="h-full border-0"
//             />
//         </div>
//     );
// });

// QuillEditor.displayName = 'QuillEditor';

// // Main Create Blog Component
// const CreateBlogPost = () => {
//     const [imagePreview, setImagePreview] = useState('');
//     const [newTag, setNewTag] = useState('');
//     const [showImageModal, setShowImageModal] = useState(false);
//     const [imageUrl, setImageUrl] = useState('');
//     const [imageAlt, setImageAlt] = useState('');
//     const [showContentPreview, setShowContentPreview] = useState(false);
//     const [isEditorResizable, setIsEditorResizable] = useState(true);
//     const [activeTab, setActiveTab] = useState('content');
//     const [featuredImageFile, setFeaturedImageFile] = useState(null);
//     const [contentImageFile, setContentImageFile] = useState(null);
//     const [isInsertingImage, setIsInsertingImage] = useState(false);
//     const [keyPoints, setKeyPoints] = useState(['']);
//     const quillRef = useRef(null);

//     const { data, setData, post, processing, errors, reset } = useForm({
//         title: '',
//         excerpt: '',
//         summary: '',
//         original_content: '',
//         content: '',
//         category: '',
//         tags: [],
//         image: null,
//         user_id: 1,
//         blog_category_id: 1,
//         keys: '',
//         banner_image: '',
//         author: '',
//         authorBio: '',
//         readTime: '5 min',
//         status: 'draft',
//         featured: false,
//         seo_title: '',
//         seo_description: '',
//         seo_keywords: '',
//         publish_date: new Date().toISOString().split('T')[0],
//         slug: ''
//     });

//     const categories = [
//         { id: 1, name: 'Property Tips', icon: '💡' },
//         { id: 2, name: 'Market Trends', icon: '📈' },
//         { id: 3, name: 'Legal Advice', icon: '⚖️' },
//         { id: 4, name: 'Tenant Management', icon: '👥' },
//         { id: 5, name: 'Maintenance', icon: '🔧' },
//         { id: 6, name: 'Investment', icon: '💰' },
//         { id: 7, name: 'Finance', icon: '📊' },
//         { id: 8, name: 'Technology', icon: '💻' }
//     ];

//     const tagSuggestions = [
//         'Landlord', 'Management', 'Tips', 'Beginner',
//         'Market', 'Legal', 'Tenant', 'Maintenance',
//         'Investment', 'Real Estate', 'Property', 'Rental'
//     ];

//     const statusOptions = [
//         { value: 'draft', label: 'Draft' },
//         { value: 'published', label: 'Published' }
//     ];

//     // Helper Functions
//     const analyzeContent = () => {
//         const quill = quillRef.current?.getEditor();
//         const html = quill ? quill.root.innerHTML : data.content;
//         const text = quill ? quill.getText() : data.content.replace(/<[^>]*>/g, '');
//         const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

//         // Extract images from content
//         const images = [];
//         if (html) {
//             const tempDiv = document.createElement('div');
//             tempDiv.innerHTML = html;
//             const imgElements = tempDiv.querySelectorAll('img');
//             imgElements.forEach(img => {
//                 images.push({
//                     src: img.src,
//                     alt: img.alt || ''
//                 });
//             });
//         }

//         return {
//             wordCount,
//             images,
//             imageCount: images.length,
//             readingTime: Math.max(1, Math.ceil(wordCount / 200))
//         };
//     };

//     const validateForm = () => {
//         const errors = [];
//         if (!data.title.trim()) errors.push('Title is required');
//         if (!data.excerpt.trim()) errors.push('Excerpt is required');
//         if (!data.image) errors.push('Featured image is required');

//         const analysis = analyzeContent();
//         if (analysis.wordCount < 50) {
//             errors.push(`Content should have at least 50 words (currently: ${analysis.wordCount})`);
//         }

//         return errors;
//     };

//     // Handle Featured Image Upload
//     const handleFeaturedImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setFeaturedImageFile(file);
//             setData('image', file);

//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 setImagePreview(event.target.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Handle Content Image Upload
//     const handleContentImageUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setContentImageFile(file);

//             const reader = new FileReader();
//             reader.onload = (event) => {
//                 setImageUrl(event.target.result);
//                 setImageAlt(file.name.split('.')[0]);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     // Insert Image in Editor
//     const insertImageInEditor = async () => {
//         if (!imageUrl || isInsertingImage) {
//             return;
//         }

//         setIsInsertingImage(true);

//         try {
//             const quill = quillRef.current?.getEditor();
//             if (!quill) {
//                 throw new Error('Quill editor not available');
//             }

//             const range = quill.getSelection();
//             const position = range ? range.index : quill.getLength();

//             // Insert image directly (will show as image, not name)
//             quill.insertEmbed(position, 'image', imageUrl);

//             // Add alt text if provided
//             if (imageAlt) {
//                 setTimeout(() => {
//                     const imgElement = quill.root.querySelector(`img[src="${imageUrl}"]`);
//                     if (imgElement) {
//                         imgElement.alt = imageAlt;
//                     }
//                 }, 100);
//             }

//             quill.setSelection(position + 1);

//             // Update content
//             const newContent = quill.root.innerHTML;
//             setData('content', newContent);

//             setShowImageModal(false);
//             setImageUrl('');
//             setImageAlt('');
//             setContentImageFile(null);

//         } catch (error) {
//             console.error('Error inserting image:', error);
//             alert('Failed to insert image. Please try again.');
//         } finally {
//             setIsInsertingImage(false);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Form validation
//         const formErrors = validateForm();
//         if (formErrors.length > 0) {
//             alert('Please fix the following errors:\n\n' + formErrors.join('\n'));
//             return;
//         }

//         const analysis = analyzeContent();

//         console.log('📄 Original HTML content length:', data.content.length);
//         console.log('📄 Content preview (first 500 chars):', data.content.substring(0, 500));

//         // Extract images
//         console.log('\n🔍🔍🔍 STARTING IMAGE EXTRACTION 🔍🔍🔍');
//         const contentImages = extractImagesFromContent(data.content);

//         console.log('\n📊 IMAGE EXTRACTION RESULTS:');
//         console.log(`Total images in HTML: ${contentImages.length}`);

//         // Show details of each image
//         contentImages.forEach((img, index) => {
//             console.log(`\n--- Image ${index + 1} ---`);
//             console.log(`Type: ${img.isBase64 ? 'Base64' : 'External/Placeholder'}`);
//             console.log(`Src preview: ${img.src.substring(0, 100)}...`);
//             console.log(`File created: ${img.file ? 'Yes' : 'No'}`);
//             if (img.file) {
//                 console.log(`File name: ${img.file.name}`);
//                 console.log(`File size: ${img.file.size} bytes`);
//                 console.log(`File type: ${img.file.type}`);
//             }
//         });

//         // Step 1: Process content to replace base64 images
//         let processedContent = data.content;
//         const imageReplacements = [];

//         // Filter only convertible base64 images
//         const base64Images = contentImages.filter(img => img.isBase64 && img.file);

//         console.log(`\n🔄 REPLACING ${base64Images.length} BASE64 IMAGES...`);

//         base64Images.forEach((image, index) => {
//             const timestamp = Date.now();
//             const uniqueId = `${timestamp}_${index}`;
//             const fileExtension = image.fileExtension || 'jpg';
//             const placeholderUrl = `/storage/blog-content-images/content_image_${uniqueId}.${fileExtension}`;

//             console.log(`\nReplacement ${index + 1}:`);
//             console.log(`Original src (truncated): ${image.src.substring(0, 50)}...`);
//             console.log(`Placeholder: ${placeholderUrl}`);

//             // Store replacement info
//             imageReplacements.push({
//                 originalSrc: image.src,
//                 placeholder: placeholderUrl,
//                 file: image.file,
//                 alt: image.alt || '',
//                 uniqueId: uniqueId,
//                 fileExtension: fileExtension
//             });

//             // Simple string replace (more reliable than regex for base64)
//             processedContent = processedContent.replace(image.src, placeholderUrl);

//             console.log(`✅ Replacement completed`);
//         });

//         console.log('\n✅ FINAL PROCESSED CONTENT INFO:');
//         console.log(`Original length: ${data.content.length}`);
//         console.log(`Processed length: ${processedContent.length}`);
//         console.log(`Replacements made: ${imageReplacements.length}`);

//         // Check if replacements actually happened
//         if (imageReplacements.length > 0) {
//             const sampleReplacement = imageReplacements[0];
//             const containsPlaceholder = processedContent.includes(sampleReplacement.placeholder);
//             console.log(`Contains placeholder? ${containsPlaceholder}`);

//             // Show a sample of processed content
//             const placeholderIndex = processedContent.indexOf(sampleReplacement.placeholder);
//             if (placeholderIndex !== -1) {
//                 const context = processedContent.substring(
//                     Math.max(0, placeholderIndex - 50),
//                     Math.min(processedContent.length, placeholderIndex + sampleReplacement.placeholder.length + 50)
//                 );
//                 console.log(`Context around placeholder: ...${context}...`);
//             }
//         } else {
//             console.log('⚠️ No base64 images found to replace');
//         }

//         // Step 2: Create FormData
//         const formData = new FormData();

//         // Add basic fields
//         formData.append('title', data.title);
//         formData.append('summary', data.excerpt);
//         formData.append('excerpt', data.excerpt);
//         formData.append('original', data.content);
//         formData.append('content', processedContent);
//         formData.append('blog_category_id', data.category || 1);
//         formData.append('user_id', data.user_id || 1);
//         formData.append('tags', JSON.stringify(data.tags));
//         formData.append('keys', keyPoints.join('||'));
//         formData.append('author', data.author || '');
//         formData.append('authorBio', data.authorBio || '');
//         formData.append('readTime', data.readTime);
//         formData.append('status', data.status);
//         formData.append('featured', data.featured ? '1' : '0');
//         formData.append('seo_title', data.seo_title);
//         formData.append('seo_description', data.seo_description);
//         formData.append('seo_keywords', data.seo_keywords);
//         formData.append('publish_date', data.publish_date);
//         formData.append('slug', data.slug);

//         // Add banner image
//         if (data.image instanceof File) {
//             formData.append('banner_image', data.image);
//             console.log(`🎯 Banner Image added: ${data.image.name} (${data.image.size} bytes)`);
//         }

//         // Add content images with proper structure
//         if (imageReplacements.length > 0) {
//             // Create a mapping object
//             const contentImagesMapping = {};

//             imageReplacements.forEach((replacement, index) => {
//                 const key = `content_images[${index}]`;

//                 // Add file to form data
//                 if (replacement.file instanceof File) {
//                     // Use proper filename with extension
//                     const fileName = `content_image_${replacement.uniqueId}.${replacement.fileExtension}`;
//                     formData.append(key, replacement.file, fileName);
//                     console.log(`📤 Added to FormData: ${key} = ${fileName} (${replacement.file.size} bytes)`);
//                 }

//                 // Add mapping info
//                 contentImagesMapping[index] = {
//                     placeholder: replacement.placeholder,
//                     alt: replacement.alt,
//                     uniqueId: replacement.uniqueId,
//                     fileExtension: replacement.fileExtension
//                 };
//             });

//             // Add mapping as JSON
//             formData.append('content_images_mapping', JSON.stringify(contentImagesMapping));
//             console.log('\n📋 CONTENT IMAGES MAPPING:', JSON.stringify(contentImagesMapping, null, 2));
//         } else {
//             console.log('⚠️ No content images to add to FormData');
//         }

//         // Debug: Log all FormData entries
//         console.log('\n=== FORMDATA ENTRIES ===');
//         for (let [key, value] of formData.entries()) {
//             if (value instanceof File) {
//                 console.log(`📎 ${key}: ${value.name} (${value.size} bytes, ${value.type})`);
//             } else if (key === 'content_images_mapping') {
//                 console.log(`🗺️ ${key}: (JSON mapping data)`);
//             } else if (key === 'content' || key === 'original') {
//                 console.log(`📝 ${key}: ${value.length} characters`);
//                 // Show preview
//                 if (value.length > 0) {
//                     console.log(`   Preview: ${value.substring(0, 800)}...`);
//                 }
//             } else if (key === 'tags') {
//                 console.log(`🏷️ ${key}: ${value}`);
//             } else {
//                 console.log(`📋 ${key}: ${value}`);
//             }
//         }

//         // Check processed content for placeholders
//         console.log('\n🔍 CHECKING PROCESSED CONTENT:');
//         const placeholderRegex = /\/storage\/blog-content-images\/content_image_\d+_\d+\.\w+/g;
//         const foundPlaceholders = processedContent.match(placeholderRegex);
//         console.log(`Placeholders found in processed content: ${foundPlaceholders ? foundPlaceholders.length : 0}`);
//         if (foundPlaceholders) {
//             foundPlaceholders.forEach((ph, i) => {
//                 console.log(`  Placeholder ${i + 1}: ${ph}`);
//             });
//         }

//         // Submit to backend
//         console.log('\n🚀 SUBMITTING FORM DATA...');
//         console.log('Route:', route('admin.blog.store'));

//         post(route('admin.blog.store'), formData, {
//             forceFormData: true,
//             preserveScroll: true,
//             onSuccess: (response) => {
//                 console.log('✅ SUCCESS RESPONSE:');
//                 console.log('Response status:', response.status);
//                 console.log('Response data:', response.data);
//                 console.log('Blog ID:', response.data?.blog_id);
//                 console.log('Message:', response.data?.message);

//                 alert('Blog post created successfully! ID: ' + (response.data?.blog_id || 'N/A'));

//                 // Reset form if needed
//                 // resetForm();
//             },
//             onError: (errors) => {
//                 console.error('❌ ERROR RESPONSE:');
//                 console.error('Full errors object:', errors);

//                 if (errors && typeof errors === 'object') {
//                     Object.keys(errors).forEach(key => {
//                         console.error(`Validation error - ${key}:`, errors[key]);
//                     });

//                     if (errors.message) {
//                         console.error('Error message:', errors.message);
//                     }
//                 } else {
//                     console.error('Error message:', errors);
//                 }

//                 alert('Error creating blog post. Please check the console for details.');
//             }
//         });
//     };
//     // Improved testFormData function
//     const testFormData = (formData) => {
//         console.log('\n🧪 TESTING FORMDATA LOCALLY...');

//         // Create a copy of FormData to test
//         const testData = new FormData();

//         // Copy all entries
//         for (let [key, value] of formData.entries()) {
//             if (value instanceof File) {
//                 console.log(`📎 File found: ${key} - ${value.name} (${value.size} bytes)`);
//                 testData.append(key, value, value.name);
//             } else {
//                 console.log(`📋 Data found: ${key} - ${typeof value === 'string' ? value.substring(0, 100) + '...' : value}`);
//                 testData.append(key, value);
//             }
//         }

//         // Check what images are in the form data
//         console.log('\n🔍 CHECKING FORM DATA IMAGES:');
//         let imageCount = 0;
//         for (let [key, value] of testData.entries()) {
//             if (key.startsWith('content_images[') && value instanceof File) {
//                 imageCount++;
//                 console.log(`Image ${imageCount}: ${key} = ${value.name} (${value.size} bytes, ${value.type})`);
//             }
//         }
//         console.log(`Total content images in FormData: ${imageCount}`);

//         // Test with httpbin
//         console.log('\n🌐 SENDING TEST TO HTTPBIN...');
//         fetch('https://httpbin.org/post', {
//             method: 'POST',
//             body: formData
//         })
//             .then(response => {
//                 console.log('HTTP Status:', response.status, response.statusText);
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('✅ FormData test successful!');

//                 // Check what files were received
//                 if (data.files) {
//                     const fileKeys = Object.keys(data.files);
//                     console.log(`Files received by server: ${fileKeys.length}`);
//                     fileKeys.forEach(key => {
//                         console.log(`  - ${key}: ${data.files[key].length} chars (approx ${Math.round(data.files[key].length / 1024)}KB)`);
//                     });
//                 }

//                 // Check form fields
//                 if (data.form) {
//                     console.log('\nForm fields received:');
//                     Object.keys(data.form).forEach(key => {
//                         if (key === 'content_images_mapping') {
//                             try {
//                                 const mapping = JSON.parse(data.form[key]);
//                                 console.log(`  - ${key}: ${Object.keys(mapping).length} images mapped`);
//                             } catch (e) {
//                                 console.log(`  - ${key}: ${data.form[key].substring(0, 100)}...`);
//                             }
//                         } else if (key === 'content') {
//                             console.log(`  - ${key}: ${data.form[key].length} characters`);
//                         } else {
//                             console.log(`  - ${key}: ${data.form[key]}`);
//                         }
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error('❌ FormData test failed:', error);
//             });
//     };

//     // Helper function to extract images from HTML content
//     const extractImagesFromContent = (htmlContent) => {
//         console.log('🔍 Extracting images from HTML content...');

//         if (!htmlContent || typeof htmlContent !== 'string') {
//             console.log('❌ No HTML content provided');
//             return [];
//         }

//         // Parse HTML
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(htmlContent, 'text/html');
//         const imgElements = doc.querySelectorAll('img');

//         console.log(`Found ${imgElements.length} img elements`);

//         const images = [];

//         imgElements.forEach((img, index) => {
//             const src = img.getAttribute('src') || '';
//             const alt = img.getAttribute('alt') || '';

//             console.log(`\nProcessing image ${index + 1}:`);
//             console.log(`Src preview: ${src.substring(0, 100)}...`);
//             console.log(`Alt: ${alt}`);
//             console.log(`Src length: ${src.length}`);

//             // Check if it's base64 - multiple patterns
//             const isBase64 = src.includes('data:image');

//             console.log(`Is base64: ${isBase64}`);

//             let file = null;
//             let fileExtension = null;

//             if (isBase64) {
//                 // Extract MIME type more robustly
//                 const mimeMatch = src.match(/data:image\/([a-zA-Z+]+);/);
//                 if (mimeMatch && mimeMatch[1]) {
//                     fileExtension = mimeMatch[1].toLowerCase();
//                     // Handle special cases
//                     if (fileExtension.includes('jpeg')) fileExtension = 'jpg';

//                     console.log(`Detected file extension: ${fileExtension}`);

//                     // Generate filename
//                     const timestamp = Date.now();
//                     const filename = `content_image_${timestamp}_${index}.${fileExtension}`;

//                     // Convert to File object
//                     try {
//                         file = base64ToFile(src, filename);
//                         if (file) {
//                             console.log(`✅ Successfully converted to file: ${filename} (${file.size} bytes)`);
//                         } else {
//                             console.log(`❌ Failed to convert base64 to file`);
//                         }
//                     } catch (error) {
//                         console.log(`❌ Error converting: ${error.message}`);
//                     }
//                 } else {
//                     console.log(`❌ Could not extract MIME type from: ${src.substring(0, 100)}...`);
//                 }
//             } else {
//                 console.log(`ℹ️ Not a base64 image (external URL or already processed)`);
//             }

//             images.push({
//                 src,
//                 alt,
//                 position: index,
//                 isBase64: isBase64,
//                 file: file,
//                 fileExtension: fileExtension
//             });
//         });

//         console.log(`\n✅ Total images extracted: ${images.length}`);
//         console.log(`Base64 images: ${images.filter(img => img.isBase64 && img.file).length} (convertible)`);
//         console.log(`Non-base64 images: ${images.filter(img => !img.isBase64).length}`);

//         return images;
//     };
//     // Helper function to convert base64 to File object
//     const base64ToFile = (base64String, filename) => {
//         try {
//             // Find the comma that separates the metadata from the actual data
//             const commaIndex = base64String.indexOf(',');

//             if (commaIndex === -1) {
//                 console.log('❌ No comma found in base64 string');
//                 return null;
//             }

//             // Extract metadata and data separately
//             const metadata = base64String.substring(0, commaIndex);
//             const data = base64String.substring(commaIndex + 1);

//             // Extract MIME type from metadata
//             const mimeMatch = metadata.match(/data:(image\/[a-zA-Z+]+);/);
//             if (!mimeMatch) {
//                 console.log('❌ Could not extract MIME type from metadata:', metadata);
//                 return null;
//             }

//             const mimeType = mimeMatch[1];

//             console.log(`MIME type: ${mimeType}`);
//             console.log(`Data length: ${data.length} chars`);

//             // Decode base64
//             const binaryString = atob(data);
//             const bytes = new Uint8Array(binaryString.length);

//             for (let i = 0; i < binaryString.length; i++) {
//                 bytes[i] = binaryString.charCodeAt(i);
//             }

//             console.log(`Binary data size: ${bytes.length} bytes`);

//             // Create File object
//             const file = new File([bytes], filename, {
//                 type: mimeType,
//                 lastModified: Date.now()
//             });

//             console.log(`✅ File created: ${file.name} (${file.size} bytes, ${file.type})`);

//             return file;
//         } catch (error) {
//             console.error('❌ Error converting base64 to file:', error);
//             console.error('Base64 string preview:', base64String.substring(0, 200));
//             return null;
//         }
//     };
//     //updated code
//     const handleContentChange = (content) => {
//         setData('content', content);
//     };

//     const handleAddTag = (tag) => {
//         if (!data.tags.includes(tag)) {
//             setData('tags', [...data.tags, tag]);
//         }
//     };

//     const handleRemoveTag = (tagToRemove) => {
//         setData('tags', data.tags.filter(tag => tag !== tagToRemove));
//     };

//     const addKeyPoint = () => {
//         setKeyPoints([...keyPoints, '']);
//     };

//     const updateKeyPoint = (index, value) => {
//         const updatedPoints = [...keyPoints];
//         updatedPoints[index] = value;
//         setKeyPoints(updatedPoints);
//     };

//     const removeKeyPoint = (index) => {
//         const updatedPoints = keyPoints.filter((_, i) => i !== index);
//         setKeyPoints(updatedPoints);
//     };

//     const displayWordCount = useMemo(() => {
//         const analysis = analyzeContent();
//         return analysis.wordCount || 0;
//     }, [data.content]);

//     useEffect(() => {
//         if (data.title && !data.seo_title) {
//             setData('seo_title', `${data.title} | Blog`);
//         }

//         if (data.excerpt && !data.seo_description) {
//             setData('seo_description', data.excerpt.substring(0, 160));
//         }

//         if (data.tags.length > 0 && !data.seo_keywords) {
//             setData('seo_keywords', data.tags.join(', '));
//         }

//         if (data.title && !data.slug) {
//             const slug = data.title
//                 .toLowerCase()
//                 .replace(/[^\w\s]/gi, '')
//                 .replace(/\s+/g, '-')
//                 .substring(0, 60);
//             setData('slug', slug);
//         }

//         if (data.excerpt && !data.summary) {
//             setData('summary', data.excerpt);
//         }
//     }, [data.title, data.excerpt, data.tags]);

//     const toggleEditorResize = () => {
//         setIsEditorResizable(!isEditorResizable);
//     };

//     return (
//         <>
//             <Head title="Create New Blog Post" />

//             {/* Image Modal */}
//             {showImageModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
//                         <div className="flex justify-between items-center mb-6">
//                             <div>
//                                 <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Insert Image</h3>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Add image to content</p>
//                             </div>
//                             <button
//                                 onClick={() => setShowImageModal(false)}
//                                 className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
//                             >
//                                 <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
//                             </button>
//                         </div>

//                         <div className="space-y-4">
//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                     Upload Image
//                                 </label>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleContentImageUpload}
//                                     className="w-full px-3 py-2 text-base border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                 />
//                                 {contentImageFile && (
//                                     <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/30 rounded">
//                                         <p className="text-sm text-blue-800 dark:text-blue-300">{contentImageFile.name}</p>
//                                     </div>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                     Alt Text (for SEO)
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={imageAlt}
//                                     onChange={(e) => setImageAlt(e.target.value)}
//                                     className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                     placeholder="Describe the image"
//                                 />
//                             </div>

//                             {imageUrl && (
//                                 <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border dark:border-gray-700">
//                                     <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview:</p>
//                                     <img
//                                         src={imageUrl}
//                                         alt="Preview"
//                                         className="w-full h-32 object-contain rounded-lg bg-gray-100 dark:bg-gray-800"
//                                     />
//                                 </div>
//                             )}

//                             <div className="flex justify-end space-x-3 pt-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowImageModal(false)}
//                                     className="px-5 py-2.5 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition text-base text-gray-700 dark:text-gray-300"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={insertImageInEditor}
//                                     disabled={!imageUrl.trim() || isInsertingImage}
//                                     className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 font-medium flex items-center justify-center"
//                                 >
//                                     {isInsertingImage ? 'Inserting...' : 'Insert Image'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Main Content */}
//             <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
//                 <div className="container mx-auto px-6 py-8">
//                     <form onSubmit={handleSubmit} className="space-y-8">
//                         {/* Status Bar */}
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
//                             <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
//                                 <div className="grid grid-cols-2 md:flex md:flex-row gap-6">
//                                     <div className="text-center">
//                                         <div className="text-2xl mb-1">📝</div>
//                                         <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Words</div>
//                                         <div className="font-bold text-gray-900 dark:text-gray-100">{displayWordCount}</div>
//                                     </div>
//                                     <div className="text-center">
//                                         <div className="text-2xl mb-1">⏱️</div>
//                                         <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Read Time</div>
//                                         <div className="font-bold text-gray-900 dark:text-gray-100">{data.readTime}</div>
//                                     </div>
//                                 </div>

//                                 <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
//                                     <div className="flex items-center space-x-4">
//                                         <div className="h-10 w-px bg-gray-300 dark:bg-gray-700 hidden md:block"></div>
//                                         <label className="flex items-center space-x-3 cursor-pointer">
//                                             <div className="relative">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={data.featured}
//                                                     onChange={e => setData('featured', e.target.checked)}
//                                                     className="sr-only"
//                                                 />
//                                                 <div className={`w-12 h-6 rounded-full transition ${data.featured ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}>
//                                                     <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${data.featured ? 'transform translate-x-6' : ''}`}></div>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center">
//                                                 <Zap className="w-4 h-4 text-yellow-500 mr-2" />
//                                                 <span className="font-medium text-base text-gray-700 dark:text-gray-300">Featured</span>
//                                             </div>
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                             {/* Main Content Column */}
//                             <div className="lg:col-span-2 space-y-8">
//                                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700">
//                                     <div className="flex border-b dark:border-gray-700">
//                                         {['content', 'seo', 'advanced'].map((tab) => (
//                                             <button
//                                                 key={tab}
//                                                 type="button"
//                                                 onClick={() => setActiveTab(tab)}
//                                                 className={`px-6 py-4 font-medium capitalize transition ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'}`}
//                                             >
//                                                 {tab}
//                                             </button>
//                                         ))}
//                                     </div>

//                                     <div className="p-6">
//                                         {activeTab === 'content' && (
//                                             <div className="space-y-8">
//                                                 {/* Title */}
//                                                 <div>
//                                                     <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
//                                                         Post Title *
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={data.title}
//                                                         onChange={e => setData('title', e.target.value)}
//                                                         className="w-full px-5 py-4 text-xl border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                         placeholder="Enter blog title"
//                                                         required
//                                                     />
//                                                 </div>

//                                                 {/* Excerpt */}
//                                                 <div>
//                                                     <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
//                                                         Excerpt *
//                                                     </label>
//                                                     <textarea
//                                                         value={data.excerpt}
//                                                         onChange={e => setData('excerpt', e.target.value)}
//                                                         rows="3"
//                                                         className="w-full px-5 py-4 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                         placeholder="Brief summary..."
//                                                         required
//                                                     />
//                                                 </div>

//                                                 {/* Content Editor */}
//                                                 <div>
//                                                     <div className="flex items-center justify-between mb-4">
//                                                         <div>
//                                                             <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Content</h2>
//                                                             <p className="text-sm text-gray-600 dark:text-gray-400">Write your main content</p>
//                                                         </div>
//                                                     </div>

//                                                     <QuillEditor
//                                                         ref={quillRef}
//                                                         value={data.content}
//                                                         onChange={handleContentChange}
//                                                         placeholder="Start writing here..."
//                                                         isResizable={isEditorResizable}
//                                                         onResizeToggle={toggleEditorResize}
//                                                     />

//                                                     <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
//                                                         <div className="flex items-center gap-4">
//                                                             <span className="text-sm">💡 Use headers for structure</span>
//                                                             <span className="text-sm">🖼️ Click image button to insert</span>
//                                                         </div>
//                                                         <div className="flex items-center">
//                                                             <BookOpen className="w-4 h-4 mr-1" />
//                                                             <span>{displayWordCount} words</span>
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Key Points */}
//                                                 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/30">
//                                                     <div className="flex items-center justify-between mb-6">
//                                                         <div>
//                                                             <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
//                                                                 <Hash className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
//                                                                 Key Points
//                                                             </h2>
//                                                             <p className="text-sm text-gray-600 dark:text-gray-400">Main points summary</p>
//                                                         </div>
//                                                         <button
//                                                             type="button"
//                                                             onClick={addKeyPoint}
//                                                             className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium flex items-center"
//                                                         >
//                                                             <Plus className="w-4 h-4 mr-1" />
//                                                             Add Point
//                                                         </button>
//                                                     </div>

//                                                     <div className="space-y-4">
//                                                         {keyPoints.map((point, index) => (
//                                                             <div key={index} className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-xl border dark:border-gray-700">
//                                                                 <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center font-bold">
//                                                                     {index + 1}
//                                                                 </div>
//                                                                 <input
//                                                                     type="text"
//                                                                     value={point}
//                                                                     onChange={e => updateKeyPoint(index, e.target.value)}
//                                                                     className="flex-1 px-3 py-2 border-0 focus:ring-0 focus:outline-none text-base bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                                     placeholder="Enter key point..."
//                                                                 />
//                                                                 {keyPoints.length > 1 && (
//                                                                     <button
//                                                                         type="button"
//                                                                         onClick={() => removeKeyPoint(index)}
//                                                                         className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
//                                                                     >
//                                                                         <X className="w-4 h-4" />
//                                                                     </button>
//                                                                 )}
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {activeTab === 'seo' && (
//                                             <div className="space-y-6">
//                                                 <div>
//                                                     <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                                                         SEO Title
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={data.seo_title}
//                                                         onChange={e => setData('seo_title', e.target.value)}
//                                                         className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                         placeholder="SEO Title"
//                                                     />
//                                                 </div>

//                                                 <div>
//                                                     <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                                                         Meta Description
//                                                     </label>
//                                                     <textarea
//                                                         value={data.seo_description}
//                                                         onChange={e => setData('seo_description', e.target.value)}
//                                                         rows="3"
//                                                         className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                         placeholder="Meta description..."
//                                                     />
//                                                 </div>

//                                                 <div>
//                                                     <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                                                         Keywords
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={data.seo_keywords}
//                                                         onChange={e => setData('seo_keywords', e.target.value)}
//                                                         className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                         placeholder="keyword1, keyword2, keyword3"
//                                                     />
//                                                 </div>

//                                                 <div>
//                                                     <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                                                         URL Slug
//                                                     </label>
//                                                     <div className="flex items-center">
//                                                         <span className="px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-r-0 border-gray-300 dark:border-gray-700 rounded-l-xl text-gray-600 dark:text-gray-400">
//                                                             yourblog.com/
//                                                         </span>
//                                                         <input
//                                                             type="text"
//                                                             value={data.slug}
//                                                             onChange={e => setData('slug', e.target.value)}
//                                                             className="flex-1 px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-r-xl focus:ring-2 focus:ring-green-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                             placeholder="blog-slug"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         )}

//                                         {activeTab === 'advanced' && (
//                                             <div className="space-y-6">
//                                                 <div>
//                                                     <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                                         Author Name *
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={data.author}
//                                                         onChange={e => setData('author', e.target.value)}
//                                                         className="w-full pl-10 pr-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                         placeholder="Author name"
//                                                         required
//                                                     />
//                                                 </div>

//                                                 <div>
//                                                     <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                                         Read Time
//                                                     </label>
//                                                     <input
//                                                         type="text"
//                                                         value={data.readTime}
//                                                         onChange={e => setData('readTime', e.target.value)}
//                                                         className="w-full px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                         placeholder="5 min"
//                                                     />
//                                                 </div>

//                                                 <div>
//                                                     <label className="block text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                                                         Publish Date
//                                                     </label>
//                                                     <input
//                                                         type="date"
//                                                         value={data.publish_date}
//                                                         onChange={e => setData('publish_date', e.target.value)}
//                                                         className="px-4 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Sidebar Column */}
//                             <div className="space-y-8">
//                                 {/* Featured Image */}
//                                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
//                                     <div className="flex items-center mb-6">
//                                         <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mr-3">
//                                             <ImageIcon className="w-5 h-5 text-white" />
//                                         </div>
//                                         <div>
//                                             <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Featured Image</h3>
//                                             <p className="text-sm text-gray-600 dark:text-gray-400">Main blog image</p>
//                                         </div>
//                                     </div>

//                                     <div className="space-y-4">
//                                         <div>
//                                             <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
//                                                 Upload Image *
//                                             </label>
//                                             <div className="flex flex-col items-center space-y-4">
//                                                 <label className="w-full cursor-pointer">
//                                                     <input
//                                                         type="file"
//                                                         accept="image/*"
//                                                         onChange={handleFeaturedImageUpload}
//                                                         className="hidden"
//                                                     />
//                                                     <div className="px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-center hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
//                                                         <Upload className="w-5 h-5 mx-auto mb-1 text-gray-400" />
//                                                         <span className="text-sm text-gray-600 dark:text-gray-400">Choose File</span>
//                                                     </div>
//                                                 </label>
//                                                 {featuredImageFile && (
//                                                     <div className="w-full">
//                                                         <div className="px-4 py-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-900/30 rounded-xl">
//                                                             <p className="text-sm font-medium text-green-800 dark:text-green-300">
//                                                                 {featuredImageFile.name}
//                                                             </p>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         </div>

//                                         {imagePreview && (
//                                             <div className="mt-4">
//                                                 <div className="rounded-xl overflow-hidden border-2 border-dashed border-gray-200 dark:border-gray-700">
//                                                     <img
//                                                         src={imagePreview}
//                                                         alt="Featured preview"
//                                                         className="w-full h-48 object-cover"
//                                                     />
//                                                 </div>
//                                                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
//                                                     Image Preview
//                                                 </p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Category */}
//                                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
//                                     <div className="flex items-center mb-6">
//                                         <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center mr-3">
//                                             <Filter className="w-5 h-5 text-white" />
//                                         </div>
//                                         <div>
//                                             <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Category</h3>
//                                             <p className="text-sm text-gray-600 dark:text-gray-400">Select category</p>
//                                         </div>
//                                     </div>

//                                     <div className="grid grid-cols-2 gap-3">
//                                         {categories.map((category) => (
//                                             <button
//                                                 key={category.id}
//                                                 type="button"
//                                                 onClick={() => setData('category', category.id)}
//                                                 className={`p-3 rounded-xl border-2 transition-all ${data.category == category.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
//                                             >
//                                                 <div className="flex items-center justify-center mb-2">
//                                                     <span className="text-2xl">{category.icon}</span>
//                                                 </div>
//                                                 <span className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">{category.name}</span>
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>

//                                 {/* Tags */}
//                                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border dark:border-gray-700 p-6">
//                                     <div className="flex items-center mb-6">
//                                         <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center mr-3">
//                                             <Tag className="w-5 h-5 text-white" />
//                                         </div>
//                                         <div>
//                                             <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">Tags</h3>
//                                             <p className="text-sm text-gray-600 dark:text-gray-400">Add relevant tags</p>
//                                         </div>
//                                     </div>

//                                     <div className="mb-4">
//                                         <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
//                                             Popular Tags
//                                         </label>
//                                         <div className="flex flex-wrap gap-2">
//                                             {tagSuggestions.map(tag => (
//                                                 <button
//                                                     key={tag}
//                                                     type="button"
//                                                     onClick={() => handleAddTag(tag)}
//                                                     disabled={data.tags.includes(tag)}
//                                                     className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${data.tags.includes(tag) ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
//                                                 >
//                                                     {tag}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>

//                                     <div>
//                                         <label className="block text-base font-semibold text-gray-700 dark:text-gray-300 mb-3">
//                                             Selected Tags
//                                         </label>
//                                         <div className="flex flex-wrap gap-2 mb-4">
//                                             {data.tags.map(tag => (
//                                                 <span
//                                                     key={tag}
//                                                     className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 text-white"
//                                                 >
//                                                     {tag}
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => handleRemoveTag(tag)}
//                                                         className="ml-2 hover:text-blue-200"
//                                                     >
//                                                         <X className="w-3 h-3" />
//                                                     </button>
//                                                 </span>
//                                             ))}
//                                         </div>

//                                         <div className="space-y-3">
//                                             <input
//                                                 type="text"
//                                                 value={newTag}
//                                                 onChange={e => setNewTag(e.target.value)}
//                                                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
//                                                 placeholder="Enter custom tag"
//                                                 onKeyPress={(e) => {
//                                                     if (e.key === 'Enter') {
//                                                         e.preventDefault();
//                                                         if (newTag.trim() && !data.tags.includes(newTag.trim())) {
//                                                             setData('tags', [...data.tags, newTag.trim()]);
//                                                             setNewTag('');
//                                                         }
//                                                     }
//                                                 }}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={() => {
//                                                     if (newTag.trim() && !data.tags.includes(newTag.trim())) {
//                                                         setData('tags', [...data.tags, newTag.trim()]);
//                                                         setNewTag('');
//                                                     }
//                                                 }}
//                                                 className="w-full px-4 py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300 transition flex items-center justify-center"
//                                             >
//                                                 <Plus className="w-4 h-4 mr-2" />
//                                                 Add Custom Tag
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Submit Buttons */}
//                         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border dark:border-gray-700 p-6">
//                             <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
//                                 <button
//                                     type="button"
//                                     onClick={() => reset()}
//                                     className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
//                                 >
//                                     Reset
//                                 </button>

//                                 <div className="flex items-center space-x-4">
//                                     <div className="flex items-center space-x-3">
//                                         <div className={`w-3 h-3 rounded-full ${data.status === 'published' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
//                                         <div>
//                                             <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
//                                             <p className="font-bold text-gray-900 dark:text-gray-100 capitalize">{data.status}</p>
//                                         </div>
//                                     </div>

//                                     <button
//                                         type="submit"
//                                         disabled={processing}
//                                         className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium shadow-lg disabled:opacity-50"
//                                     >
//                                         {processing ? 'Saving...' : 'Publish Blog'}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// const BlogCreate = () => {
//     return (
//         <AppLayout>
//             <CreateBlogPost />
//         </AppLayout>
//     );
// };

// export default BlogCreate;





