import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionInitializer from "./Components/SessionInitializer";
import ScrollToTop from './Components/ScrollToTop'
import LandingPage from "./pages/LandingPage/Landingpage";
import About from "./pages/AboutSection/About";
import Services from "./pages/ServicesSection/Services";
import ContactUs from "./pages/ContactUs/ContactUs";
import ResetPassword from "./Components/ResetPassword";
import DonorDashboard from "./Components/Donor/DonorDashboard";
import DonorLandingPage from "./Components/Donor/DonorLandingpage";
import CreateCampaign from "./Components/Donor/CreateCampaign";
import DonorGeneralFeed from "./Components/Donor/DonorGeneralFeed";
import DonorProfile from './Components/Donor/DonorProfile'
import DonationHistory from "./Components/Donor/DonationHistory";
import Recipent_Dashboard from "./Components/Recipent/Recipent_Dashboard";
import Myprofile from "./Components/Donor/DonorProfile";
import GeneralFeed from "./Components/Recipent/GeneralFeed";
import GrantedMeals from "./Components/Recipent/GrantedMeals";
import ActiveMeals from "./Components/Recipent/ActiveMeals";
import NotFound from "./pages/notFound/NotFound";

function App() {
  console.log("app re-render");
  return (
    <>
     <SessionInitializer/>
      <ScrollToTop/>
      <ToastContainer/>
      <Routes>
        {/* static routes/ home page routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />

        {/* Donor Routes */}
        <Route path="/donorDashBoard" element={<DonorDashboard />}>
          <Route index element={<DonorLandingPage />} />
          <Route path="createCampaign" element={<CreateCampaign />} />
          <Route path="generalfeed" element={<DonorGeneralFeed />} />
          <Route path="profile" element={<DonorProfile />} />
          <Route path="history" element={<DonationHistory />} />
        </Route>

        {/* Recipent Routes */}
        <Route path="/recipent" element={<Recipent_Dashboard />} />
        <Route path="/recipent/profile" element={<Myprofile />} />
        <Route path="/generalfeed" element={<GeneralFeed />} />
        <Route path="/granted" element={<GrantedMeals />} />
        <Route path="/active" element={<ActiveMeals />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
