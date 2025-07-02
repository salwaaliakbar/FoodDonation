import React, { useState } from "react";
import SideBar from "../pages/Donor/DonorSidebar";
import { Phone, Mail, User, Building } from "lucide-react";
import { useData } from "../context/UserContext";
import { useSecureFetch } from "../customHooks/useSecureFetch";
import BtnLoader from "./Common/btnLoader";
import StatusDialog from "../components/Common/StatusDialog";

const Myprofile = () => {
  const { user, setUser } = useData(); // Access global user context
  const [edit, setEdit] = useState(false); // Edit mode toggle
  const secureFetch = useSecureFetch(); // Authenticated fetch hook
  const [btnLoader, setBtnLoader] = useState(false);
  const [status, setStatus] = useState({
    show: false,
    success: true,
    message: "",
    error: "",
  });

  // Handle input change in edit mode
  function handleInput(e) {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Submit updated profile to backend
  async function handleSubmit() {
    setBtnLoader(true);
    try {
      const data = await secureFetch(
        "http://localhost:5000/api/updateProfile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          credentials: "include",
        }
      );

      if (data.success) {
        await new Promise((res) => setTimeout(res, 1000));
        setBtnLoader(false);

        setTimeout(() => {
          setStatus({
            show: true,
            success: true,
            message: "Profile Updated Successfully.",
          });
          console.log("Profile Updated Successfully");
          setEdit(false);
        }, 100);
      } else {
        await new Promise((res) => setTimeout(res, 1000));
        setBtnLoader(false);

        setTimeout(() => {
          setStatus({
            show: true,
            success: false,
            message: data.error || "Failed to update profile.",
          });
          console.log(data.error || "Failed to update profile.");
        }, 100);
      }
    } catch (err) {
      await new Promise((res) => setTimeout(res, 1000));
      setBtnLoader(false);

      setTimeout(() => {
        console.error("Error updating profile:", err);
        setStatus({
          show: true,
          success: false,
          message: "Error updating profile.",
          error: err.message || String(err) || "An error occurred",
        });
      }, 100);
    }
  }

  const firstLetter = user?.fullname?.charAt(0).toUpperCase() || "U";

  return (
    <>
      {status.show && (
        <StatusDialog
          message={status.message}
          success={status.success}
          error={status.error}
          onClose={() => setStatus({ ...status, show: false })}
        />
      )}

      <div className="flex flex-col lg:flex-row font-[Montserrat]">
        <div className="w-full lg:absolute lg:right-0 bg-gray-200">
          <div className="mt-25 w-[90%] lg:w-[85%] m-auto border border-gray-200 bg-white rounded-md p-6 md:mb-8">
            <h2 className="ml-4 lg:ml-10 font-bold text-2xl lg:text-3xl mt-4 md:text-left text-center font-[Poppins]">
              User Profile
            </h2>

            {/* Profile Avatar and Name */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full text-center text-4xl lg:text-6xl text-white font-bold flex justify-center items-center m-5 bg-green-800">
                {firstLetter}
              </div>
              <span className="text-center lg:text-left mt-8">
                <p className="font-bold text-lg">{user?.fullname}</p>
                <p className="text-lg">{user?.role}</p>
                <button
                  className="rounded-md bg-gray-200 mt-2 p-2 text-sm hover:border border-green-400 hover:bg-gray-300"
                  onClick={() => setEdit(true)}
                >
                  ✏️ Edit Profile
                </button>
              </span>
            </div>

            {/* Editable Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-y-6 lg:gap-y-10 gap-x-4">
              <TextField
                fieldName="fullname"
                Icon={User}
                fieldValue={user?.fullname}
                edit={edit}
                handleInput={handleInput}
              />
              <TextField
                fieldName="email"
                Icon={Mail}
                fieldValue={user?.email}
                edit={edit}
                handleInput={handleInput}
              />
              <TextField
                fieldName="phone"
                Icon={Phone}
                fieldValue={user?.phone}
                edit={edit}
                handleInput={handleInput}
              />
              <TextField
                fieldName="organization"
                Icon={Building}
                fieldValue={user?.organization}
                edit={edit}
                handleInput={handleInput}
              />
            </div>

            {/* Submit Button */}
            {edit && (
              <div className="mt-8 lg:mt-12 self-center lg:relative lg:left-[67%] w-fit">
                <BtnLoader
                  text="Submit"
                  btnLoader={btnLoader}
                  onClick={handleSubmit}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Reusable Input Field Component
function TextField({ fieldName, Icon, fieldValue, edit, handleInput }) {
  return (
    <div>
      <p className="font-semibold text-[1.1rem] ml-2 mb-1 capitalize">
        {fieldName}
      </p>
      <div
        className={`flex items-center text-xs p-1.5 border-[1.7px] ${
          edit ? "border-red-700" : "border-gray-800"
        } rounded-md w-[60%] focus-within:border-green-700`}
      >
        <Icon className="w-4 h-4 mr-1.5 text-gray-600" />
        <input
          type="text"
          name={fieldName}
          value={fieldValue || ""}
          onChange={handleInput}
          className="border-none focus:outline-none text-[0.9rem] p-0.5 w-full"
          disabled={!edit}
        />
      </div>
    </div>
  );
}

export default Myprofile;
