import { ACTIVE, GRANTED, EXPIRED } from "../../Components/CONSTANTS";
import Header from "../../Components/Header";
import ActiveMealsSection from "./DonorActiveMealsSection";

function DonationHistory() {
  return (
    <div className="flex overflow-hidden bg-gray-200">
      {/* Main Content Area */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out 
        `}
      >
        {/* Top Header */}
        <Header />

        {/* Donation sections */}
        <div className="flex-1 overflow-y-auto px-4 py-4 mt-18 md:mb-8">
          {/* Active Meals */}
          <ActiveMealsSection
            title={"Your Active Meals"}
            color={"text-yellow-600"}
            bg={"bg-yellow-100"}
            status={ACTIVE}
          />

          {/* Granted Meals */}
          <ActiveMealsSection
            title={"Your Granted Meals"}
            color={"text-green-800"}
            bg={"bg-[#AFE1AF]"}
            status={GRANTED}
          />

          {/* Expired / Blacklisted Meals */}
          <ActiveMealsSection
            title={"Your BlackList Meals"}
            color={"text-red-800"}
            bg={"bg-red-200"}
            status={EXPIRED}
          />
        </div>
      </div>
    </div>
  );
}

export default DonationHistory;
