import { ThumbsUp, ShoppingBag, Users, Lightbulb } from "lucide-react";

function Introduction() {
  return (
    <div className="mx-auto px-4 md:px-6 my-20">
      <div className="mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 font-poppins">
          From Kindness to Connection
        </h2>
        <p className="text-lg md:text-xl mb-12 text-gray-600 px-4 md:px-30 text-center">
          Understand the simple yet powerful process that drives our mission —
          from collecting surplus food to delivering it to those who need it
          most, with the help of our amazing donors and volunteers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mx-4 md:mx-8 mt-6">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <ThumbsUp className="mx-auto text-blue-500 mb-4 h-10 w-10 md:h-12 md:w-12" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              Food Collection
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              We collect surplus food from restaurants, grocery stores, and
              events to ensure it doesn't go to waste.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <ShoppingBag className="mx-auto text-green-500 mb-4 h-10 w-10 md:h-12 md:w-12" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              Food Distribution
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Our team ensures that the collected food reaches shelters, food
              banks, and communities in need.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <Users className="mx-auto text-yellow-500 mb-4 h-10 w-10 md:h-12 md:w-12" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              Volunteer Support
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Join our network of volunteers to help with food collection,
              packaging, and distribution.
            </p>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <Lightbulb className="mx-auto text-red-500 mb-4 h-10 w-10 md:h-12 md:w-12" />
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              Awareness Campaigns
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              We educate communities about food waste and how they can
              contribute to solving the problem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Introduction;
