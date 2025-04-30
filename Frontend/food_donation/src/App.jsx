import Recipent_Dashboard from "./Components/Recipent_Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Components/Landingpage";
import DonorDashboard from "./Components/Donor/DonorDashboard";
import About from "./Components/About";
import CreateCampaign from "./Components/Donor/CreateCampaign";
import DonorProfile from './Components/Donor/DonorProfile'

function App() {
  return (
    <>
      {/* <Recipent_Dashboard/> */}
      {/* <DonorDashboard/> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<DonorDashboard />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/campaign" element={<CreateCampaign/>}/>
          <Route path="/profile" element={<DonorProfile/>}/>
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/recepeinetDashBoard" element={<Recipent_Dashboard/>}/>
          <Route path="/donorDashBoard" element={<DonorDashboard />} />
          <Route path="/donorDashBoard/campaign" element={<CreateCampaign/>}/>
          <Route path="/donorDashBoard/profile" element={<DonorProfile/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
