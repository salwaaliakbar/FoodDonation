import HeroSection from "./HeroSection";
import OurVision from "./Ourvision";
import WhyDonate from "./WhyDonate";
import WorkMethod from "./WorkMethod";
import Motivation from "./Motivation";
import Staticics from "../../components/Staticsics";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";

function LandingPage() {
  return (
    <div className="bg-cream-50">
      <Navbar/>
      <HeroSection />
      <Motivation />
      <WorkMethod />
      <OurVision />
      <WhyDonate />
      <Staticics />
      <Footer/>
    </div>
  );
}

export default LandingPage;
