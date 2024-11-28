import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserProfile from "@/components/UserProfile";
import Loader from "@/components/ui/loader";

// Function to fetch user profile data
const fetchUserProfile = async (name) => {
  const response = await axios.get(
    `https://bromine.vercel.app/api/user/${name}/profile`,
  );
  return response.data;
};

const Profile = () => {
  const { name } = useParams();

  // Fetch data using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", name],
    queryFn: () => fetchUserProfile(name),
  });

  // Handle loading state
  if (isLoading) {
    return <Loader />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-lg text-red-600">Failed to load user profile.</p>
        <p className="text-sm text-gray-600">
          {error.message || "Please try again later."}
        </p>
      </div>
    );
  }

  // Render user profile
  return <div>{data && <UserProfile profileData={data} />}</div>;
};

export default Profile;
