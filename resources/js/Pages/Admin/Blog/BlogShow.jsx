import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import { ArrowLeft } from 'lucide-react';

export default function BlogShow({ blog, category, related ,likes,comments,views }) {
    // Parse tags from JSON string
    const tags = typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags || [];

    // Handle null/empty author data
    const authorName = blog.author_name && blog.author_name !== "No" ? blog.author_name : "Anonymous";
    const authorBio = blog.author_bio || "No biography available";

    // Ensure banner image has full URL
    const bannerImage = blog.banner_image?.startsWith('http')
        ? blog.banner_image
        : `/storage/${blog.banner_image}`;
 
    return (
        <>
            <AppLayout>
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors group mb-6"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Blog
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-4 md:p-8">
                    {/* Left Column - Blog Content */}
                    <div className="lg:w-2/3">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">

                            {/* Banner */}
                            <div className="relative h-64 md:h-96">
                                <img
                                    src={bannerImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-full">
                                            {category?.category_name || "Uncategorized"}
                                        </span>
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{blog.title}</h1>
                                    <div className="flex flex-wrap items-center gap-4 text-white/90">
                                        <div className="flex items-center">
                                            <img
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`}
                                                alt={authorName}
                                                className="w-8 h-8 rounded-full mr-2 border-2 border-white/30"
                                            />
                                            <span>{authorName}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                                                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                                <path d="M3 10h18"></path>
                                            </svg>
                                            <span>{new Date(blog.publish_date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-1">
                                                <path d="M12 6v6l4 2"></path>
                                                <circle cx="12" cy="12" r="10"></circle>
                                            </svg>
                                            <span>{blog.read_time || '5 min'} read</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="p-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                    {/* Buttons */}
                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                            <i className="fa-solid fa-eye mr-2"></i> {views|| 0}
                                        </button>
                                        <button className="flex items-center px-4 py-2 rounded-lg transition-colors bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <i className="fa-solid fa-heart mr-2"></i> {likes || 0}
                                        </button>
                                        <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                            <i className="fa-solid fa-comment mr-2"></i> {comments|| 0} 
                                        </button>
                                        <button className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                            <i className="fa-solid fa-share-nodes mr-2"></i> Share
                                        </button>
                                    </div>
                                    <button className="flex items-center px-4 py-2 rounded-lg transition-colors bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <i className="fa-solid fa-book-open mr-2"></i> Bookmark
                                    </button>
                                </div>

                                {/* Content Section */}
                                <article className="prose prose-lg dark:prose-invert max-w-none">
                                    <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8">{blog.summary || blog.excerpt}</p>
                                    <div
                                        className="mb-8 text-gray-700 dark:text-gray-300"
                                        dangerouslySetInnerHTML={{ __html: blog.content || 'No content available' }}
                                    />
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                            {tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 transition-colors cursor-pointer"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </article>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:w-1/3 space-y-8">
                        {/* Author Card - Fixed Position */}
                        <div className="sticky top-8 space-y-8">
                            {/* Author */}
                            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-900 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
                                <div className="text-center">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`}
                                        alt={authorName}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white dark:border-gray-900 shadow-lg"
                                    />
                                    <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-2">{authorName}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 font-medium">{blog.author_title || "Blog Author"}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-600 mb-2">About the Author</h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{authorBio}</p>
                                </div>
                            </div>

                            {/* Related Articles */}
                            {related && related.length > 0 && (
                                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-600 dark:text-gray-400 text-lg mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">Related Articles</h3>
                                    <div className="space-y-6">
                                        {related.map(item => {
                                            const relatedImage = item.banner_image?.startsWith('http')
                                                ? item.banner_image
                                                : `/storage/${item.banner_image}`;

                                            return (
                                                <a
                                                    key={item.id}
                                                    href={`/blogs/${item.slug}`}
                                                    className="group flex items-start space-x-4 hover:no-underline"
                                                >
                                                    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                                                        <img
                                                            src={relatedImage}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 mb-1">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {new Date(item.publish_date).toLocaleDateString()}
                                                        </p>
                                                        <div className="flex items-center mt-1">
                                                            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                                                Read more →
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Newsletter - Updated with Dark Mode */}
                            <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-900 dark:to-blue-900 rounded-2xl p-6 text-white shadow-lg">
                                <div className="text-center mb-4">
                                    <div className="w-12 h-12 bg-white/20 dark:bg-gray-800/40 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                                    <p className="text-purple-100 dark:text-gray-300 text-sm mb-6">Get the latest articles and tips delivered to your inbox.</p>
                                </div>
                                <div className="space-y-3">
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        className="w-full px-4 py-3 rounded-lg bg-white/10 dark:bg-gray-800/40 border border-white/20 dark:border-gray-700/50 text-white placeholder-white/60 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 dark:focus:ring-gray-600 text-sm"
                                    />
                                    <button className="w-full bg-white dark:bg-gray-800 text-purple-600 dark:text-white font-semibold py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm">
                                        Subscribe Now
                                    </button>
                                </div>
                                <p className="text-xs text-purple-200 dark:text-gray-400 text-center mt-4">
                                    No spam ever. Unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}