import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Login from "@/components/Login";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome</h1>

        <Tabs defaultValue="login" className="w-full">
          {/* Tabs List */}
          <TabsList className="flex justify-center">
            <TabsTrigger value="login" className="mx-2">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="mx-2">
              Signup
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
           <Login/>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Enter your email" className="mt-1" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                Signup
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;
