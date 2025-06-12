function Journey() {
  return (
    <div className="text-center container mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-700 mb-6 font-poppins">The Story of Our Growth and Impact</h1>
      <p className="text-lg mb-10 text-gray-600 px-4 sm:px-8 lg:px-16">
        Our journey began with a powerful vision: to tackle food waste while
        providing nourishment to those in need. We believe that no one should
        ever go hungry, especially when so much food is being wasted every day.
        Together, we can create a world where surplus food reaches those who
        need it most. Join us in our mission to make a lasting impact and build
        a hunger-free future!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 sm:p-8">
        <div className="text-left flex items-start">
          <h1 className="bg-green-700 mt-2 mb-10 p-3 mr-4 rounded-full w-16 text-center text-white font-medium">
            2020
          </h1>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">The Beginning</h1>
            <p className="text-gray-700">
              Started as a small community initiative during the pandemic
            </p>
          </div>
        </div>
        <div className="text-left flex items-start">
          <h1 className="bg-green-700 mt-2 mb-10 p-3 mr-4 rounded-full w-16 text-center text-white font-medium">
            2021
          </h1>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Growing Impact</h1>
            <p className="text-gray-700">
              Expanded to partner with local restaurants and grocery stores
            </p>
          </div>
        </div>
        <div className="text-left flex items-start">
          <h1 className="bg-green-700 mt-2 mb-10 p-3 mr-4 rounded-full w-16 text-center text-white font-medium">
            2022
          </h1>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Tech Integration</h1>
            <p className="text-gray-700">
              Launched our digital platform for efficient food sharing
            </p>
          </div>
        </div>
        <div className="text-left flex items-start">
          <h1 className="bg-green-700 mt-2 mb-10 p-3 mr-4 rounded-full w-16 text-center text-white font-medium">
            2023
          </h1>
          <div>
            <h1 className="text-gray-800 text-lg font-bold">Community Hub</h1>
            <p className="text-gray-700">
              Became the city's largest food rescue network
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journey;
