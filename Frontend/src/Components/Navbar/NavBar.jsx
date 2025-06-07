import { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import Login from "../LoginPage";
import SignUpPage from "../SignUpPage";
import { NavLink } from "react-router-dom";
import ForgotPassword from "../ForgetPassword";
import styles from "./NavBar.module.css";

function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  return (
    <>
      <div className="relative">
        <div className="flex justify-between items-center p-2 bg-white hover:shadow-lg transition-all duration-300 hover:text-green-600">
          <div>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <img
                className="md:w-70 md:h-20 w-40 h-12 rounded-full cursor-pointer"
                src={logo}
                alt="Logo"
              />
            </NavLink>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              className="text-black text-3xl focus:outline-none mr-2"
              onClick={() => setIsDropdown((prev) => !prev)}
            >
              ☰
            </button>
          </div>

          {/* Navigation options */}
          <ul className="hidden md:flex justify-between text-xl font-semibold text-black mt-2">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <li className="cursor-pointer p-3 border-green-800">Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <li className="cursor-pointer p-3 border-green-800">About</li>
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <li className="cursor-pointer p-3 border-green-800">Services</li>
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <li className="cursor-pointer p-3 border-green-800">
                Contact Us
              </li>
            </NavLink>
          </ul>

          <button
            className="hidden md:block bg-green-700 px-10 rounded text-lg font-medium hover:bg-green-600 cursor-pointer h-12 mr-4 text-white mt-3 hover:transform hover:translate-x-2 transition-all duration-300 delay-150"
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>

        {/* Mobile Menu */}
        {isDropdown && (
          <div className="md:hidden bg-white shadow-lg p-4">
            <ul className="flex flex-col text-lg font-semibold text-black">
              <NavLink
                to="/"
                onClick={() => setIsLogin(false)}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <li className="cursor-pointer p-3 hover:border-b-3 border-green-800">
                  Home
                </li>
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsLogin(false)}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <li className="cursor-pointer p-3 border-green-800">About</li>
              </NavLink>
              <NavLink
                to="/services"
                onClick={() => setIsLogin(false)}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <li className="cursor-pointer p-3 border-green-800">
                  Services
                </li>
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsLogin(false)}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <li className="cursor-pointer p-3 border-green-800">
                  Contact Us
                </li>
              </NavLink>
              <button
                className="bg-green-800 px-10 rounded text-lg font-medium hover:bg-green-600 cursor-pointer h-12 text-white mt-3 hover:transform hover:translate-x-2 transition-all duration-300 delay-150"
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
            </ul>
          </div>
        )}

        {isLogin && (
          <div className="absolute top-5 left-0 w-full z-10">
            <Login
              setIsLogin={setIsLogin}
              setIsSignup={setIsSignup}
              setIsForgot={setIsForgot}
            />
          </div>
        )}

        {isSignup && (
          <div className="absolute top-5 left-0 w-full z-10">
            <SignUpPage setIsLogin={setIsLogin} setIsSignup={setIsSignup} />
          </div>
        )}

        {isForgot && (
          <div className="absolute top-5 left-0 w-full z-10">
            <ForgotPassword setIsForgot={setIsForgot} />
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
