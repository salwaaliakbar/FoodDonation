import { Shield, Leaf, Globe, Users } from 'lucide-react';

function OurValue () {
  return (
    // Main section wrapper
    <section className=" my-20 md:pb-20 pb-10">

      {/* Section Heading */}
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center font-[Poppins]">
        The Core Values That Drive Our Mission
      </h2>

      {/* Introductory paragraph */}
      <p className="text-center text-gray-600 mb-8 text-lg">
        These core principles guide our work and shape our approach to creating food security.
      </p>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:mx-20 mx-10 mt-15">

        {/* Value Card 1 */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-2 border-green-500 transform transition duration-300 ease-in-out hover:scale-105">
          <Shield className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 pb-4">Food as a Right</h3>
          <p className="text-gray-600">
            We believe access to nutritious food is a fundamental human right, not a privilege.
          </p>
        </div>

        {/* Value Card 2 */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-2 border-green-500 transform transition duration-300 ease-in-out hover:scale-105">
          <Leaf className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 pb-4">Environmental Stewardship</h3>
          <p className="text-gray-600">
            Food systems must work in harmony with nature for long-term sustainability.
          </p>
        </div>

        {/* Value Card 3 */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-2 border-green-500 transform transition duration-300 ease-in-out hover:scale-105">
          <Users className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 pb-4">Community-Led Solutions</h3>
          <p className="text-gray-600">
            Local communities know their needs best and should lead in developing solutions.
          </p>
        </div>

        {/* Value Card 4 */}
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-2 border-green-500 transform transition duration-300 ease-in-out hover:scale-105">
          <Globe className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 pb-4">Global Solidarity</h3>
          <p className="text-gray-600">
            Food security challenges require collaborative action across borders.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default OurValue;
