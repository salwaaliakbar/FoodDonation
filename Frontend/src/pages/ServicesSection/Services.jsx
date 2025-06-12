import OurServices  from "./Ourservices";
import Introduction from "./Introduction";
import JoinMission from "../AboutSection/JoinMission";
import Navbar from "../../Common/Navbar/NavBar";
import Footer from "../../common/Footer/Footer";

function Services () {
  return (
    <div className="flex flex-col min-h-screen">
     <Navbar/>
      <div className="bg-green-800 pt-15 pb-12 md:pb-24">
        <div className="mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-poppins">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            We are committed to reducing food waste and helping those in need.
            Here's how we make it happen.
          </p>
        </div>
      </div>
      <div className="flex-grow">
        <Introduction />
        <JoinMission />
        <OurServices />
      </div>
      <Footer/>
    </div>
  );
};

export default Services;
