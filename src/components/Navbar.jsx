import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "@/AuthContext";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="navbar mr-3">
      <div className="flex gap-7 items-center">
        <div>
          <Link>Home</Link>
        </div>
        <div>
          <Link to={"https://brocode-tech.netlify.app/"}>BroCode</Link>
        </div>
        <div>
          <Link to="/blogs">All Blogs</Link>
        </div>
        <div>
          {isAuthenticated ? (
            <Link onClick={handleLogout}>Logout</Link>
          ) : (
            <Link to="/auth">Login</Link>
          )}
        </div>
        {isAuthenticated && <Link to="create">Create Blog</Link>}
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Navbar;
