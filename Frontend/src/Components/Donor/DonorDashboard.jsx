import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useData } from "../../ContextAPIs/UserContext";
import DonorSidebar from "./DonorSidebar";
import socket from "./socket";
import { useChange } from "../../ContextAPIs/ChangeContext";

function DonorDashboard() {
  const { user } = useData();
  const { setIsChangeActive } = useChange();

  useEffect(() => {
    if (!user?._id) return;

    // Only connect once
    if (!socket.connected) socket.connect();

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
      setIsChangeActive(true)
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
