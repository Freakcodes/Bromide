import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext();

// Create AuthProvider Component
export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null); // Store user info (e.g., username, email)
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status
   
  // Simulate login function
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('key',userData.key);
  };
  useEffect(()=>{
    if(localStorage.getItem('key')!=null){
         console.log(localStorage.getItem('key'));
        setIsAuthenticated(true);
    }
  },[])
  // Simulate logout function
  const  logout = async() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('key');
    const data= await axios.post(" https://bromine.vercel.app/api/auth/logout/");
    // console.log(data);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for consuming AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
