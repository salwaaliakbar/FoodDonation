import logo from "../../assets/images/whitelogo.png";
import "font-awesome/css/font-awesome.min.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* Footer Section */}
      <div className="bg-green-800 h-70 mt-20 p-7 flex justify-between items-center">
        <div>
          <img className="w-80 h-20" src={logo} alt="FoodSecure Logo" />
          <p className="text-white text-xl ml-10 mt-5">Rescue, Feed, Empower</p>
        </div>

        {/* quick links */}
        <div className="flex flex-col items-start space-y-2 text-white">
          <h1 className="font-bold text-2xl mb-6">Quick Links</h1>
          <Link to="/" className="hover:text-green-400 transform hover:scale-105 transition-all duration-300 delay-75"
          >Home</Link>
          <Link to="/about" className="hover:text-green-400 tranform-all duration-300 delay-75 hover:scale-105">About</Link>
          <Link to="/" className="hover:text-green-400 tranform-all duration-300 delay-75 hover:scale-105">Services</Link>
          <Link to="/" className="hover:text-green-400 tranform-all duration-300 delay-75 hover:scale-105">Contact Us</Link>
        </div>


        {/* Contact Info */}
        <div className="flex flex-col items-start space-y-4 mt-15">
        <h1 className="font-bold text-2xl mb-6 text-white">Contact Us</h1>
          <a
            href="mailto:info@foodsecure.org"
            className="text-white text-lg hover:text-green-400 flex items-center space-x-3 tranform-all duration-300 delay-75 mr-8 hover:scale-105"
          >
            <i className="fa fa-envelope text-3xl"></i>
            <span>info@foodsecure.org</span>    
          </a>
          <a
            href="tel:+1234567890"
            className="text-white text-lg hover:text-green-400 flex items-center space-x-3 tranform-all duration-300 delay-75 mr-8 hover:scale-105"
          >
            <i className="fa fa-phone text-3xl"></i>
            <span>tel:+1234567890</span>
          </a>
          {/* Social Media Icons */}
        <div className="flex space-x-4 p-2 mb-5">
          <span className="p-1 border-2 border-green-600 rounded-full hover:bg-green-600 w-12 h-12 text-center tranform-all duration-300 delay-75">
            <a
              href="https://facebook.com"
              target="_blank"
              className="text-white text-3xl"
            >
              <i className="fa fa-facebook-f"></i>
            </a>
          </span>
          <span className="p-1 border-2 border-green-600 rounded-full hover:bg-green-600 w-12 h-12 text-center tranform-all duration-300 delay-75">
            <a
              href="https://instagram.com"
              target="_blank"
              className="text-white text-3xl"
            >
              <i className="fa fa-instagram"></i>
            </a>
          </span>
          <span className="p-1 border-2 border-green-600 rounded-full hover:bg-green-600 w-12 h-12 text-center transform-all duration-300 delay-75">
            <a
              href="https://twitter.com"
              target="_blank"
              className="text-white text-3xl"
            >
              <i className="fa fa-twitter"></i>
            </a>
          </span>
          <span className="p-1 border-2 border-green-600 rounded-full hover:bg-green-600 w-12 h-12 text-center tranform-all duration-300 delay-75">
            <a
              href="https://linkedin.com"
              target="_blank"
              className="text-white text-3xl"
            >
              <i className="fa fa-linkedin"></i>
            </a>
          </span>
        </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-white h-20 flex justify-between items-center p-5">
        <div className="text-green-800 text-lg font-semibold ml-10">
          &copy; 2023 FoodSecure. All rights reserved.
        </div>
        <div className="flex space-x-4 mr-10">
          <a href="#" className="text-green-800 hover:text-green-600">
            Privacy Policy
          </a>
          <a href="#" className="text-green-800 hover:text-green-600">
            Terms of Service
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
