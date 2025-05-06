import logo from "../../assets/images/logo.jpg";
import { useData } from "../ContextAPIs/UserContext";

// Import FontAwesome icons CSS
import "font-awesome/css/font-awesome.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useChange } from "../ContextAPIs/ChangeContext";

const DonorSidebar = () => {
  const navigate = useNavigate();
  const { setUser } = useData();
  const { setIsChangeActive, setIsChangeGranted, setIsChangeExpired, setLoading } = useChange();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setIsChangeActive(true);
      setIsChangeGranted(true);
      setIsChangeExpired(true);
      setLoading(false);
      navigate("/");
    } else {
      alert("Logout cancelled");
    }
  };
  return (
    <div className="fixed top-0 left-0 h-screen w-[20%] bg-white-800 flex flex-col justify-around shadow-[4px_0px_12px_0px_rgba(0,0,0,0.5)] text-black">
      {/* Logo Section */}
      <div className=" h-20 border-b-[1.5px] border-b-green-800">
        <img
          className="w-120 h-19 rounded-full cursor-pointer "
          src={logo}
          alt="Logo"
        />
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-4">
        <ul className="space-y-2">
          <li>
            <Link to="/donorDashBoard">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-800 hover:text-white transition-colors">
                <i className="fa fa-home text-lg"></i>{" "}
                {/* Home icon for Dashboard */}
                Dashboard
              </div>
            </Link>
          </li>
          <li>
            <Link to="/donorDashBoard/generalfeed">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-800 hover:text-white transition-colors">
                <i className="fa fa-newspaper-o text-lg"></i>{" "}
                {/* Newspaper icon for General Feed */}
                General Feed
              </div>
            </Link>
          </li>
          <li>
            <Link to="/donorDashBoard/history">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-800 hover:text-white transition-colors">
                <i className="fa fa-history text-lg"></i>{" "}
                {/* History icon for Donation History */}
                Donation History
              </div>
            </Link>
          </li>
          <li>
            <Link to="/donorDashBoard/createCampaign">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-800 hover:text-white transition-colors">
                <i className="fa fa-bullhorn text-lg"></i>{" "}
                {/* Bullhorn icon for Create Campaigns */}
                Create Campaigns
              </div>
            </Link>
          </li>
          <li>
            <Link to="/donorDashBoard/profile">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-800 hover:text-white transition-colors">
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

export default DonorSidebar;
