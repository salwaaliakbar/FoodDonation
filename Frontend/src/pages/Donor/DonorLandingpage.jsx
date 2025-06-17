import ActiveMealsSection from "./DonorActiveMealsSection"
import StatsSection from "./DonorStatsSection"
import Header from "./DonorHeader"
import { ACTIVE } from "../../Components/CONSTANTS"

function DonorLandingPage(){
    return(
        <>
        <Header />
        <div className="px-4 mt-25">
          <StatsSection />
          <ActiveMealsSection
            title={"Your Active Meals"}
            color={"text-green-800"}
            status={ACTIVE}
          />
        </div>
        </>
          
    )
}

export default DonorLandingPage