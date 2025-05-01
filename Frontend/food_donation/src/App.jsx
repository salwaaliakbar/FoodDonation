import Recipent_Dashboard from "./Components/Recipent/Recipent_Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/Landingpage";
import DonorDashboard from "./Components/Donor/DonorDashboard";
import About from "./Components/About";
import CreateCampaign from "./Components/Donor/CreateCampaign";
import DonorProfile from './Components/Donor/DonorProfile'
import Myprofile from "./Components/Recipent/Myprofile";
import GeneralFeed from "./Components/GeneralFeed";
import GrantedMeals from "./Components/Recipent/GrantedMeals";
import ActiveMeals from "./Components/Recipent/ActiveMeals";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipent" element={<Recipent_Dashboard />} />
          <Route path="/recipent/profile" element={<Myprofile />} />
          <Route path="/generalfeed" element={<GeneralFeed />} />
          <Route path="/granted" element={<GrantedMeals />} />
          <Route path="/active" element={<ActiveMeals />} />
          <Route path="/donorDashBoard" element={<DonorDashboard />} />
          <Route path="/donorDashBoard/campaign" element={<CreateCampaign />} />
          <Route path="/donorDashBoard/profile" element={<DonorProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
