import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN card components
import { Button } from "@/components/ui/button"; // ShadCN button
import { Avatar } from "@/components/ui/avatar"; // ShadCN avatar
import { Badge } from "@/components/ui/badge"; // ShadCN badge
import { Separator } from "@/components/ui/separator"; // ShadCN separator
import { useParams,Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const UserProfile = ({ profileData }) => {
  const { pfp, bio, gender, user, posts } = profileData;
  console.log(pfp);
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Profile Section */}
      <Card className="shadow-lg border">
        <CardHeader>
          <div className="flex items-center gap-4">
            <img className="w-24 h-24" src={pfp} alt={`${user.username}'s avatar`} />
            <div>
              <CardTitle className="text-2xl font-bold">{`${user.first_name} ${user.last_name}`}</CardTitle>
              <p className="text-sm text-gray-600">@{user.username}</p>
              <Badge variant="outline" className="mt-2">{gender === "M" ? "Male" : "Female"}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-800 text-sm">{bio}</p>
          <Separator className="my-4" />
          
        </CardContent>
      </Card>

      {/* Posts Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">Posts by {user.first_name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.posts.map((post) => (
            <Card key={post.uuid} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                <p className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <div
                  className="text-sm text-gray-700 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                <Link to={`/blogs/${post.slug}`}>
                <Button
                  variant="link"
                  className="mt-4 text-sm font-medium text-indigo-600"
                  
                >
                  Read more →
                </Button>
                </Link>
               
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
