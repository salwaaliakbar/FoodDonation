import logo from "../assets/images/logo.jpg";  
function Navbar() {
  return (
    <>
        {/* navbaricon */}
      <div className="flex justify-between p-2 bg-white hover:shadow-lg transition-all duration-300 hover:text-green-600">
        {/* <div className="text-2xl font-bold text-green-700 cursor-pointer">
          <span className="font-serif text-3xl">Food</span>
          <span className="font-cursive text-4xl">
            <span className="text-5xl text-green-700">S</span>ecure
          </span>
        </div> */}
        <div>
          <img className="w-80 h-20 rounded-full" src={logo}></img>
        </div>

        {/* ul list item */}
        <ul className="flex justify-between text-xl font-semibold text-black mt-2">
          <li className="cursor-pointer p-3">About</li>
          <li className="cursor-pointer p-3">Services</li>
          <li className="cursor-pointer p-3">Blog</li>
          <li className="cursor-pointer p-3">Contact Us</li>
        </ul>
        {/* button */}
        <button className="bg-green-700 px-10 rounded text-lg font-medium hover:bg-green-600 cursor-pointer h-12 mr-4 text-white mt-3 hover:transform hover:translate-x-2 transition-all duration-300 delay-150">
          Login
        </button>
      </div>
    </>
  );
}
export default Navbar;
