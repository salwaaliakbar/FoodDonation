import React, { useState } from "react";
import SideBar from "./DonorSidebar";
import Header from "./DonorHeader";
import { Phone, Mail, User, Building } from "lucide-react";
import { useData } from "../../context/UserContext";
import { useSecureFetch } from "../../customHooks/useSecureFetch";

const Myprofile = () => {
  const { user, setUser } = useData(); // Access global user context
  const [edit, setEdit] = useState(false); // Edit mode toggle
  const secureFetch = useSecureFetch(); // Authenticated fetch hook

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
    try {
      const data = await secureFetch("http://localhost:5000/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });

      if (data.success) {
        alert("Profile Updated Successfully");
        setEdit(false);
      } else {
        alert(data.error || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred while updating the profile.");
    }
  }

  const firstLetter = user?.fullname?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar if needed */}
      {/* <SideBar /> */}

      <div className="w-full lg:absolute lg:right-0 bg-gray-200">
        <Header />

        <div className="mt-25 w-[90%] lg:w-[85%] m-auto border border-gray-200 bg-white rounded-md p-6 md:mb-8">
          <h2 className="ml-4 lg:ml-10 font-bold text-2xl lg:text-3xl mt-4 md:text-left text-center">
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
            <button
              className="rounded-md bg-green-800 text-white mt-8 lg:mt-12 py-2 px-6 lg:px-8 text-base lg:text-lg border border-green-700 hover:bg-green-700 self-center lg:relative lg:left-[67%] cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
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
          value={fieldValue}
          onChange={handleInput}
          className="border-none focus:outline-none text-[0.9rem] p-0.5 w-full"
          disabled={!edit}
        />
      </div>
    </div>
  );
}

export default Myprofile;
