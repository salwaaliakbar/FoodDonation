import ActiveMealsSection from "./DonorActiveMealsSection";
import Header from "./DonorHeader";

function DonationHistory() {
  return (
    <div className="flex overflow-hidden bg-gray-200">
      {/* Sidebar */}
      {/* <DonorSidebar /> */}

      {/* Main Content Area */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out 
        `}
      >
        <Header />
        <div className="flex-1 overflow-y-auto px-4 py-4 mt-18 md:mb-8">
          <ActiveMealsSection
            title={"Your Active Meals"}
            color={"text-yellow-600"}
            bg={"bg-yellow-100"}
            status={"Active"}
          />
          <ActiveMealsSection
            title={"Your Granted Meals"}
            color={"text-green-800"}
            bg={"bg-[#AFE1AF]"}
            status={"Awarded"}
          />
          <ActiveMealsSection
            title={"Your BlackList Meals"}
            color={"text-red-800"}
            bg={"bg-red-200"}
            status={"Expired"}
          />
        </div>
      </div>
    </div>
  );
}

export default DonationHistory;
