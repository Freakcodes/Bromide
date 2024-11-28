import React, { useState } from "react";
import ReactQuill from "react-quill"; // Quill for rich text editing
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Button } from "@/components/ui/button"; // ShadCN Button

const BlogInput = () => {
  const [content, setContent] = useState(""); // State to store HTML content
  const [title, setTitle] = useState(""); // State to store the title

  // Custom handler to delete images
  const handleImageDelete = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Remove all images from the editor content
    const images = doc.querySelectorAll("img");
    images.forEach((img) => img.remove());

    // Update the editor content without images
    setContent(doc.body.innerHTML);
  };

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

    // Pass the blog data (title + content in HTML format) to the parent
    console.log(content);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Blog Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Rich Text Editor for Blog Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
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
        />
      </div>

      {/* Image Delete Button */}
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={handleImageDelete}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Remove All Images
        </Button>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full">
        Publish Blog
      </Button>
    </form>
  );
};

export default BlogInput;
