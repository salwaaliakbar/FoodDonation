import { useState } from "react";
import logo from "../assets/images/logo.jpg";
import Login from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ContactUs from "./ContactUs";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isContact, setIsContact] = useState(false);

  return (
    <>
      <div className="relative">
        <div className="flex justify-between p-2 bg-white hover:shadow-lg transition-all duration-300 hover:text-green-600">
          <div>
            <Link to="/LandingPage">
              <img
                className="w-80 h-20 rounded-full cursor-pointer"
                src={logo}
                alt="Logo"
              />
            </Link>
          </div>

          {/* Navigation options */}
          <ul className="flex justify-between text-xl font-semibold text-black mt-2">
            <Link to="/about">
              <li className="cursor-pointer p-3 hover:border-b-3 border-green-800">
                About
              </li>
            </Link>
            <li className="cursor-pointer p-3 hover:border-b-3 border-green-800">
              Services
            </li>
            <li className="cursor-pointer p-3 hover:border-b-3 border-green-800">
              Blog
            </li>
            <li
              className="cursor-pointer p-3 hover:border-b-3 border-green-800"
              onClick={() => setIsContact(true)}
            >
              Contact Us
            </li>
          </ul>

          <button
            className="bg-green-700 px-10 rounded text-lg font-medium hover:bg-green-600 cursor-pointer h-12 mr-4 text-white mt-3 hover:transform hover:translate-x-2 transition-all duration-300 delay-150"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>

        {isLogin && (
          <div className="absolute top-20 left-0 w-full z-10">
            <Login setIsLogin={setIsLogin} setIsSignup={setIsSignup} />
          </div>
        )}

        {isSignup && (
          <div className="absolute top-5 left-0 w-full z-10">
            <SignUpPage setIsLogin={setIsLogin} setIsSignup={setIsSignup} />
          </div>
        )}

        {isContact && (
          <div className="absolute top-20 left-0 w-full z-10">
            <ContactUs setIsContact={setIsContact} />
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
