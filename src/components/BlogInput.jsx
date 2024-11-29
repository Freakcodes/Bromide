import React, { useState } from "react";
import ReactQuill from "react-quill"; // Quill for rich text editing
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Button } from "@/components/ui/button"; // ShadCN Button
import Checkbox from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const createBlog = async ({
  title,
  content,
  public: isPublic = false,
  token,
}) => {
  const response = await axios.post(
    "https://bromine.vercel.app/api/create/blog/",
    { title, content, public: isPublic }, // Adjust `public` if necessary
    {
      headers: {
        Authorization: `Token ${token}`, // Include the user's token
        "Content-Type": "application/json",
      },
    },
  );
  return response.data;
};

const BlogInput = () => {
  const [content, setContent] = useState(""); // State to store HTML content
  const [title, setTitle] = useState(""); // State to store the title
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve the token from local storage
  const token = localStorage.getItem("key");

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => createBlog({ ...data, token }), // Pass token along with data
    onSuccess: (data) => {
      console.log("Blog Published:", data);
      setSuccessMessage("Blog published successfully!");
      setTitle(""); // Clear the title
      setContent(""); // Clear the content
    },
    onError: (error) => {
      console.error("Error publishing blog:", error);
      setErrorMessage("Failed to publish the blog. Please try again.");
    },
  });

  // // Custom handler to delete images
  // const handleImageDelete = () => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(content, "text/html");

  //   // Remove all images from the editor content
  //   const images = doc.querySelectorAll("img");
  //   images.forEach((img) => img.remove());

  //   // Update the editor content without images
  //   setContent(doc.body.innerHTML);
  // };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    if (!content.trim()) {
      alert("Content cannot be empty!");
      return;
    }

    // Trigger the mutation to publish the blog
    mutate({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success and Error Messages */}
      {successMessage && (
        <p className="text-green-600 font-semibold">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-600 font-semibold">{errorMessage}</p>
      )}

      {/* Title Input */}
      <div>
        <label
          htmlFor="title"
          className={`block text-sm font-medium text-gray-700`}
        >
          Blog Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
          disabled={isLoading}
        />
      </div>

      {/* Rich Text Editor for Blog Content */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Blog Content
        </label>
        <ReactQuill
          id="content"
          value={content}
          onChange={setContent}
          placeholder="Write your blog here..."
          className="mt-1"
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, false] }], // Header dropdown
              ["bold", "italic", "underline", "strike"], // Formatting buttons
              [{ list: "ordered" }, { list: "bullet" }], // Lists
              [{ align: [] }], // Alignment
              ["link", "image"], // Add links and images
              ["clean"], // Remove formatting
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "align",
            "link",
            "image",
          ]}
          readOnly={isLoading}
        />
      </div>

      {/* Image Delete Button */}
      {/* <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleImageDelete}
          className="bg-red-600 hover:bg-red-700 text-white"
          disabled={isLoading}
        >
          Remove All Images
        </Button> */}
      {/* </div> */}

      {/* Submit Button */}
      <div className="flex text-center justify-center gap-2">
        <Checkbox a="Private" b=" Public" />
        <Button
          type="submit"
          className="w-full text-center justify-center py-6"
          disabled={isLoading}
        >
          {isLoading ? "Publishing..." : "Publish Blog"}
        </Button>
      </div>
    </form>
  );
};

export default BlogInput;
