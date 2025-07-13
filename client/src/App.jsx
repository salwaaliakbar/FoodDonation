import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionInitializer from "./app/SessionInitializer";
import ScrollToTop from "./app/ScrollToTop";
import LandingPage from "./pages/LandingPage/Landingpage";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import ContactUs from "./pages/ContactUs/ContactUs";
import ResetPassword from "./pages/Auth/ResetPassword";
import LoginRequired from "./pages/Auth/LoginRequired";
import DonorDashboard from "./pages/Donor/DonorDashboard";
import DonorLandingPage from "./pages/Donor/DonorLandingpage";
import CreateCampaign from "./pages/Donor/CreateCampaign";
import DonorGeneralFeed from "./pages/Donor/DonorGeneralFeed";
import MyProfile from "./components/MyProfile"
import DonationHistory from "./pages/Donor/DonationHistory";
import Recipent_Dashboard from "./pages/Recipent/Recipent_Dashboard";
import GeneralFeed from "./pages/Recipent/GeneralFeed";
import GrantedMeals from "./pages/Recipent/GrantedMeals";
import ActiveMeals from "./pages/Recipent/ActiveMeals";
import NotFound from "./pages/notFound/NotFound";
import FAQSection from "./pages/FAQs/FAQsSection";
import RecipientDashboard from "./pages/Recipent/RecipientDashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";


function App() {
  console.log("app re-render");
  return (
    <>
      <SessionInitializer />
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        {/* static routes/ home page routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/FAQ" element={<FAQSection />} />
        <Route path="/loginRequired" element={<LoginRequired />} />
        <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />

        {/* Donor Routes */}
        <Route path="/donorDashBoard" element={<ProtectedRoutes><DonorDashboard /></ProtectedRoutes>}>
          <Route index element={<DonorLandingPage />} />
          <Route path="createCampaign" element={<CreateCampaign />} />
          <Route path="generalfeed" element={<DonorGeneralFeed />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="history" element={<DonationHistory />} />
        </Route>

        {/* Recipent Routes */}
        <Route path="/recipent" element={<ProtectedRoutes><RecipientDashboard /></ProtectedRoutes>}>
          <Route index element={<Recipent_Dashboard />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="generalfeed" element={<GeneralFeed />} />
          <Route path="granted" element={<GrantedMeals />} />
          <Route path="active" element={<ActiveMeals />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
