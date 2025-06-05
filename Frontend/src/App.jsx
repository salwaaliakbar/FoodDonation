import { Route, Routes } from "react-router-dom";
import Recipent_Dashboard from "./Components/Recipent/Recipent_Dashboard";
import LandingPage from "./Components/LandingPage/Landingpage";
import DonorDashboard from "./Components/Donor/DonorDashboard";
import About from "./Components/AboutSection/About";
import CreateCampaign from "./Components/Donor/CreateCampaign";
import DonorProfile from "./Components/Donor/DonorProfile";
import Myprofile from "./Components/Recipent/Myprofile";
import GeneralFeed from "./Components/Recipent/GeneralFeed";
import GrantedMeals from "./Components/Recipent/GrantedMeals";
import ActiveMeals from "./Components/Recipent/ActiveMeals";
import DonationHistory from "./Components/Donor/DonationHistory";
import ScrollToTop from "./Components/ScrollToTop";
import ContactUs from "./Components/ContactUs/ContactUs";
import DonorGeneralFeed from "./Components/Donor/DonorGeneralFeed";
import CampaignApplicants from "./Components/Donor/CampaignApplicants";
import { useEffect } from "react";
import { useData } from "./Components/ContextAPIs/UserContext";
import { useChange } from "./Components/ContextAPIs/ChangeContext";
import Services from "./Components/ServicesSection/Services";
import { useSecureFetch } from "./Components/Refresh/SecureFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./Components/ResetPassword";
import DonorLandingPage from "./Components/Donor/DonorLandingpage";

function App() {
  const { setUser } = useData();
  const { setActiveMeals, setGrantedMeals, setBlacklistMeals } = useChange();
  const secureFetch = useSecureFetch();

  useEffect(() => {
    console.log("running");

    try {
      async function restoreSession() {
        const data = await secureFetch("http://localhost:5000/api/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        console.log("hello dtaa");
        console.log(data);
        if (data.success) {
          setUser(data.userDetails);
          setActiveMeals(data.activeMeals);
          setGrantedMeals(data.grantedMeals);
          setBlacklistMeals(data.blacklistMeals);
        }
      }
      restoreSession();
    } catch (err) {
      console.error("Error during session restore:", err);
      alert("An error occurred during session restore. Please try again.");
    }
  }, []);
  return (
    <>
      <ScrollToTop />
      <ToastContainer />

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
      </Routes>
    </>
  );
}

export default App;
