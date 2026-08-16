import HeroSection from "./HeroSection";
import OurVision from "./Ourvision";
import WhyDonate from "./WhyDonate";
import WorkMethod from "./WorkMethod";
import Motivation from "./Motivation";
import Staticics from "../../components/Staticsics";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import AnimatedSection from "../../components/AnimatedSection";

function LandingPage() {
  return (
    <div className="bg-cream-50">
      <Navbar/>
      <AnimatedSection><HeroSection /></AnimatedSection>
      <AnimatedSection><Motivation /></AnimatedSection>
      <AnimatedSection><WorkMethod /></AnimatedSection>
      <AnimatedSection><OurVision /></AnimatedSection>
      <AnimatedSection><WhyDonate /></AnimatedSection>
      <AnimatedSection><Staticics /></AnimatedSection>
      <Footer/>
    </div>
  );
}

export default LandingPage;
