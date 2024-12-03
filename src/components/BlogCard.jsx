import stripHtmlTags from "@/utils/stripHtml";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ username, title, content, createdAt, slug }) => {
  return (
    <div
      className="p-6 bg-secondary rounded-lg shadow-lg border border-gray-200 dark:border-gray-800"
      to={`/blogs/${slug}`}
    >
      <Link className="flex items-center mb-4" to={`/profile/${username}`}>
        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {username.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4" to={`/profile/${username}`}>
          <h4 className="text-lg font-semibold">{username}</h4>
          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </Link>
      <h2 className="text-xl font-bold text-primary mb-2">{title}</h2>
      <p className="text-gray-600 line-clamp-3">{stripHtmlTags(content)}</p>
    </div>
  );
};

export default BlogCard;
