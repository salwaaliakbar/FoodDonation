import donation from "../assets/images/donation.webp";
function OurVision() {
  return (
    <>
      <div className="w-full py-10 text-white relative bg-green-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c')] bg-cover bg-center"></div>
        </div>
        <div className="flex flex-col justify-center items-center w-300 p-10">
          <div className="text-5xl font-bold font-serif mb-3 ">
            Our Vision: A World Without Hunger
          </div>
          <div className="text-white mb-6 max-2xl text-[20px] px-25 mt-10 ">
          At FoodSecure, we are dedicated to eradicating hunger and fostering nourishment across communities worldwide. We work hand-in-hand with local food banks, shelters, and community organizations to ensure that food reaches those who need it most. Our mission goes beyond just providing meals—we are focused on raising awareness and driving sustainable solutions that address the root causes of hunger. Through collective action, we strive to build a future where every individual has access to nutritious food, and no one is left hungry.
          </div>
        </div>
      </div>
    </>
  );
}
export default OurVision;
