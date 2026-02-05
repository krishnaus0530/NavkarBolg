import { useState, useRef, useEffect } from "react";
import { router, usePage } from '@inertiajs/react';
    import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function CommentBox({ postId }) {
    const { props } = usePage();
    const { auth, comments: serverComments = [] } = props;

    const user = auth?.user;
    const userId = user?.id;

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const textareaRef = useRef(null);

    dayjs.extend(relativeTime);

    // Auto resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
        fetchComments();
    }, [comment]);

     useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
    try {
        const response = await fetch(`/comments/${postId}`);
        const data = await response.json();
        setComments(data.comments);
    } catch (err) {
        console.error("Failed to fetch comments", err);
    }
};

const submitComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
        setError("Comment cannot be empty");
        return;
    }

    setLoading(true);
    setError("");
    try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const response = await fetch("/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken, 
                },
                body: JSON.stringify({
                    post_id: postId,
                    comment: comment.trim(),
                }),
            });

        const data = await response.json();

        if (data.status === "success") {
            setComment("");
            fetchComments(); 
        } else {
            setError("Failed to post comment");
        }
    } catch (err) {
        console.error(err);
        setError("Failed to post comment");
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="mt-8 flex flex-col items-center">
            {/* {postId} */}
            {/* COMMENT FORM */}
            {user ? (
                <form onSubmit={submitComment} className="w-full max-w-2xl space-y-2">
                    <textarea
                        ref={textareaRef}
                        className="w-full border rounded-lg p-2"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={loading}
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                        {loading ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            ) : (
                <a href="/login" className="text-blue-600">Login to comment</a>
            )}

            {/* COMMENTS LIST */}
            <div className="mt-6 w-full max-w-2xl max-h-[50vh] overflow-y-auto">
                {comments.length > 0 ? (
                    <div className="space-y-4">
                        {comments.map(c => (
                            <div
                                key={c.id}
                                className="flex flex-col md:flex-row md:items-start md:space-x-4 border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
                            >
                                {/* User avatar placeholder */}
                                <div className="flex-shrink-0 mb-2 md:mb-0">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold">
                                        {c.user_name[0].toUpperCase()}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-gray-800">{c.user_name}</span>
                                        <span className="text-xs text-gray-500">
                                            {dayjs(c.created_at).fromNow()} 
                                            {/* /{c.created_at} */}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-gray-700">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    
                    <div className="text-center py-8 border rounded bg-gray-50">
                        <h4 className="text-lg font-semibold">
                            No comments yet
                        </h4>
                        <p className="text-gray-600">
                            Be the first to share your thoughts!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// import { useState, useRef, useEffect } from "react";
// import axios from 'axios'; // Install axios: npm install axios

// export default function CommentBox({ blogId, isLoggedIn }) {
//     const [comment, setComment] = useState("");
//     const [comments, setComments] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [fetching, setFetching] = useState(false);
//     const [error, setError] = useState("");

//     const textareaRef = useRef(null);

//     // Fetch comments when blogId changes
//     useEffect(() => {
//         if (blogId) {
//             fetchComments();
//         }
//     }, [blogId]);

//     // Auto resize textarea
//     useEffect(() => {
//         if (textareaRef.current) {
//             textareaRef.current.style.height = "auto";
//             textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
//         }
//     }, [comment]);

//     // Fetch comments using Axios
//     const fetchComments = async () => {
//         setFetching(true);
//         try {
//             const response = await axios.get(`/api/comments/${blogId}`);
//             setComments(response.data.comments || []);
//         } catch (error) {
//             console.error('Error fetching comments:', error);
//             setError("Failed to load comments");
//         } finally {
//             setFetching(false);
//         }
//     };

//     // Submit comment using Axios
//     const submitComment = async (e) => {
//         e.preventDefault();

//         if (!isLoggedIn) {
//             setError("Please login to comment");
//             return;
//         }

//         if (!comment.trim()) {
//             setError("Comment cannot be empty");
//             return;
//         }

//         setLoading(true);
//         setError("");

//         try {
//             const response = await axios.post('/api/comment', {
//                 blog_id: blogId,
//                 comment: comment.trim(),
//             });

//             // Add new comment to the list
//             const newComment = {
//                 id: response.data.comment.id,
//                 comment: response.data.comment.comment,
//                 blog_id: blogId,
//                 parent_id: null,
//                 created_at: response.data.comment.created_at,
//                 user_id: response.data.comment.user_id,
//                 user_name: 'You' // Or get from response
//             };

//             setComments(prev => [newComment, ...prev]);
//             setComment("");
//         } catch (error) {
//             console.error('Error posting comment:', error);
//             setError(error.response?.data?.message || "Failed to post comment");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="w-full">
//             {/* COMMENT FORM */}
//             {isLoggedIn ? (
//                 <form onSubmit={submitComment} className="w-full space-y-3">
//                     <div className="flex items-start space-x-3">
//                         <div className="flex-shrink-0">
//                             <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
//                                 <i className="fas fa-user text-blue-600"></i>
//                             </div>
//                         </div>
//                         <div className="flex-1">
//                             <textarea
//                                 ref={textareaRef}
//                                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500"
//                                 placeholder="Write your comment here..."
//                                 value={comment}
//                                 onChange={(e) => setComment(e.target.value)}
//                                 disabled={loading}
//                                 rows="3"
//                             />
//                             {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//                             <div className="flex justify-end mt-3">
//                                 <button
//                                     type="submit"
//                                     disabled={loading || !comment.trim()}
//                                     className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     {loading ? (
//                                         <>
//                                             <i className="fas fa-spinner fa-spin mr-2"></i>
//                                             Posting...
//                                         </>
//                                     ) : (
//                                         'Post Comment'
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             ) : (
//                 <div className="text-center p-4 bg-gray-50 rounded-lg">
//                     <p className="text-gray-600">Please login to comment</p>
//                     <a href="/login" className="text-blue-600 hover:underline mt-1 inline-block">
//                         Login
//                     </a>
//                 </div>
//             )}

//             {/* COMMENTS LIST */}
//             <div className="mt-6">
//                 <div className="flex items-center justify-between mb-4">
//                     <h4 className="font-semibold text-gray-900">Comments ({comments.length})</h4>
//                     {fetching && (
//                         <span className="text-sm text-gray-500">
//                             <i className="fas fa-spinner fa-spin mr-1"></i>
//                             Loading...
//                         </span>
//                     )}
//                 </div>
                
//                 {comments.length > 0 ? (
//                     <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                         {comments.map(c => (
//                             <div key={c.id} className="border border-gray-200 p-4 rounded-lg bg-white">
//                                 <div className="flex items-start justify-between">
//                                     <div className="flex items-center">
//                                         <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                                             <i className="fas fa-user text-blue-600 text-sm"></i>
//                                         </div>
//                                         <div>
//                                             <div className="font-semibold text-gray-900">{c.user_name}</div>
//                                             <div className="text-xs text-gray-500">
//                                                 {new Date(c.created_at).toLocaleDateString('en-US', {
//                                                     year: 'numeric',
//                                                     month: 'short',
//                                                     day: 'numeric',
//                                                     hour: '2-digit',
//                                                     minute: '2-digit'
//                                                 })}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <p className="mt-3 text-gray-700 pl-11">{c.comment}</p>
//                             </div>
//                         ))}
//                     </div>
//                 ) : !fetching ? (
//                     <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
//                         <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
//                             <i className="fas fa-comment text-gray-400"></i>
//                         </div>
//                         <h4 className="text-lg font-semibold text-gray-700">
//                             No comments yet
//                         </h4>
//                         <p className="text-gray-500 mt-1">
//                             Be the first to share your thoughts!
//                         </p>
//                     </div>
//                 ) : null}
//             </div>
//         </div>
//     );
// }