import pic1 from "../assets/images/love.png";
import pic2 from "../assets/images/heart.png";
import pic3 from "../assets/images/group.png";

function WhyDonate() {
  return (
      <div className="py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Why Donate with FoodSecure?
          </h2>
          <p className="text-lg mb-6 text-gray-600">
            Every donation counts, no matter how small. Your support ensures
            that no one goes hungry.
          </p>
          <div className="mx-35 grid grid-cols-3 gap-10 mt-20">
          <div className="rounded-lg border-2 border-green-500 shadow-lg p-8 flex flex-col items-center">

              <div className="p-2 bg-green-200 rounded-full mb-3">
                <img src={pic1} className="w-10 h-10" />
              </div>
              <div className="text-black font-medium text-2xl">
                Fight Hunger Locally
              </div>
              <p className="mt-10 text-gray-800 text-lg">
                Your food donation directly helps neighbors in need within your
                community, making an immediate difference.
              </p>
            </div>
            <div className="rounded-lg border-2 border-green-500 shadow-lg p-8 flex flex-col items-center">
              <div className="p-2 bg-green-200 rounded-full mb-3">
                <img src={pic2} className="w-10 h-10" />
              </div>
              <div className="text-black font-medium text-2xl">
                Reduce Food Waste
              </div>
              <p className="mt-10 text-gray-800 text-lg">
                Donating surplus food prevents it from ending up in landfills,
                helping the environment and reducing waste.
              </p>
            </div>
            <div className="rounded-lg border-2 border-green-500 shadow-lg p-8 flex flex-col items-center">
              <div className="p-2 bg-green-200 rounded-full mb-3">
                <img src={pic3} className="w-10 h-10" />
              </div>
              <div className="text-black font-medium text-2xl">
                Build Communities
              </div>
              <p className="mt-10 text-gray-800 text-lg">
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
