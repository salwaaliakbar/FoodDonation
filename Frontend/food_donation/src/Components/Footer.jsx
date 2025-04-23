import logo from "../assets/images/whitelogo.png";
import "font-awesome/css/font-awesome.min.css";

function Footer() {
  return (
    <>
        {/* Footer Section */}
      <div className="bg-green-800 h-70 mt-20 p-7 flex justify-between items-center">
        <div>
          <img className="w-80 h-20" src={logo} alt="FoodSecure Logo" />
          <p className="text-white text-xl ml-10 mt-5">Rescue, Feed, Empower</p>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6 p-6 mt-30">
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

        {/* Contact Info */}
        <div className="flex flex-col items-end space-y-4">
          <a
            href="mailto:info@foodsecure.org"
            className="text-white text-2xl hover:text-green-600 flex items-center space-x-3 tranform-all duration-300 delay-75"
          >
            <span>info@foodsecure.org</span>
            <i className="fa fa-envelope text-3xl"></i>
          </a>
          <a
            href="tel:+1234567890"
            className="text-white text-2xl hover:text-green-600 flex items-center space-x-3 tranform-all duration-300 delay-75"
          >
            <span>tel:+1234567890</span>
            <i className="fa fa-phone text-3xl"></i>
          </a>
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
