import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '../Layouts/AppLayout';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Plus,
    Eye,
    Edit,
    Trash2,
    Filter,
    MoreVertical
} from 'lucide-react';

const BlogIndex = ({ blogs, categories = [], filters = {} }) => {
    const blogList = blogs?.data || [];
    const { props } = usePage();
    const flash = props.flash || {};

    const pagination = {
        total: blogs?.total || 0,
        per_page: blogs?.per_page || 10,
        current_page: blogs?.current_page || 1,
        last_page: blogs?.last_page || 1,
        from: blogs?.from || 0,
        to: blogs?.to || 0,
    };

    const { data, setData, get, delete: destroy } = useForm({
        search: filters.search || '',
    });

    const submitSearch = (e) => {
        e.preventDefault();
        get(route('admin.blogs.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const changePage = (page) => {
        get(route('admin.blogs.index', {
            search: data.search,
            page
        }), {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            destroy(route('admin.blog.destroy', id), {
                preserveScroll: true,
                onSuccess: () => {
                    if (flash.success) {
                        alert(flash.success);
                    }
                },
                onError: () => {
                    alert('Error deleting blog post');
                }
            });
        }
    };

    return (
        <AppLayout>
            {/* Flash Messages */}
            {flash.success && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg">
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {flash.error}
                </div>
            )}

            <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Total {pagination.total} posts
                        </p>
                    </div>

                    <Link
                        href={route('createPost')}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg flex items-center justify-center w-full sm:w-auto"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Post
                    </Link>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <form onSubmit={submitSearch} className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                placeholder="Search by title..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600
                                           bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg
                                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
                            />
                        </div>
                    </form>

                    <button className="px-4 py-2.5 border border-gray-300 dark:border-gray-600
                                       bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                                       rounded-lg flex items-center justify-center gap-2">
                        <Filter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {blogList.length ? blogList.map((blog, index) => (
                                    <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {pagination.from + index}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                                                {blog.title}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                                {blog.category_name}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div>{new Date(blog.created_at).toLocaleDateString()}</div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500">
                                                {new Date(blog.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <Link
                                                    href={route('admin.blog.show', blog.id)}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 hover:dark:text-blue-300 transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>

                                                <Link
                                                    href={route('admin.blog.edit', blog.id)}
                                                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 hover:dark:text-indigo-300 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 hover:dark:text-red-300 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="text-gray-500 dark:text-gray-400">
                                                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                <p className="text-lg font-medium">No blog posts found</p>
                                                <p className="text-sm mt-1">Try adjusting your search or create a new post</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {blogList.length ? blogList.map((blog, index) => (
                        <div key={blog.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            #{pagination.from + index}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${blog.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                                            {blog.status}
                                        </span>
                                    </div>
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                </div>
                                <div className="relative">
                                    <button className="p-1">
                                        <MoreVertical className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                <div className="flex items-center gap-1">
                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                                        {blog.category_name}
                                    </span>
                                </div>
                                <div className="text-xs">
                                    {new Date(blog.created_at).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex space-x-3">
                                    <Link
                                        href={route('admin.blog.show', blog.id)}
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route('admin.blog.edit', blog.id)}
                                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm font-medium"
                                    >
                                        Edit
                                    </Link>
                                </div>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="text-red-600 hover:text-red-800 dark:text-red-400 text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8 text-center">
                            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-700 dark:text-gray-300 font-medium">No blog posts found</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search</p>
                            <Link
                                href={route('createPost')}
                                className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                            >
                                Create New Post
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pagination.last_page > 1 && (
                    <div className="mt-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing <span className="font-medium">{pagination.from}</span> to <span className="font-medium">{pagination.to}</span> of{' '}
                                <span className="font-medium">{pagination.total}</span> results
                            </div>

                            <div className="flex items-center justify-center space-x-1">
                                <button
                                    disabled={pagination.current_page === 1}
                                    onClick={() => changePage(pagination.current_page - 1)}
                                    className="p-2 border rounded-lg border-gray-300 dark:border-gray-600
                                               bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                                               disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                                    title="Previous"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                                    let page;
                                    if (pagination.last_page <= 5) {
                                        page = i + 1;
                                    } else if (pagination.current_page <= 3) {
                                        page = i + 1;
                                    } else if (pagination.current_page >= pagination.last_page - 2) {
                                        page = pagination.last_page - 4 + i;
                                    } else {
                                        page = pagination.current_page - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={page}
                                            onClick={() => changePage(page)}
                                            className={`px-3 py-2 text-sm border rounded-lg border-gray-300 dark:border-gray-600 ${page === pagination.current_page
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    disabled={pagination.current_page === pagination.last_page}
                                    onClick={() => changePage(pagination.current_page + 1)}
                                    className="p-2 border rounded-lg border-gray-300 dark:border-gray-600
                                               bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                                               disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                                    title="Next"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                                Page {pagination.current_page} of {pagination.last_page}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default BlogIndex;