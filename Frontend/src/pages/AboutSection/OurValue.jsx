import { Shield, Leaf, Globe, Users } from 'lucide-react';

function OurValue () {
  return (
    <section className=" my-20">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">The Core Values That Drive Our Mission</h2>
      <p className="text-center text-gray-600 mb-8 text-lg">These core principles guide our work and shape our approach to creating food security.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:mx-20 mx-10 mt-15">
        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-2 border-green-500">
          <Shield className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Food as a Right</h3>
          <p className="text-gray-600">We believe access to nutritious food is a fundamental human right, not a privilege.</p>
        </div>

        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-2 border-green-500">
          <Leaf className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Environmental Stewardship</h3>
          <p className="text-gray-600">Food systems must work in harmony with nature for long-term sustainability.</p>
        </div>

        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-2 border-green-500 ">
          <Users className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Community-Led Solutions</h3>
          <p className="text-gray-600">Local communities know their needs best and should lead in developing solutions.</p>
        </div>

        <div className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md border-2 border-green-500">
          <Globe className="h-16 w-16 text-green-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">Global Solidarity</h3>
          <p className="text-gray-600">Food security challenges require collaborative action across borders.</p>
        </div>
      </div>
    </section>
  );
};

export default OurValue;
