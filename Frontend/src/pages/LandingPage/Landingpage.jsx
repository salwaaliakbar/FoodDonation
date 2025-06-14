import HeroSection from "./HeroSection";
import OurVision from "./Ourvision";
import WhyDonate from "./WhyDonate";
import WorkMethod from "./WorkMethod";
import Motivation from "./Motivation";
import Staticics from "../../Components/Staticsics";
import Navbar from "../../Components/Navbar/NavBar";
import Footer from "../../Components/Footer/Footer";

function LandingPage() {
  return (
    <>
      <Navbar/>
      <HeroSection />
      <Motivation />
      <WorkMethod />
      <OurVision />
      <WhyDonate />
      <Staticics />
      <Footer/>
    </>
  );
}

export default LandingPage;
