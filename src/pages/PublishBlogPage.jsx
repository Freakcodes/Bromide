import React, { useState } from "react";
import axios from "axios";
import BlogInput from "@/components/BlogInput"; // Assuming BlogInput is already created
import { useAuth } from "@/AuthContext"; // Assuming useAuth for token management
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

// const createBlog = async ({ title, content, token }) => {
//   const response = await axios.post(
//     "https://bromine.vercel.app/api/create/blog/",
//     { title, content, public: true }, // Adjust public: false if necessary
//     {
//       headers: {
//         Authorization: `Token ${token}`, // Include the user's token
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   return response.data;
// };

const PublishBlogPage = () => {
//   const  token  = localStorage.getItem('key'); // Get token from auth context
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const { mutate, isLoading } = useMutation({
//     mutationFn: (data) => createBlog({ ...data, token }), // Pass token along with data
//     onSuccess: (data) => {
//       console.log("Blog Published:", data);
//       setSuccessMessage("Blog published successfully!");
//     },
//     onError: (error) => {
//       console.error("Error publishing blog:", error);
//       setErrorMessage("Failed to publish the blog. Please try again.");
//     },
//   });

//   const handleBlogSubmit = (blogData) => {
//     setSuccessMessage("");
//     setErrorMessage("");
//     mutate(blogData); // Trigger the mutation
//   };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Publish Your Blog</h1>

      {/* Success and Error Messages */}
      {/* {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>} */}

      {/* BlogInput for creating the blog */}
      <BlogInput  />

      {/* Submit Button */}
      {/* <Button onClick={handleBlogSubmit} disabled={isLoading}>
        {isLoading ? "Publishing..." : "Publish Blog"}
      </Button> */}
    </div>
  );
};

export default PublishBlogPage;
