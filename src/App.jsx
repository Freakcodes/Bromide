import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom'
import Layout from './layout/Layout'
import LandingPage from './pages/LandingPage'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import AllBlogs from './pages/AllBlogs'
import { AuthProvider } from './AuthContext'
import AuthPage from './pages/Auth'
import CreatePost from './pages/PublishBlogPage'
import ProtectedRoute from './components/ProtectedRoutes'
import UserBlogs from './pages/UserBlogs'
import Profile from './pages/Profile'
function App() {
  const client=new QueryClient();
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
      <Route path="" element={<LandingPage/>}/>
      <Route path="blogs" element={<AllBlogs/>}/>
      <Route path="auth" element={<AuthPage/>}/>
      <Route
          path="create"
          element={
            <ProtectedRoute>
              <CreatePost/>
            </ProtectedRoute>
          }
        />
      <Route path="blogs/:slug" element={<UserBlogs/>}/>
      <Route path="profile/:name" element={<Profile/>}/>
    </Route>
    )
  )
  return (
    <AuthProvider>
    <QueryClientProvider client={client}>
    <RouterProvider router={router}/>
    </QueryClientProvider>
    </AuthProvider>
    
  )
}

export default App
