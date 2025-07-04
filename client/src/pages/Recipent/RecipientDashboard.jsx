import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "../../components/Header";

function RecipientDashboard() {
  return (
    <div className="flex flex-col md:flex-row overflow-hidden font-[Montserrat]">
      <SideBar />
      <div className="w-full md:w-[80%] md:absolute md:right-0 bg-gray-200 min-h-screen md:mb-8">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default RecipientDashboard;
