import Navbar from "./NavBar";

function HeroSection() {
  return (
    <>
      <div className="relative bg-[url('./assets/images/HeroSectionImage.webp')] h-screen bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10">
          <div className="h-screen flex flex-col justify-center items-center">
            <div className="text-4xl text-green-700 font-bold font-serif mb-3 mt-30">
              Nourish a Life, Kill Hunger
            </div>
            <div className="text-white mb-6 max-w-lg text-center text-[18px]">
              Join us in the mission to end hunger, one meal at a time. Your
              donation can make a difference in someone's life.
            </div>
            <button className=" bg-green-700 px-4 py-2 w-40 rounded-xl text-xl text-center hover:bg-green-600 cursor-pointer">
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default HeroSection;
