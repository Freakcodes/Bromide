import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // ShadCN Card
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Skeleton } from "@/components/ui/skeleton"; // ShadCN Skeleton
import Loader from "@/components/ui/loader";

// Fetch user blogs
const fetchUserBlogs = async (slug) => {
  const response = await axios.get(
    `https://bromine.vercel.app/api/blogs/${slug}`,
  );
  return response.data; // Assuming the backend returns blogs array
};

const UserBlogs = () => {
  const { slug } = useParams(); // Get userId from URL params

  const { data, isLoading, error } = useQuery({
    queryKey: ["userBlogs", slug],
    queryFn: () => fetchUserBlogs(slug),
  });
  console.log(data);

  if (isLoading) {
    return (
      <Loader />
      /*
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
      */
    );
  }
  const { title, content, author_username, created_at } = data;
  if (error) {
    return (
      <div className="text-red-600 text-center">
        <p>Failed to load blogs. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 lg:px-20">
      <Card className="shadow-lg">
        <CardHeader>
          <h1 className="text-4xl font-bold text-center mb-6">{title}</h1>
          <Link to={`/profile/${author_username}`}>
            <p className="text-center text-gray-600 mb-4">
              By {author_username}
            </p>
          </Link>
          <p className="text-center text-gray-600 mb-4">
            {" "}
            {created_at.substring(0, 10)}
          </p>
        </CardHeader>
        <CardContent className="prose lg:prose-lg max-w-none">
          {/* Render the HTML content */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBlogs;
