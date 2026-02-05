

import React, { useState, useEffect } from 'react';
import { Link, router, usePage,Head } from '@inertiajs/react';
import AppLayout from './Layouts/AppLayout';
import CommentBox from './Comment';

// Create a modal component for login prompt
const LoginPromptModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-lock text-blue-600 text-2xl"></i>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Login Required
          </h3>
          <p className="text-gray-600 mb-6">
            Please login to interact with articles. You need an account to like or comment.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onLogin}
              className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Go to Login
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create a modal component for comments
const CommentModal = ({ 
  isOpen, 
  onClose, 
  blogId, 
  blogTitle,
  comments = [],
  onAddComment,
  isLoggedIn
}) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState(comments);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCommentText('');
      setLocalComments(comments);
    }
  }, [isOpen, comments]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    if (!isLoggedIn) {
      onClose();
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would make an API call to add comment
      // const response = await axios.post(`/api/blogs/${blogId}/comments`, {
      //   content: commentText
      // });
      
      // For now, simulate API call
      const newComment = {
        id: Date.now(),
        user: {
          name: 'Current User',
          avatar: null
        },
        content: commentText,
        created_at: new Date().toISOString(),
        likes: 0
      };
      
      setLocalComments(prev => [newComment, ...prev]);
      setCommentText('');
      
      // Call the parent callback if provided
      if (onAddComment) {
        onAddComment(blogId, commentText);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId) => {
    if (!isLoggedIn) return;
    
    // Here you would make an API call to like comment
    // For now, just update local state
    setLocalComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: (comment.likes || 0) + 1 }
        : comment
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-gray-50">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
              Comments 
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {blogTitle}/{blogId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Comment Input */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          {/* <CommentBox blogId={blogId}  isLoggedIn={isLoggedIn}  /> */}
           <CommentBox postId={blogId} />
          {/* <form onSubmit={handleSubmitComment}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-blue-600"></i>
                </div>
              </div>
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder={isLoggedIn ? "Write your comment here..." : "Please login to comment"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500"
                  rows="3"
                  disabled={!isLoggedIn || isSubmitting}
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="text-sm text-gray-500">
                    {isLoggedIn ? 'Your comment will be visible to everyone' : 'Login required to comment'}
                  </div>
                  <button
                    type="submit"
                    disabled={!commentText.trim() || !isLoggedIn || isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Posting...
                      </>
                    ) : (
                      'Post Comment'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form> */}
        </div>
        
        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {localComments.length} {localComments.length === 1 ? 'comment' : 'comments'}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              {!isLoggedIn && (
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login to Comment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogSearch = () => {
  const { props } = usePage();
  const { auth } = props;
  const isLoggedIn = auth?.user ? true : false;
  
  // Safely extract props with defaults
  const blogs = props?.blogs || [];
  console.log(blogs);
  const categories = props?.categories || [];
  const filters = props?.filters || { search: '', category: 'all' };
  const pagination = props?.pagination || {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 9,
    has_more_pages: false
  };

  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
  const [isMobile, setIsMobile] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(pagination.current_page);
  const [hasMore, setHasMore] = useState(pagination.has_more_pages);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedBlogForComment, setSelectedBlogForComment] = useState(null);
  const [likedBlogs, setLikedBlogs] = useState(new Set());
  const [commentedBlogs, setCommentedBlogs] = useState(new Set());
  const [blogComments, setBlogComments] = useState({});

  // Format categories for frontend
  const allCategories = [
    { id: 'all', name: 'All', icon: 'fas fa-layer-group' },
    ...categories.map(cat => ({
      id: cat?.id?.toString() || '',
      name: cat?.name || 'Uncategorized',
      icon: getCategoryIcon(cat?.name)
    }))
  ];

  function getCategoryIcon(categoryName) {
    if (!categoryName) return 'fas fa-folder';
    
    const iconMap = {
      'Property Tips': 'fas fa-home',
      'Market Trends': 'fas fa-chart-line',
      'Resident Guides': 'fas fa-users',
      'Maintenance': 'fas fa-tools',
      'Community': 'fas fa-handshake',
      'Industry News': 'fas fa-newspaper'
    };
    
    return iconMap[categoryName] || 'fas fa-folder';
  }

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update when props change
  useEffect(() => {
    setFilteredBlogs(blogs);
    setSelectedCategory(filters.category || 'all');
    setSearchQuery(filters.search || '');
    setCurrentPage(pagination.current_page);
    setHasMore(pagination.has_more_pages);
  }, [blogs, filters, pagination]);

  // Handle search with debounce
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    const timeoutId = setTimeout(() => {
      router.get(route('blog'), {
        search: query,
        category: selectedCategory !== 'all' ? selectedCategory : null,
        page: 1
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

  // Handle category filter
  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
    
    router.get(route('blog'), {
      search: searchQuery || null,
      category: categoryId !== 'all' ? categoryId : null,
      page: 1
    }, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
    
    if (isMobile) setShowAllCategories(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setShowAllCategories(false);
    
    router.get(route('blog'), {}, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  };

  // Load more articles via AJAX
  // Load more articles via AJAX
const loadMoreArticles = async () => {
  if (!hasMore || isLoadingMore) return;
  
  setIsLoadingMore(true);
  
  try {
    const nextPage = currentPage + 1;
    
    const params = new URLSearchParams({
      page: nextPage,
      search: searchQuery,
      category: selectedCategory !== 'all' ? selectedCategory : ''
    });
    
    const response = await fetch(route('blogs.load-more') + `?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.message || data.error);
    }
    
    if (data.blogs && data.blogs.length > 0) {
      setFilteredBlogs(prev => [...prev, ...data.blogs]);
      setCurrentPage(nextPage);
      setHasMore(data.has_more);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error('Error loading more articles:', error);
    alert('Failed to load more articles: ' + error.message);
  } finally {
    setIsLoadingMore(false);
  }
};

  // Get visible categories
  const getVisibleCategories = () => {
    if (!isMobile || showAllCategories) {
      return allCategories;
    }
    return [...allCategories.slice(0, 4), { id: 'more', name: 'More', icon: 'fas fa-ellipsis-h' }];
  };

  // Handle login redirect
  const handleLoginRedirect = () => {
    router.get(route('AuthPage'));
  };

  // Handle like action
  // const handleLike = (blogId, e) => {
  //   e.stopPropagation(); // Prevent triggering parent click
    
  //   if (!isLoggedIn) {
  //     setShowLoginModal(true);
  //     return;
  //   }
    
  //   // Toggle like status
  //   const newLikedBlogs = new Set(likedBlogs);
  //   if (newLikedBlogs.has(blogId)) {
  //     newLikedBlogs.delete(blogId);
  //     // Here you would make an API call to unlike
  //     // await axios.delete(`/api/blogs/${blogId}/like`);
  //   } else {
  //     newLikedBlogs.add(blogId);
  //     // Here you would make an API call to like
  //     // await axios.post(`/api/blogs/${blogId}/like`);
  //   }
  //   setLikedBlogs(newLikedBlogs);
  // };
  const handleLike = async (blogId, e) => {
      e.stopPropagation();

      if (!isLoggedIn) {
          setShowLoginModal(true);
          return;
      }

      try {
          const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

          const newLikedBlogs = new Set(likedBlogs);

          if (newLikedBlogs.has(blogId)) {
              newLikedBlogs.delete(blogId);
              await fetch('/blog/like', {
                  method: 'POST', // Laravel route is POST
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': csrfToken,
                  },
                  body: JSON.stringify({ post_id: blogId, like: '0' }), // '0' = unlike
              });
          } else {
              newLikedBlogs.add(blogId);
              await fetch('/blog/like', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'X-CSRF-TOKEN': csrfToken,
                  },
                  body: JSON.stringify({ post_id: blogId, like: '1' }), // '1' = like
              });
          }

          setLikedBlogs(newLikedBlogs);

      } catch (err) {
          console.error('Failed to update like', err);
      }
  };

  // Handle comment action
  const handleComment = (blogId, blogTitle, e) => {
    e.stopPropagation(); // Prevent triggering parent click
    
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    // Open comment modal
    setSelectedBlogForComment({
      id: blogId,
      title: blogTitle,
      comments: blogComments[blogId] || []
    });
    setShowCommentModal(true);
  };

  // Handle adding a comment
  const handleAddComment = (blogId, commentText) => {
    // Update comments count for the blog
    const blog = filteredBlogs.find(b => b.id === blogId);
    if (blog) {
      const updatedBlogs = filteredBlogs.map(b => 
        b.id === blogId 
          ? { ...b, comments: (b.comments || 0) + 1 }
          : b
      );
      setFilteredBlogs(updatedBlogs);
    }
    
    // Add to commented blogs set
    setCommentedBlogs(prev => new Set([...prev, blogId]));
    
    // Store the comment
    const comment = {
      id: Date.now(),
      user: {
        name: auth?.user?.name || 'You',
        avatar: null
      },
      content: commentText,
      created_at: new Date().toISOString(),
      likes: 0
    };
    
    setBlogComments(prev => ({
      ...prev,
      [blogId]: [...(prev[blogId] || []), comment]
    }));
  };

  // Blog card click handler
  const handleBlogClick = (slug) => {
    try {
      router.get(route('blog.show', { slug }), {}, {
        preserveScroll: false,
      });
    } catch (error) {
      console.log('Blog clicked:', slug);
      alert('Blog detail page will be implemented soon!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-8">
      {/* Login Prompt Modal */}
      <LoginPromptModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginRedirect}
      />

      {/* Comment Modal */}
      <CommentModal
        isOpen={showCommentModal}
        onClose={() => {
          setShowCommentModal(false);
          setSelectedBlogForComment(null);
        }}
        blogId={selectedBlogForComment?.id}
        blogTitle={selectedBlogForComment?.title}
        comments={selectedBlogForComment?.comments || []}
        onAddComment={handleAddComment}
        isLoggedIn={isLoggedIn}
      />

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-6 md:mb-8">
        <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
          Discover expert advice, market trends, and practical tips
        </p>

        {/* Search Bar */}
        <div className="mb-4 md:mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400 text-sm md:text-base"></i>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search articles, topics, or keywords..."
              className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2.5 md:py-3.5 bg-white border border-gray-300 rounded-lg md:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-sm md:text-base text-gray-700 placeholder-gray-500"
              disabled={isLoading}
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center hover:text-gray-700"
                disabled={isLoading}
              >
                <i className="fas fa-times text-gray-400 hover:text-gray-600 text-sm md:text-base"></i>
              </button>
            )}
            {isLoading && (
              <div className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center">
                <i className="fas fa-spinner fa-spin text-blue-500 text-sm md:text-base"></i>
              </div>
            )}
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-10 z-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <i className="fas fa-spinner fa-spin text-blue-500 text-2xl"></i>
              <span className="ml-2">Loading...</span>
            </div>
          </div>
        )}

        {/* Mobile Category Modal */}
        {isMobile && showAllCategories && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm max-h-[80vh] overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Select Category</h3>
                <button
                  onClick={() => setShowAllCategories(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-2 gap-2">
                  {allCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryFilter(category.id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all ${selectedCategory === category.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <i className={`${category.icon} text-lg mb-2`}></i>
                      <span className="font-medium text-xs text-center">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => setShowAllCategories(false)}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-6 md:mb-8">
          {/* Category/Type Filters */}
          <div className="w-full md:flex-1 overflow-x-auto">
            <div className="flex space-x-2 pb-1 md:pb-2">
              {getVisibleCategories().map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    if (category.id === 'more') {
                      setShowAllCategories(true);
                    } else {
                      handleCategoryFilter(category.id);
                    }
                  }}
                  className={`flex items-center px-3 md:px-4 py-2 md:py-2.5 rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : category.id === 'more'
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <i className={`${category.icon} mr-1.5 md:mr-2 text-xs md:text-sm`}></i>
                  <span className="font-medium text-xs md:text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 mt-3 md:mt-0 w-full md:w-auto">
            <div className="md:hidden flex-1">
              <span className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1.5 rounded-lg">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            <div className="flex items-center space-x-1 bg-gray-100 p-0.5 md:p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 md:p-2.5 rounded-md transition-all ${viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
                title="Grid View"
              >
                <i className="fas fa-th-large text-sm md:text-base"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 md:p-2.5 rounded-md transition-all ${viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                  }`}
                title="List View"
              >
                <i className="fas fa-list text-sm md:text-base"></i>
              </button>
            </div>

            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="flex items-center px-3 md:px-4 py-1.5 md:py-2.5 text-xs md:text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-times mr-1 md:mr-2 text-xs"></i>
                <span className="hidden md:inline">Clear</span>
                <span className="md:hidden">Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-4 md:mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Latest Articles
              {selectedCategory !== 'all' && (
                <span className="text-blue-600 ml-1 md:ml-2 text-sm md:text-base">
                  • {allCategories.find(c => c.id === selectedCategory)?.name}
                </span>
              )}
            </h2>
            {searchQuery && (
              <p className="text-gray-600 text-xs md:text-sm mt-0.5 md:mt-1">
                Searching for: "<span className="font-medium">{searchQuery}</span>"
              </p>
            )}
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
              {filteredBlogs.length} {filteredBlogs.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
        </div>

        {!isLoading && filteredBlogs.length === 0 ? (
          <div className="text-center py-10 md:py-16 bg-white rounded-xl md:rounded-2xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full mb-4 md:mb-6">
              <i className="fas fa-search text-2xl md:text-3xl text-gray-400"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">
              No articles found
            </h3>
            <p className="text-gray-600 mb-4 md:mb-6 max-w-md mx-auto px-4 md:px-0 text-sm md:text-base">
              {searchQuery
                ? `No results found for "${searchQuery}". Try different keywords or clear filters.`
                : "No articles match the selected filters. Try selecting a different category."}
            </p>
            <button
              onClick={clearFilters}
              className="px-5 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white font-medium rounded-lg md:rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center text-sm md:text-base"
            >
              <i className="fas fa-redo mr-1.5 md:mr-2 text-xs"></i>
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredBlogs.map(blog => (
                  <div
                    key={blog.id}
                    className="group bg-white rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full"
                    // onClick={() => handleBlogClick(blog.slug)}
                  >
                    <div className="relative h-40 sm:h-36 md:h-48 lg:h-56 overflow-hidden">
                      <img
                        src={blog.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 md:top-4 md:left-4">
                        <span className="px-2 md:px-3 py-1 md:py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
                          {blog.category || 'Uncategorized'} 
                          {/* / {blog.id} */}
                          
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-8 md:h-12"></div>
                    </div>

                    <div className="p-3 md:p-5 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2 md:mb-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <i className="fas fa-clock mr-1 text-xs"></i>
                          <span className="truncate text-xs">{blog.readTime || '5 min'}</span>
                          <span className="mx-1 md:mx-2">•</span>
                          <i className="fas fa-calendar mr-1 text-xs"></i>
                          <span className="truncate text-xs">{blog.date || 'N/A'}</span>
                        </div>
                      </div>

                      <h3 className="text-sm md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {blog.title || 'Untitled'}
                      </h3>

                      <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 flex-1">
                        {blog.excerpt || blog.summary || 'No description available'}
                      </p>
                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-4">
                          {blog.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-1.5 md:px-2.5 py-0.5 md:py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors truncate max-w-[100px] md:max-w-[120px]"
                            >
                              #{tag}
                            </span>
                          ))}
                          {blog.tags.length > 2 && (
                            <span className="px-1.5 md:px-2.5 py-0.5 md:py-1 text-gray-500 text-xs">
                              +{blog.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="pt-3 md:pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center min-w-0">
                            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
                              <i className="fas fa-user text-blue-600 text-xs md:text-sm lg:text-base"></i>
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 text-xs md:text-sm lg:text-base truncate">
                                {/* {blog.author || 'Admin'} */}
                              </p>
                              <p className="text-xs text-gray-500 hidden md:block">Author</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3 ml-1 md:ml-2">
                            <button
                              className="flex items-center text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
                              title={isLoggedIn ? "Comment on this article" : "Login to comment"}
                            >
                              <i className="fas fa-eye mr-0.5 md:mr-1 text-xs md:text-sm"></i>
                              <span className="font-medium text-xs md:text-sm">
                                {blog.views || 0}
                                {/* // {blog.id || 'no id'} */}
                              </span>
                            </button>
                            <button
                              onClick={(e) => handleLike(blog.id, e)}
                              className={`flex items-center transition-colors cursor-pointer ${likedBlogs.has(blog.id) 
                                  ? 'text-red-500' 
                                  : 'text-gray-500 hover:text-red-500'
                                }`}
                              title={isLoggedIn ? "Like this article" : "Login to like"}
                            >
                              <i className={`fas ${likedBlogs.has(blog.id) ? 'fa-heart' : 'fa-heart'} mr-0.5 md:mr-1 text-xs md:text-sm`}></i>
                              <span className="font-medium text-xs md:text-sm">
                                {(blog.likes || 0) + (likedBlogs.has(blog.id) ? 1 : 0)}
                              </span>
                            </button>
                            <button
                              onClick={(e) => handleComment(blog.id, blog.title, e)}
                              className="flex items-center text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
                              title={isLoggedIn ? "Comment on this article" : "Login to comment"}
                            >
                              <i className="fas fa-comment mr-0.5 md:mr-1 text-xs md:text-sm"></i>
                              <span className="font-medium text-xs md:text-sm">
                                {blog.comments || 0} 
                                {/* // {blog.id || 'no id'} */}
                              </span>
                            </button>
                              
                            <Link
                              key={blog.id}
                              href={route('blog.show', { id: blog.id })}
                              className="text-blue-600 font-medium text-xs md:text-sm lg:text-base flex items-center hover:text-blue-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="hidden sm:inline">Read Article</span>
                              <span className="sm:hidden">Read</span>
                              <i className="fas fa-arrow-right ml-1 md:ml-2 text-xs md:text-sm"></i>
                            </Link>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {filteredBlogs.map(blog => (
                  <div
                    key={blog.id}
                    className="group bg-white rounded-xl md:rounded-2xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-lg md:hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row"
                    onClick={() => handleBlogClick(blog.slug)}
                  >
                    <div className="md:w-2/5 lg:w-1/3 relative h-40 sm:h-48 md:h-auto">
                      <img
                        src={blog.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 md:top-4 md:left-4">
                        <span className="px-2 md:px-3 py-1 md:py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-full shadow-sm">
                          {blog.category || 'Uncategorized'}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent h-8 md:h-12"></div>
                    </div>

                    <div className="md:w-3/5 lg:w-2/3 p-3 md:p-5 lg:p-6 flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2 md:mb-3">
                          <div className="flex items-center text-xs md:text-sm text-gray-500">
                            <i className="fas fa-clock mr-1 md:mr-1.5 text-xs"></i>
                            <span>{blog.readTime || '5 min'}</span>
                            <span className="mx-1 md:mx-2">•</span>
                            <i className="fas fa-calendar mr-1 md:mr-1.5 text-xs"></i>
                            <span>{blog.date || 'N/A'}</span>
                          </div>
                        </div>

                        <h3 className="text-base md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 md:mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {blog.title || 'Untitled'}
                        </h3>

                        <p className="text-gray-600 mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 text-sm md:text-base">
                          {blog.excerpt || blog.summary || 'No description available'}
                        </p>

                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-5">
                            {blog.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 md:px-3 py-0.5 md:py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition-colors"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 md:pt-5 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 md:gap-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-2 md:mr-3">
                              <i className="fas fa-user text-blue-600 text-sm md:text-base"></i>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm md:text-base">
                                {blog.author || 'Admin'}
                              </p>
                              <p className="text-xs text-gray-500 hidden md:block">Author</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end space-x-2 md:space-x-4">
                            <div className="flex items-center space-x-1 md:space-x-3">
                              <button
                                onClick={(e) => handleLike(blog.id, e)}
                                className={`flex items-center transition-colors cursor-pointer ${likedBlogs.has(blog.id) 
                                    ? 'text-red-500' 
                                    : 'text-gray-500 hover:text-red-500'
                                  }`}
                                title={isLoggedIn ? "Like this article" : "Login to like"}
                              >
                                <i className={`fas ${likedBlogs.has(blog.id) ? 'fa-heart' : 'fa-heart'} mr-1 text-xs md:text-sm`}></i>
                                <span className="font-medium text-xs md:text-sm">
                                  {(blog.likes || 0) + (likedBlogs.has(blog.id) ? 1 : 0)}
                                </span>
                              </button>
                              <button
                                onClick={(e) => handleComment(blog.id, blog.title, e)}
                                className="flex items-center text-gray-500 hover:text-blue-500 transition-colors cursor-pointer"
                                title={isLoggedIn ? "Comment on this article" : "Login to comment"}
                              >
                                <i className="fas fa-comment mr-1 text-xs md:text-sm"></i>
                                <span className="font-medium text-xs md:text-sm">
                                  {blog.comments || 0}
                                </span>
                              </button>
                            </div>
                            
                            <Link
                              key={blog.id}
                              href={route('blog.show', { id: blog.id })}
                              className="text-blue-600 font-medium text-xs md:text-sm lg:text-base flex items-center hover:text-blue-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="hidden sm:inline">Read Article</span>
                              <span className="sm:hidden">Read</span>
                              <i className="fas fa-arrow-right ml-1 md:ml-2 text-xs md:text-sm"></i>
                            </Link>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {hasMore && filteredBlogs.length > 0 && (
          <div className="text-center mt-6 md:mt-10">
            <button
              onClick={loadMoreArticles}
              disabled={isLoadingMore}
              className="px-6 md:px-8 py-2.5 md:py-3.5 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg md:rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow inline-flex items-center text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoadingMore ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-1.5 md:mr-2 text-xs md:text-sm"></i>
                  Loading...
                </>
              ) : (
                <>
                  <i className="fas fa-plus mr-1.5 md:mr-2 text-xs md:text-sm"></i>
                  Load More Articles
                </>
              )}
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Improve touch targets on mobile */
        @media (max-width: 768px) {
          button, input, [role="button"] {
            font-size: 16px; /* Prevents iOS zoom on focus */
          }
          
          .line-clamp-2 {
            -webkit-line-clamp: 2;
          }
          .line-clamp-3 {
            -webkit-line-clamp: 2;
          }
        }
        
        /* Responsive image loading */
        img {
          content-visibility: auto;
        }
        
        /* Scrollbar styling for category filters */
        .overflow-x-auto::-webkit-scrollbar {
          height: 3px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default function Blog() {
  return (
    <AppLayout>
       <Head>
                <title>Blog - Triumph Residential Services</title>
                <meta 
                    name="description" 
                    content="Read the latest updates, tips, and insights about residential living, property management, and real estate trends from Triumph Residential Services." 
                />
                <meta name="keywords" content="Los Angeles, CA Apartment Homes, Apartment Homes in Los Angeles, Los Angeles Apartment Homes, Da Vinci 
                Triumph Residential Services, real estate blog, property management, apartment tips, residential services, Los Angeles apartments" />

                {/* Open Graph Tags */}
                <meta property="og:title" content="Blog - Triumph Residential Services" />
                <meta property="og:description" content="Stay updated with Triumph Residential Services' blog featuring insights, tips, and news on residential living and property management." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.triumphresidential.com/blog" />
                <meta property="og:image" content="https://www.triumphresidential.com/og-blog.jpg" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Blog - Triumph Residential Services" />
                <meta name="twitter:description" content="Stay updated with Triumph Residential Services' blog featuring insights, tips, and news on residential living and property management." />
                <meta name="twitter:image" content="https://www.triumphresidential.com/og-blog.jpg" />
            </Head>
      <BlogSearch />
    </AppLayout>
  );
}
