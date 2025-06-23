import React from "react";
import { useData } from "../context/UserContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const { user } = useData();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();



  const basePath = user.role === 'recipient' ? '/recipent/generalfeed' : '/donorDashBoard/generalfeed';

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 800); // debounce time

    return () => clearTimeout(handler);
  }, [search]);

  // Navigate with search param only when it changes
  useEffect(() => {
    if (debouncedSearch !== '') {
      const targetUrl = `${basePath}?location=${encodeURIComponent(debouncedSearch)}`;
      navigate(targetUrl, { replace: false });
    }
    else if (debouncedSearch === '' && location.pathname === `${basePath}`) {
      // If search is cleared, remove the query param
      const newUrl = `${basePath}`;
      navigate(newUrl);
    }
  }, [debouncedSearch]);

  // Optional: keep input in sync with URL when landing directly
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentLocation = params.get('location');
    if (currentLocation && currentLocation !== search) {
      setSearch(currentLocation);
    }
  }, [location.search]);



  // Get first letter of the user's name (fallback to "U")
  const firstLetter = user?.fullname
    ? user.fullname.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="fixed flex flex-row justify-between items-center h-20 md:h-20 border-b-[1.5px] border-b-green-700 bg-white p-4 md:px-15 md:pl-0 pl-12 md:w-[80%] w-full z-49">

      {/* Search Input */}
      <div className="flex items-center border-2 border-gray-300 rounded-lg p-2 w-[80%] md:w-[50%] mb-4 md:mb-0 md:ml-15 md:mt-0 mt-4">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full px-4 text-lg border-none focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="ml-2 p-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="md:h-5 md:w-5 w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* User Info Section */}
      <div className="flex items-center border-gray-300 rounded-lg p-2 md:w-auto">
        {/* Full name and role - hidden on small screens */}
        <div className="mr-4 text-right md:block hidden">
          <p className="text-md font-semibold">{user?.fullname}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        {/* Avatar Circle */}
        <div>
          <div className="w-11 h-11 rounded-full object-cover text-center text-2xl text-white font-bold flex justify-center items-center bg-green-800 md:ml-0 ml-2">
            {firstLetter}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
