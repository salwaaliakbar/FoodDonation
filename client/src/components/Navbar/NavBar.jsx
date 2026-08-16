import { useState } from "react";
import logo from "../../assets/images/logo.jpg";
import Login from "../../pages/Auth/LoginPage";
import SignUpPage from "../../pages/Auth/SignUpPage";
import { NavLink } from "react-router-dom";
import ForgotPassword from "../../pages/Auth/ForgetPassword";
import styles from "./NavBar.module.css";

function Navbar() {
  // State to toggle Login modal
  const [isLogin, setIsLogin] = useState(false);

  // State to toggle Signup modal
  const [isSignup, setIsSignup] = useState(false);

  // State to toggle mobile dropdown menu
  const [isDropdown, setIsDropdown] = useState(false);

  // State to toggle Forgot Password modal
  const [isForgot, setIsForgot] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm">
      {/* Navbar top section */}
      <div className="flex justify-between items-center px-4 md:px-8 py-2 shadow-sm">
        {/* Logo section */}
        <div>
          <NavLink to="/" className="block">
            <img
              className="md:w-80 md:h-19 w-50 h-15 object-contain cursor-pointer"
              src={logo}
              alt="FoodSecure Logo"
            />
          </NavLink>
        </div>

        {/* Hamburger icon for mobile view */}
        <div className="md:hidden">
          <button
            className="text-brand-800 text-3xl focus:outline-none mr-2"
            onClick={() => setIsDropdown((prev) => !prev)}
          >
            ☰
          </button>
        </div>

        {/* Desktop navigation menu */}
        <ul className="hidden md:flex gap-2 text-[15px] font-semibold text-stone-700 items-center">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <li className="cursor-pointer px-3 py-2 hover:text-brand-700 transition-colors duration-200">Home</li>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <li className="cursor-pointer px-3 py-2 hover:text-brand-700 transition-colors duration-200">About</li>
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <li className="cursor-pointer px-3 py-2 hover:text-brand-700 transition-colors duration-200">Services</li>
          </NavLink>
          <NavLink
            to="/FAQ"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <li className="cursor-pointer px-3 py-2 hover:text-brand-700 transition-colors duration-200">FAQs</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <li className="cursor-pointer px-3 py-2 hover:text-brand-700 transition-colors duration-200">Contact Us</li>
          </NavLink>
        </ul>

        {/* Desktop Login/Signup button */}
        <button
          className="hidden md:block bg-brand-700 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-800 cursor-pointer text-white shadow-sm shadow-brand-700/20 hover:shadow-md hover:shadow-brand-700/30 hover:-translate-y-0.5 transition-all duration-200"
          onClick={() => setIsLogin(true)}
        >
          Login / Signup
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {isDropdown && (
        <div className="md:hidden bg-white shadow-lg p-4 border-t border-stone-100">
          <ul className="flex flex-col text-[15px] text-stone-700 font-semibold gap-1">
            <NavLink
              to="/"
              onClick={() => setIsLogin(false)}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <li className="cursor-pointer p-2 rounded-lg hover:bg-cream-100">
                Home
              </li>
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setIsLogin(false)}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <li className="cursor-pointer p-2 rounded-lg hover:bg-cream-100">About</li>
            </NavLink>
            <NavLink
              to="/services"
              onClick={() => setIsLogin(false)}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <li className="cursor-pointer p-2 rounded-lg hover:bg-cream-100">Services</li>
            </NavLink>
            <NavLink
              to="/FAQ"
              onClick={() => setIsLogin(false)}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <li className="cursor-pointer p-2 rounded-lg hover:bg-cream-100">FAQs</li>
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setIsLogin(false)}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <li className="cursor-pointer p-2 rounded-lg hover:bg-cream-100">
                Contact Us
              </li>
            </NavLink>

            {/* Mobile Login/Signup button */}
            <button
              className="bg-brand-700 px-4 rounded-full text-sm font-semibold hover:bg-brand-800 cursor-pointer h-12 text-white mt-3 transition-all duration-200"
              onClick={() => setIsLogin(true)}
            >
              Login / Signup
            </button>
          </ul>
        </div>
      )}

      {/* Conditional rendering for Login modal */}
      {isLogin && (
        
          <Login
            setIsLogin={setIsLogin}
            setIsSignup={setIsSignup}
            setIsForgot={setIsForgot}
          />
        
      )}

      {/* Conditional rendering for Signup modal */}
      {isSignup && (
        
          <SignUpPage setIsLogin={setIsLogin} setIsSignup={setIsSignup} />
        
      )}

      {/* Conditional rendering for Forgot Password modal */}
      {isForgot && (
        
          <ForgotPassword setIsForgot={setIsForgot} />
       
      )}
    </nav>
  );
}

export default Navbar;
