import HeroSection from "./HeroSection";
import Navbar from "../Navbar/NavBar";
import OurVision from "./Ourvision";
import WhyDonate from "./WhyDonate";
import WorkMethod from "./WorkMethod";
import Motivation from "./Motivation";
import Staticics from "./Staticsics";
import Footer from "../Footer/Footer";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Motivation />
      <WorkMethod />
      <OurVision />
      <WhyDonate />
      <Staticics />
      <Footer />
    </>
  );
}

export default LandingPage;
