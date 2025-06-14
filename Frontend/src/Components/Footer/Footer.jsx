import logo from "../../assets/images/whitelogo.png";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      {/* Main footer container with responsive layout */}
      <div className="bg-green-800 p-7 flex flex-col md:flex-row md:justify-between md:items-center items-start justify-start space-y-10 md:space-y-0">
        
        {/* Left section: Logo and tagline */}
        <div className="text-left">
          <img className="w-40 md:w-80 h-12 md:h-24 md:mx-0" src={logo} alt="FoodSecure Logo" />
          <p className="text-white text-lg md:text-xl mt-5 md:pl-10">Rescue, Feed, Empower</p>
        </div>

        {/* Middle section: Quick navigation links */}
        <div className="flex flex-col md:items-start space-y-2 text-white">
          <h1 className="font-bold text-xl md:text-2xl md:mb-6 mb-4">Quick Links</h1>
          <Link to="/" className="hover:text-green-400 transform hover:scale-105 transition-all duration-300 delay-75">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-400 transform hover:scale-105 transition-all duration-300 delay-75">
            About
          </Link>
          <Link to="/services" className="hover:text-green-400 transform hover:scale-105 transition-all duration-300 delay-75">
            Services
          </Link>
          <Link to="/FAQ" className="hover:text-green-400 transform hover:scale-105 transition-all duration-300 delay-75">
            FAQs
          </Link>
          <Link to="/contact" className="hover:text-green-400 transform hover:scale-105 transition-all duration-300 delay-75 mb-6">
            Contact Us
          </Link>
        </div>

        <div>
          {/* Right section: Contact details */}
          <div className="flex flex-col md:items-start space-y-4  mb-10">
            <h1 className="font-bold text-xl md:text-2xl mb-4 text-white">Contact Us</h1>
            <span
              className="text-white text-lg hover:text-green-400 flex items-center space-x-3 transform transition-all duration-300 delay-75 hover:scale-105"
            >
              <i className="fa fa-envelope text-2xl md:text-3xl"></i>
              <span>contact@foodshare.org</span>
            </span>
            <span
              className="text-white text-lg hover:text-green-400 flex items-center space-x-3 transform transition-all duration-300 delay-75 hover:scale-105"
            >
              <i className="fa fa-phone text-2xl md:text-3xl"></i>
              <span>tel: (123) 456-7891</span>
            </span>
          </div>

          {/* Social media icons */}
          <div className="flex space-x-4">
            <span className="p-1 border-2 border-green-600 rounded-full hover:bg-green-600 w-10 h-10 md:w-12 md:h-12 text-center transform transition-all duration-300 delay-75 flex justify-center items-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl md:text-3xl"
              >
                <i className="fa fa-facebook-f"></i>
              </a>
            </span>
            <span className=" flex justify-center items-center p-1 border-2 border-green-600 rounded-full hover:bg-green-600 w-10 h-10 md:w-12 md:h-12 text-center transform transition-all duration-300 delay-75">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl md:text-3xl"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </span>
            <span className=" flex justify-center items-center p-1 border-2 border-green-600 rounded-full hover:bg-green-600 w-10 h-10 md:w-12 md:h-12 text-center transform transition-all duration-300 delay-75">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl md:text-3xl"
              >
                <i className="fa fa-twitter"></i>
              </a>
            </span>
            <span className=" flex justify-center items-center p-1 border-2 border-green-600 rounded-full hover:bg-green-600 w-10 h-10 md:w-12 md:h-12 text-center transform transition-all duration-300 delay-75">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-2xl md:text-3xl"
              >
                <i className="fa fa-linkedin"></i>
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Footer bottom section with copyright and policies */}
      <div className="bg-white h-20 flex flex-col md:flex-row justify-between items-center p-5 space-y-4 md:space-y-0">
        <div className="text-green-800 text-center md:text-left text-sm md:text-lg font-semibold">
          &copy; 2023 FoodSecure. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-green-800 hover:text-green-600 text-sm md:text-base">
            Privacy Policy
          </a>
          <a href="#" className="text-green-800 hover:text-green-600 text-sm md:text-base md:mb-0 mb-10">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
