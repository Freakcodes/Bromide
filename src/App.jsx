import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./layout/Layout";
import LandingPage from "./pages/LandingPage";
import AllBlogs from "./pages/AllBlogs";
import { AuthProvider } from "./AuthContext";
import AuthPage from "./pages/Auth";
import CreatePost from "./pages/PublishBlogPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import UserBlogs from "./pages/UserBlogs";
import Profile from "./pages/Profile";

function App() {
  // Set the dark or light theme on page load
  useEffect(() => {
    const selectedTheme = localStorage.getItem("theme");

    if (selectedTheme) {
      document.body.classList.add(selectedTheme);
    }
  }, []);

  const client = new QueryClient();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<LandingPage />} />
        <Route path="blogs" element={<AllBlogs />} />
        <Route path="auth" element={<AuthPage />} />
        <Route
          path="create"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route path="blogs/:slug" element={<UserBlogs />} />
        <Route path="profile/:name" element={<Profile />} />
      </Route>
    )
  );
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
