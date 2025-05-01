import logo from '../../assets/images/logo.jpg';

// Import FontAwesome icons CSS
import "font-awesome/css/font-awesome.min.css";
import { Link, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      navigate("/");
    } else {
      alert("Logout cancelled");
    }
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-[20%] bg-white-800 flex flex-col justify-around shadow-[4px_0px_12px_0px_rgba(0,0,0,0.5)] text-black">
      {/* Logo Section */}
      <div className=" h-20 border-b-[1.5px] border-b-green-700">
        <Link to={'/recipent'}>
          <img
            className="w-120 h-19 rounded-full cursor-pointer "
            src={logo}
            alt="Logo"
          />
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        <ul className="space-y-2">
          <li>
            <Link to='/recipent'>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                <i className="fa fa-home text-lg text-[1.1rem]"></i>{" "}
                {/* Home icon for Dashboard */}
                Dashboard
              </div>
            </Link>
          </li>
          <li>
            <Link to="/generalfeed">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                <i className="fa fa-newspaper-o text-lg text-[1.1rem]"></i>{" "}
                {/* Newspaper icon for General Feed */}
                General Feed
              </div>
            </Link>
          </li>
          <li>
            <Link to="/active">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                <i className="fa fa-cutlery text-lg text-[1.1rem]"></i>{" "}
                {/* Changed to fa-cutlery */}
                Active Meals
              </div>
            </Link>
          </li>
          <li>
            <Link to="/granted">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                <i className="fa fa-check-circle text-lg text-[1.1rem]"></i>
                Granted Meals
              </div>
            </Link>
          </li>
          <li>
            <Link to='/recipent/profile'>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
                <i className="fa fa-user-circle text-lg"></i>{" "}
                {/* User Circle icon for My Profile */}
                My Profile
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4">
        <a
          href="#"
          className="block w-full text-center px-4 py-2 bg-green-900 text-white font-bold text-lg rounded-lg transition-colors hover:bg-green-600"
          onClick={handleLogout}
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default SideBar;

