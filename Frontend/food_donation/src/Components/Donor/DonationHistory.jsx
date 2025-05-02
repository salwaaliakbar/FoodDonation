import ActiveMealsSection from "./DonorActiveMealsSection";
import { useState } from "react";
import { useData } from "../ContextAPIs/UserContext";
import DonorSidebar from "./DonorSidebar";
import Header from "./DonorHeader";

function DonationHistory() {
    const {user, setUser} = useData()
    const firstLetter = user.fullname ? user.fullname.charAt(0).toUpperCase() : "U";
  const [activeMeals, setActiveMeals] = useState([
    {
      userPhoto: firstLetter,
      userName: "Ali Khan",
      mealTitle: "Lunch Pack",
      mealCount: 3,
      appliedOn: "20 Apr 2025",
      totalApplicants: 5,
      description: "Freshly cooked rice and curry for lunch.",
      location: "Sector 11, Karachi",
      postedOn: "19 Apr 2025",
    },
    {
      userPhoto: firstLetter,
      userName: "Fatima Noor",
      mealTitle: "Dinner Boxes",
      mealCount: 4,
      appliedOn: "21 Apr 2025",
      totalApplicants: 3,
      description: "Home-cooked meat and bread packs.",
      location: "Gulshan Block 5",
      postedOn: "20 Apr 2025",
    },
  ]);

  const [grantedMeals, setGrantedMeals] = useState([
    {
      userPhoto: firstLetter,
      userName: "Ali Khan",
      mealTitle: "Lunch Pack",
      mealCount: 3,
      appliedOn: "20 Apr 2025",
      totalApplicants: 5,
      description: "Freshly cooked rice and curry for lunch.",
      location: "Sector 11, Karachi",
      postedOn: "19 Apr 2025",
      granted: "20 Apr 2025",
    },
    {
      userPhoto: firstLetter,
      userName: "Fatima Noor",
      mealTitle: "Dinner Boxes",
      mealCount: 4,
      appliedOn: "21 Apr 2025",
      totalApplicants: 3,
      description: "Home-cooked meat and bread packs.",
      location: "Gulshan Block 5",
      postedOn: "20 Apr 2025",
      granted: "20 Apr 2025",
    },
  ]);
  const [blacklistMeals, setBlacklistMeals] = useState([
    {
      userPhoto: firstLetter,
      userName: "Ali Khan",
      mealTitle: "Lunch Pack",
      mealCount: 3,
      appliedOn: "20 Apr 2025",
      totalApplicants: 5,
      description: "Freshly cooked rice and curry for lunch.",
      location: "Sector 11, Karachi",
      postedOn: "19 Apr 2025",
      granted: "20 Apr 2025",
    },
    {
      userPhoto: firstLetter,
      userName: "Fatima Noor",
      mealTitle: "Dinner Boxes",
      mealCount: 4,
      appliedOn: "21 Apr 2025",
      totalApplicants: 3,
      description: "Home-cooked meat and bread packs.",
      location: "Gulshan Block 5",
      postedOn: "20 Apr 2025",
      granted: "20 Apr 2025",
    },
  ]);
  return (
    <div className="flex">
      <DonorSidebar />
      <div className="w-[80%] absolute right-0 bg-gray-200">
        <Header />
        <div className="px-4">
          <ActiveMealsSection
            activeMeals={activeMeals}
            title={"Active Meals"}
          />
          <ActiveMealsSection
            activeMeals={grantedMeals}
            title={"Granted Meals"}
          />
          <ActiveMealsSection
            activeMeals={blacklistMeals}
            title={"BlackList Meals"}
          />
        </div>
      </div>
    </div>
  );
}
export default DonationHistory;
