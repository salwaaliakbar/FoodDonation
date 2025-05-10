import { ThumbsUp, ShoppingBag, Users, Lightbulb } from "lucide-react";

function Introduction() {
  return (
    <div className="mx-auto px-4 md:px-6 my-20">
      <div className=" mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          From Kindness to Connection
        </h2>
        <p className="text-xl mb-12 text-gray-600 px-30 text-center">
          Understand the simple yet powerful process that drives our mission —
          from collecting surplus food to delivering it to those who need it
          most, with the help of our amazing donors and volunteers.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mx-8 mt-6">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <ThumbsUp className="mx-auto text-blue-500 mb-4 h-12 w-12" />{" "}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Food Collection
            </h3>
            <p className="text-gray-600">
              We collect surplus food from restaurants, grocery stores, and
              events to ensure it doesn't go to waste.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <ShoppingBag className="mx-auto text-green-500 mb-4 h-12 w-12" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Food Distribution
            </h3>
            <p className="text-gray-600">
              Our team ensures that the collected food reaches shelters, food
              banks, and communities in need.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <Users className="mx-auto text-yellow-500 mb-4 h-12 w-12" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Volunteer Support
            </h3>
            <p className="text-gray-600">
              Join our network of volunteers to help with food collection,
              packaging, and distribution.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <Lightbulb className="mx-auto text-red-500 mb-4 h-12 w-12" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Awareness Campaigns
            </h3>
            <p className="text-gray-600">
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
