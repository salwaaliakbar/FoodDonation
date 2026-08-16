import logo from "../../assets/images/whitelogo.png";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      {/* Main footer container with responsive layout */}
      <div className="bg-brand-900 p-7 md:px-16 flex flex-col md:flex-row md:justify-between md:items-start items-start justify-start space-y-10 md:space-y-0">

        {/* Left section: Logo and tagline */}
        <div className="text-left">
          <img className="w-40 md:w-64 h-auto object-contain" src={logo} alt="FoodSecure Logo" />
          <p className="text-brand-100 text-lg md:text-xl mt-5 tracking-wide">Rescue, Feed, Empower</p>
        </div>

        {/* Middle section: Quick navigation links */}
        <div className="flex flex-col md:items-start space-y-2 text-white">
          <h1 className="font-bold text-xl md:text-2xl mb-4 md:mt-2">Quick Links</h1>
          <Link to="/" className="text-brand-100 hover:text-accent-400 transition-colors duration-200">
            Home
          </Link>
          <Link to="/about" className="text-brand-100 hover:text-accent-400 transition-colors duration-200">
            About
          </Link>
          <Link to="/services" className="text-brand-100 hover:text-accent-400 transition-colors duration-200">
            Services
          </Link>
          <Link to="/FAQ" className="text-brand-100 hover:text-accent-400 transition-colors duration-200">
            FAQs
          </Link>
          <Link to="/contact" className="text-brand-100 hover:text-accent-400 transition-colors duration-200 mb-6">
            Contact Us
          </Link>
        </div>

        <div>
          {/* Right section: Contact details */}
          <div className="flex flex-col md:items-start space-y-4 mb-8">
            <h1 className="font-bold text-xl md:text-2xl mb-4 text-white md:mt-2">Contact Us</h1>
            <span
              className="text-brand-100 text-base hover:text-accent-400 flex items-center space-x-3 transition-colors duration-200"
            >
              <i className="fa fa-envelope text-xl md:text-2xl"></i>
              <span>contact@foodshare.org</span>
            </span>
            <span
              className="text-brand-100 text-base hover:text-accent-400 flex items-center space-x-3 transition-colors duration-200"
            >
              <i className="fa fa-phone text-xl md:text-2xl"></i>
              <span>tel: (123) 456-7891</span>
            </span>
          </div>

          {/* Social media icons */}
          <div className="flex space-x-4">
            <span className="p-1 border border-brand-600 rounded-full hover:bg-accent-500 hover:border-accent-500 w-10 h-10 md:w-11 md:h-11 text-center transition-all duration-200 flex justify-center items-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl md:text-2xl"
              >
                <i className="fa fa-facebook-f"></i>
              </a>
            </span>
            <span className="flex justify-center items-center p-1 border border-brand-600 rounded-full hover:bg-accent-500 hover:border-accent-500 w-10 h-10 md:w-11 md:h-11 text-center transition-all duration-200">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl md:text-2xl"
              >
                <i className="fa fa-instagram"></i>
              </a>
            </span>
            <span className="flex justify-center items-center p-1 border border-brand-600 rounded-full hover:bg-accent-500 hover:border-accent-500 w-10 h-10 md:w-11 md:h-11 text-center transition-all duration-200">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl md:text-2xl"
              >
                <i className="fa fa-twitter"></i>
              </a>
            </span>
            <span className="flex justify-center items-center p-1 border border-brand-600 rounded-full hover:bg-accent-500 hover:border-accent-500 w-10 h-10 md:w-11 md:h-11 text-center transition-all duration-200">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-xl md:text-2xl"
              >
                <i className="fa fa-linkedin"></i>
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Footer bottom section with copyright and policies */}
      <div className="bg-brand-950 h-auto md:h-16 flex flex-col md:flex-row justify-between items-center p-5 space-y-4 md:space-y-0">
        <div className="text-brand-200 text-center md:text-left text-sm font-medium">
          &copy; 2023 FoodSecure. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-brand-200 hover:text-accent-400 text-sm transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" className="text-brand-200 hover:text-accent-400 text-sm transition-colors duration-200 md:mb-0 mb-10">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
