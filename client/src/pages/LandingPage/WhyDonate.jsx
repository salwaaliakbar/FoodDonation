import pic1 from "../../assets/images/love.png";
import pic2 from "../../assets/images/heart.png";
import pic3 from "../../assets/images/group.png";

// WhyDonate section: highlights key reasons for contributing to FoodSecure
function WhyDonate() {
  return (
    <div className="py-16">
      <div className="text-center mx-2">
        <h2 className="text-4xl text-gray-800 mb-6 font-[Poppins]">
          Why Donate with FoodSecure?
        </h2>
        <p className="text-lg mb-6 text-gray-600">
          Every donation counts, no matter how small. Your support ensures
          that no one goes hungry.
        </p>

        {/* Cards grid layout */}
        <div className="mx-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-5 gap-10 mt-20">
          
          {/* Card 1: Fight Hunger Locally */}
          <div className="mx-3 md:ml-20 rounded-lg border-2 border-green-500 shadow-lg p-8 flex flex-col items-center transform transition duration-300 ease-in-out hover:scale-105">
            <div className="p-2 bg-green-200 rounded-full mb-3">
              <img src={pic1} className="w-10 h-10" />
            </div>
            <div className="text-gray-800 font-bold text-2xl text-center">
              Fight Hunger Locally
            </div>
            <p className="mt-10 text-gray-800 text-lg text-center">
              Your food donation directly helps neighbors in need within your
              community, making an immediate difference.
            </p>
          </div>

          {/* Card 2: Reduce Food Waste */}
          <div className="mx-3 md:mx-10 rounded-lg border-2 border-green-500 shadow-lg p-8 flex flex-col items-center transform transition duration-300 ease-in-out hover:scale-105">
            <div className="p-2 bg-green-200 rounded-full mb-3">
              <img src={pic2} className="w-10 h-10" />
            </div>
            <div className="text-gray-800 font-bold text-2xl text-center">
              Reduce Food Waste
            </div>
            <p className="mt-10 text-gray-800 text-lg text-center">
              Donating surplus food prevents it from ending up in landfills,
              helping the environment and reducing waste.
            </p>
          </div>

          {/* Card 3: Build Communities */}
          <div className="mx-3 md:mr-20 rounded-lg border-2 border-green-500 shadow-lg p-8 flex flex-col items-center transform transition duration-300 ease-in-out hover:scale-105">
            <div className="p-2 bg-green-200 rounded-full mb-3">
              <img src={pic3} className="w-10 h-10" />
            </div>
            <div className="text-gray-800 font-bold text-2xl text-center">
              Build Communities
            </div>
            <p className="mt-10 text-gray-800 text-lg text-center">
              Donations create connections, support families, and foster hope
              for those facing tough times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyDonate;
