import ActiveMealsSection from "./DonorActiveMealsSection"
import StatsSection from "./DonorStatsSection"
import Header from "./DonorHeader"

function DonorLandingPage(){
    return(
        <>
        <Header />
        <div className="px-4 mt-25">
          <StatsSection />
          <ActiveMealsSection
            title={"Your Active Meals"}
            color={"text-green-800"}
            status={'Active'}
          />
        </div>
        </>
          
    )
}

export default DonorLandingPage