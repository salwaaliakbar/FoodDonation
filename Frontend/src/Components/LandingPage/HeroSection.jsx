import Navbar from "../Navbar/NavBar";

function HeroSection() {
  return (
    <>
      <div className="relative bg-[url('./assets/images/hunger.webp')] md:h-screen h-[400px] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
    </>
  );
}
export default HeroSection;
