import ActiveMealsSection from "./DonorActiveMealsSection";
import DonorSidebar from "./DonorSidebar";
import Header from "./DonorHeader";

function DonationHistory() {
  return (
    <div className="flex">
      <DonorSidebar />
      <div className="w-[80%] absolute right-0 bg-gray-200">
        <Header />
        <div className="px-4">
          <ActiveMealsSection
            title={"Active Meals"}
            color={'text-yellow-500'}
            bg={'bg-yellow-100'}
            status={'Active'}
          />
          <ActiveMealsSection
            title={"Granted Meals"}
            color={'text-green-800'}
            bg={'bg-[#AFE1AF]'}
            status={'Awarded'}
          />
          <ActiveMealsSection
            title={"BlackList Meals"}
            color={'text-red-800'}
            bg={'bg-red-200'}
            status={'Expired'}
          />
        </div>
      </div>
    </div>
  );
}
export default DonationHistory;
