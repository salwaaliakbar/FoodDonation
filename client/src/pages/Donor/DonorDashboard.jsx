import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../../context/UserContext";
import DonorSidebar from "./DonorSidebar";
import { useSocket } from "../../context/SocketProvider";
import Header from "../../components/Header";

function DonorDashboard() {
  const { user } = useData();
  const socket = useSocket()
  console.log('dashboard render')

  useEffect(() => {
    if (!user?._id) return;
    console.log("inside donor useEffect!")

    socket.emit("joinNotificationRoom", user._id);
    console.log("room join")

    const handleNotifyDonor = (data) => {
      console.log("inisde hanlder")
      toast.success(
        `✅ ${data.recipientName} applied to "${data.campaignTitle}" for ${
          data.appliedPersons
        } ${data.appliedPersons > 1 ? "people" : "person"}`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          style: {
            background: "#206140",
            color: "#fff",
            fontSize: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            font: "Montserrat"
          },
        }
      );
    };
    socket.on("notifyDonor", handleNotifyDonor);

    return () => {
      socket.off("notifyDonor", handleNotifyDonor);
    };
  }, [user]);

  return (
    <>
    <div className="flex flex-col md:flex-row overflow-hidden">
      <DonorSidebar />
      <div className="w-full md:w-[80%] md:absolute md:right-0 bg-cream-100 min-h-screen md:mb-8">
        <Header />
        <Outlet />
      </div>
    </div>
    </>
  );
}

export default DonorDashboard;
