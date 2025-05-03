import React, { useState } from "react";
import SideBar from "./DonorSidebar";
import Header from "./DonorHeader";
import { Phone, Mail, User, Building } from "lucide-react"; // Import Lucide icons
import { useData } from "../ContextAPIs/UserContext";

const Myprofile = () => {
  const { user, setUser } = useData();
  const [edit, setEdit] = useState(false);

  function handleInput(e) {
    const { name, value } = e.target;

    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    try {
      const response = await fetch("http://localhost:5000/api/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: 'include',
      });
      const data = await response.json();
      console.log(data)
      if (data.success) {
        alert("Profile Updated Successfully");
        setEdit(!edit);
      } else {
        alert("Error updating profile: " + data.error);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred while updating the profile.");
    }
  }

  const firstLetter = user?.fullname
    ? user?.fullname.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="flex">
      <SideBar />
      <div className="w-[80%] absolute right-0">
        <Header />
        <div className="w-[85%] m-auto border-[1px] border-gray-200 rounded-md mt-6 p-4">
          <h2 className="ml-10 font-bold text-2xl">User Profile</h2>
          <div className="flex">
            <div
              className="w-32 h-32 rounded-full object-cover text-center text-6xl text-white font-bold flex justify-center items-center m-5 bg-green-800"
            >
              {firstLetter}
            </div>
            <span className="content-center">
              <p className="font-bold text-lg">{user.fullname}</p>
              <p className="text-lg">{user.role}</p>
              <button
                className="rounded-md bg-gray-200 mt-2 p-2 text-[0.8rem] hover:border-[1px] border-green-400 hover:bg-gray-300"
                onClick={() => setEdit(true)}
              >
                ✏️ Edit Profile
              </button>
            </span>
          </div>
          <div className="grid grid-cols-2 mt-8 ml-4 gap-y-10">
            <TextField
              fieldName="fullname"
              Icon={User}
              fieldValue={user.fullname}
              edit={edit}
              handleInput={handleInput}
            />
            <TextField
              fieldName="email"
              Icon={Mail}
              fieldValue={user.email}
              edit={edit}
              handleInput={handleInput}
            />
            <TextField
              fieldName="phone"
              Icon={Phone}
              fieldValue={user.phone}
              edit={edit}
              handleInput={handleInput}
            />
            <TextField
              fieldName="organization"
              Icon={Building}
              fieldValue={user.organization}
              edit={edit}
              handleInput={handleInput}
            />
          </div>
          {edit ? (
            <button
              className="rounded-md bg-green-800 text-white mt-12 py-2 px-8 text-[1.1rem] border-[1px] border-green-700 hover:bg-green-700 relative left-[67%] cursor-pointer"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

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
          onChange={(e) => handleInput(e)}
          className="border-none focus:outline-none text-[0.9rem] p-0.5 w-full"
          disabled={!edit}
        />
      </div>
    </div>
  );
}

export default Myprofile;
