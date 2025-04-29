import HeroSection from "./HeroSection";
import Navbar from "./NavBar";
import OurVision from "./Ourvision";
import WhyDonate from "./WhyDonate";
import WorkMethod from "./WorkMethod";
import Motivation from "./Motivation";
import Staticics from "./Staticsics";
import Footer from "./Footer";

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
