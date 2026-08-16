import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "../../components/Header";
import { useSocket } from "../../context/SocketProvider";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useData } from "../../context/UserContext";

function RecipientDashboard() {
  const { user } = useData()
  const socket = useSocket();
  console.log("recipient dashboard render");

  useEffect(() => {
    if (!user?._id) return;
    console.log("inside recipient useEffect")

    socket.emit("joinNotificationRoom", user._id);
    console.log("after joinign room")

    const handleMealAwarded = (data) => {
      console.log("Inside handle awarded")
      const { campaignTitle, awardedPersons } = data;

      toast.success(
        `🎉 You've been awarded ${awardedPersons} meal${
          awardedPersons > 1 ? "s" : ""
        } in the campaign "${campaignTitle}"!`,
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
            fontSize: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            font: "Montserrat",
          },
        }
      );
    };
    socket.on("mealAwarded", handleMealAwarded);

    return () => {
      socket.off("mealAwarded", handleMealAwarded);
    };
  }, [user]);

  return (
    <div className="flex flex-col md:flex-row overflow-hidden">
      <SideBar />
      <div className="w-full md:w-[80%] md:absolute md:right-0 bg-cream-100 min-h-screen md:mb-8">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default RecipientDashboard;
