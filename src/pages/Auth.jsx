import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Login from "@/components/Login";
import { Link } from "react-router-dom";
const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>

      <Login/>
      <div className="mt-7">
        <p>Don't have an account?<Link to={'https://bromine.vercel.app/accounts/login/' } className="text-blue-500 ml-2">sign up</Link></p>
      </div>
      </div>
      
    </div>
  );
};

export default AuthPage;
