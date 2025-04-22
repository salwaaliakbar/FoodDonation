function Navbar() {
  return (
    <>
      <div className="flex justify-between p-4 bg-white">
        <div className="text-2xl font-bold text-green-700 cursor-pointer">
          <span className="font-serif text-3xl">Food</span>
          <span className="font-cursive text-4xl">
            <span className="text-5xl text-green-700">S</span>ecure
          </span>
        </div>

        <ul className="flex justify-between text-xl font-semibold text-black mt-2">
          <li className="cursor-pointer p-3">About</li>
          <li className="cursor-pointer p-3">Services</li>
          <li className="cursor-pointer p-3">Blog</li>
          <li className="cursor-pointer p-3">Contact Us</li>
        </ul>
        <button className="bg-green-700 px-10 rounded text-lg font-medium hover:bg-green-600 cursor-pointer h-12 mr-4 text-white mt-2">
          Login
        </button>
      </div>
    </>
  );
}
export default Navbar;
