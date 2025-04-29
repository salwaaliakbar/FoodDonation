import React from "react";
import dash_pic from "/src/assets/images/dashboard.png";
import user_icon from "/src/assets/images/user.png";
import logo from "../assets/images/logo.jpg";

// Import FontAwesome icons CSS
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";

const DonorSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      navigate("/LandingPage");
    } else {
      alert("Logout cancelled");
    }
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-[20%] bg-white-800 flex flex-col justify-around shadow-[4px_0px_12px_0px_rgba(0,0,0,0.5)] text-black ">
      {/* Logo Section */}
      <div className=" h-20 border-b-[1.5px] border-b-green-700">
        <img
          className="w-120 h-19 rounded-full cursor-pointer "
          src={logo}
          alt="Logo"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        <ul className="space-y-2">
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-home text-lg"></i>{" "}
              {/* Home icon for Dashboard */}
              <a href="#" className="text-[1.1rem]">
                Dashboard
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-newspaper-o text-lg"></i>{" "}
              {/* Newspaper icon for General Feed */}
              <a href="#" className="text-[1.1rem]">
                General Feed
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-history text-lg"></i>{" "}
              {/* History icon for Donation History */}
              <a href="#" className="text-[1.1rem]">
                Donation History
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-bullhorn text-lg"></i>{" "}
              {/* Bullhorn icon for Create Campaigns */}
              <a href="#" className="text-[1.1rem]">
                Create Campaigns
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-user-circle text-lg"></i>{" "}
              {/* User Circle icon for My Profile */}
              <a href="#" className="text-[1.1rem]">
                My Profile
              </a>
            </div>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4">
        <a
          href="#"
          className="block w-full text-center px-4 py-2 bg-green-900 text-white font-bold text-lg rounded-lg   transition-colors"
          onClick={handleLogout}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default DonorSidebar;
