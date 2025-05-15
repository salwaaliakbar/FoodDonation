import React, { useState, useEffect } from "react";
import Header from "./DonorHeader";
import StatsSection from "./DonorStatsSection";
import ActiveMealsSection from "./DonorActiveMealsSection";
import DonorSidebar from "./DonorSidebar";

function DonorDashboard() {
  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      <DonorSidebar />
      <div className="w-full md:w-[80%] md:absolute md:right-0 bg-gray-200 min-h-screen">
        <Header />
        <div className="px-4">
          <StatsSection />
          <ActiveMealsSection
            title={"Your Active Meals"}
            color={"text-green-800"}
            status={'Active'}
          />
          {/* <ActiveMealsSection
            title={"Your Granted Meals"}
            color={"text-green-800"}
            status={'Awarded'}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default DonorDashboard;
