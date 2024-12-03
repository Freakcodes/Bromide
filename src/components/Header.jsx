import React from "react";
import logo from "../assets/logo.png";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <Link to="/" className="heading flex items-center ">
          <div>
            <img src={logo} alt="test tube" width={80} />
          </div>
          <h1 className="text-3xl font-semibold ">Bromide</h1>
        </Link>
        <div>
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Header;
