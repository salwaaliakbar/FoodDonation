import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../../context/UserContext";
import DonorSidebar from "./DonorSidebar";
import { useSocket } from "../../context/SocketProvider";

function DonorDashboard() {
  const { user } = useData();
  const socket = useSocket()
  console.log('dashboard render')

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("joinNotificationRoom", user._id);

    const handleNotifyDonor = (data) => {
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
            background: "#38a169",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
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
    <div className="flex flex-col md:flex-row overflow-hidden">
      <DonorSidebar />
      <div className="w-full md:w-[80%] md:absolute md:right-0 bg-gray-200 min-h-screen md:mb-8">
        <Outlet />
      </div>
    </div>
  );
}

export default DonorDashboard;
