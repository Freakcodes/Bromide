import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; // ShadCN Input Component
import { Button } from "@/components/ui/button"; // ShadCN Button Component
import { useMutation } from "@tanstack/react-query";
import axios from "axios"; // Axios for API requests
import { useAuth } from "@/AuthContext"; // Assuming the useAuth hook is implemented
import { useNavigate } from "react-router-dom";

// Function to send login data to the backend

const loginUser = async ({ username, password }) => {
    
  const response = await axios.post("https://bromine.vercel.app/api/auth/login/", {
    username,
    password, 
  });
  
  return response.data; // Assuming the response contains the user data or token
};

const Login = () => {
 
   // Get login function from AuthContext
   const { login } = useAuth();  
   const navigate=useNavigate();   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Use mutation to handle the login API call
  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser, // The function to call the API
    onSuccess: (data) => {
      // Store the user or token, or handle success as needed
      console.log("Login Successful:", data);
       
      // Optionally call the context's login function
      
      login(data);
      navigate("/");

    },
    onError: (err) => {
      console.error("Login Error:", err);
      // Optionally handle the error (show error message to user)
    },
  });
  console.log(isPending);

  // onSubmit function to handle form submission
  const onSubmit = (data) => {
    mutate(data); // Trigger the mutation to send data to the backend
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username Field */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          {...register("username", { required: "Username is required" })}
          className="mt-1"
        />
        {errors.username && (
          <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
          className="mt-1"
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" className="w-full" >
        
        {console.log(isPending)}
        {isPending ? "Logging in..." : "Login"}
      </Button>

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-600 mt-2">
          {error.message || "Login failed. Please try again."}
        </p>
      )}
    </form>
  );
};

export default Login;
