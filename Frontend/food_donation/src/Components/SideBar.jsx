import React, { useState } from "react";
import dash_pic from "/src/assets/images/dashboard.png";
import user_icon from "/src/assets/images/user.png";
import logo from "/src/assets/images/logo.jpg";
// Import FontAwesome icons CSS
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 border-[1px] border-r-gray-200 h-screen w-[20%] bg-green-800 flex flex-col justify-around shadow-[4px_0px_12px_0px_rgba(0,0,0,0.3)] text-white">
      {/* Logo Section */}
      <div className="mb-2">
        <img
          className="w-80 h-20 rounded-full cursor-pointer "
          src={logo}
          alt="Logo"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        <ul className="space-y-2">
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-tachometer text-lg"></i>{" "}
              {/* Changed to fa-tachometer */}
              <a href="#" className="text-[1.1rem]">
                Dashboard
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-rss text-lg"></i>
              <a href="#" className="text-[1.1rem]">
                General Feed
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-cutlery text-lg"></i>{" "}
              {/* Changed to fa-cutlery */}
              <a href="#" className="text-[1.1rem]">
                Active Meals
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-check-circle text-lg"></i>
              <a href="#" className="text-[1.1rem]">
                Granted Meals
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
              <i className="fa fa-user text-lg"></i>
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
          className="block w-full text-center px-4 py-2 bg-white text-green-800 font-bold text-lg rounded-lg   transition-colors"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default DonorSidebar;









