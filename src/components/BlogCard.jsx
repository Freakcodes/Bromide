import stripHtmlTags from "@/utils/stripHtml";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ username, title, content, createdAt,slug }) => {
  return (
    <Link className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200" to={`/blogs/${slug}`}>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold">{username}</h4>
          <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 line-clamp-3">{stripHtmlTags  (content)}</p>
    </Link>
  );
};

export default BlogCard;
