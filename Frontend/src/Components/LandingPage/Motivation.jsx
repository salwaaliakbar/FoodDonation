import React from "react";
import free from "../../assets/images/puzzle.png";
import donate from "../../assets/images/food-donation.png";
import help from "../../assets/images/give-love.png";

function Motivation() {
  return (
    <div className="bg-gray-100 my-20 flex flex-col items-center justify-center">
      <div className="text-center max-w-full">
        <div className="">
          <h1 className="px-6 text-2xl sm:text-3xl font-bold text-gray-800 mb-4 font-poppins">
            Every day, we provide meals to thousands in need.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 mx-4 sm:mx-6 lg:px-40">
            Join our mission to fight hunger and make a difference in the lives
            of those facing food insecurity. It's easier than ever to donate and
            help those in need.
          </p>
        </div>
        {/* Statistics Section */}
        <div className="bg-[rgba(255,193,7,0.2)] w-full shadow-md py-4 sm:py-6 mt-10 sm:mt-20">
          <ul className="space-y-4 text-left flex flex-col sm:flex-row justify-evenly m-3">
            <li className="flex items-center">
              <img className="text-green-500 font-bold text-xl mr-2 w-6 h-6 sm:w-7 sm:h-7" src={free} alt="No fees"></img>
              <span className="text-gray-700 text-sm sm:text-base">
                No fees – your full donation helps those in need
              </span>
            </li>
            <li className="flex items-center">
              <img className="text-green-500 font-bold text-xl mr-2 w-6 h-6 sm:w-7 sm:h-7" src={donate} alt="Meal provided"></img>
              <span className="text-gray-700 text-sm sm:text-base">
                A meal is provided every minute
              </span>
            </li>
            <li className="flex items-center">
              <img className="text-green-500 font-bold text-xl mr-2 w-6 h-6 sm:w-7 sm:h-7" src={help} alt="Food support"></img>
              <span className="text-gray-700 text-sm sm:text-base">
                Thousands of families get food support daily
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Motivation;
