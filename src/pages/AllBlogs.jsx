import React from "react";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/BlogCard";
import Loader from "@/components/ui/loader";
const AllBlogs = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["allBlogs"],
    queryFn: () =>
      fetch("https://bromine.vercel.app/api/blogs/").then((res) => res.json()),
  });
  console.log(data);
  if (isLoading) return <Loader />;

  return (
    <div>
      {/* Blog Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">All Blogs</h1>
          <p className="text-center text-sm text-gray-200 mt-2">
            Explore the latest articles from our community
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((post, index) => (
            <BlogCard
              key={index}
              username={post.author_username}
              title={post.title}
              content={post.content}
              createdAt={post.created_at}
              slug={post.slug}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllBlogs;
