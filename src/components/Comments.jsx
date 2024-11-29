import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";



const fetchComments = async (slug) => {
  const response = await axios.get(`https://bromine.vercel.app/api/blogs/${slug}/comments/`);
  console.log(response.data);
  return response.data;

};

const addComment = async ({ slug, comment }) => {
  const token = localStorage.getItem("key"); // Assuming token is stored in localStorage
  const response = await axios.post(
    `https://bromine.vercel.app/api/blogs/${slug}/comments/`,
    { content: comment },
    {
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const Comments = ({slug}) => {
   // Get the blog slug from URL
  const queryClient = useQueryClient(); // For invalidating and refetching queries
  const [newComment, setNewComment] = useState("");

  // Fetch comments
  const { data: comments, isLoading, error } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => fetchComments(slug),
  });

  // Mutation to add a new comment
  const { mutate, isLoading: isPosting } = useMutation({
    mutationFn: (comment) => addComment({ slug, comment }),
    onSuccess: () => {
      setNewComment(""); // Clear the input field
      queryClient.invalidateQueries(["comments", slug]); // Refetch comments
    },
    onError: (err) => {
      console.error("Failed to post comment:", err);
      alert("Failed to add comment. Please try again.");
    },
  });

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    mutate(newComment);
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Failed to load comments. Please try again later.</p>;

  return (
    <div className="space-y-6">
      {/* Comments List */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800">Comments</h3>
        {comments.length > 0 ? (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="bg-gray-100 p-4 rounded-lg border border-gray-200"
              >
                <p className="text-sm text-gray-700">{comment.text}</p>
                <span className="text-xs text-gray-500">
                  — {comment.user?.username || "Anonymous"}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="space-y-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          rows="4"
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          disabled={isPosting}
        >
          {isPosting ? "Posting..." : "Add Comment"}
        </button>
      </form>
    </div>
  );
};

export default Comments;
