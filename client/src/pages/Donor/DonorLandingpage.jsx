import ActiveMealsSection from "./DonorActiveMealsSection"
import StatsSection from "./DonorStatsSection"
import { ACTIVE } from "../../constants/constants"
import Header from "../../components/Header"

function DonorLandingPage(){
    return(
        <>
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