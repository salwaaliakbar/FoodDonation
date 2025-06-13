import { ThumbsUp, ShoppingBag, Users, Lightbulb } from "lucide-react";

function Introduction() {
  // service boxes 
  const boxes = [
    {
      id: 1,
      image: ThumbsUp,
      title: "Food Collection",
      description:
        "We collect surplus food from restaurants, grocery stores, and events to ensure it doesn't go to waste.",
      color: 'blue'
    },
    {
      id: 2,
      image: ShoppingBag,
      title: "Food Distribution",
      description:
        "Our team ensures that the collected food reaches shelters, food banks, and communities in need.",
      color: 'green'
    },
    {
      id: 3,
      image: Lightbulb,
      title: "Awareness Campaigns",
      description:
        "We educate communities about food waste and how they can contribute to solving the problem.",
      color: 'red'
    },
    {
      id: 4,
      image: Users,
      title: "Volunteer Support",
      description:
        "Join our network of volunteers to help with food collection, packaging, and distribution.",
      color: 'yellow'
    },
  ];

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

          {/* render all boxes with image, title and description */}
          {boxes.map((value, key) => (
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-2xl text-center border-gray-300 border-1">
              <value.image className={`mx-auto text-${value.color}-500 mb-4 h-10 w-10 md:h-12 md:w-12`} />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Introduction;
