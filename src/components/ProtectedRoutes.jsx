import React, { useEffect } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";



const ProtectedRoute = ({ children }) => {
    
  const { isAuthenticated,setIsAuthenticated } = useAuth();
    

  if (localStorage.getItem('key')==null) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" />;
  }


  return children;
};
// function Protected({children}){
//   const navigate=useNavigate();

//   const {isAuthenticated}=useAuth();
//   useEffect(()=>{
//       if(!isAuthenticated )navigate("/auth");

//   },[isAuthenticated,loading]);
//   if(loading) return <BarLoader width={"100%"} color="#36d7b7"/>;

//   if(isAuthenticated) return children;
// }

export default ProtectedRoute;
