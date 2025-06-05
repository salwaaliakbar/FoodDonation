import DonorSidebar from "./DonorSidebar";
import { Outlet } from "react-router-dom";
import React from "react";

const DonorDashboard = React.memo(() => {
  console.log("donor dashboard rerender");
  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      <DonorSidebar />
      <div className="w-full md:w-[80%] md:absolute md:right-0 bg-gray-200 min-h-screen md:mb-8">
        <Outlet />
      </div>
    </div>
  );
});

export default DonorDashboard;
