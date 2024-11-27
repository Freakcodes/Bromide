import React from "react";
import brocode from "../assets/brocode.jpg";
import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button"

const LandingPage = () => {
  return (
    // Hero section
    <div>
      <div className="hero section">
        <div className="main-header">
          <h1 className="text-7xl font-semibold  font-mono flex justify-center mt-8">
            Hi, This is Bromide!
          </h1>
          <h3 className="text-4xl font-medium font-sans flex justify-center mt-2">
            The OpenSource blog brewing Platform for Devs.
          </h3>
        </div>
      </div>
      <div className="card flex ml-[400px]  w-[50%] mt-10 justify-around">
        <div className="broCode-card flex flex-col items-center gap-2">
          <div className="">
            <img src={brocode} alt="" className=" " width={200} />
          </div>
          <div>
            <Button variant="destructive">Join BroCode</Button>

          </div>
        </div>
        <div className="broCode-card flex flex-col items-center gap-2">
          <div className="">
            <img src={logo} alt="" className=" " width={200} />
          </div>
          <div>
            <Button variant="outline" className="bg-[#bf733c] text-white  hover:bg-[#d58750] hover:text-white">Register for  Bromide</Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
