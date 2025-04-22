import donation from "../assets/images/donation.webp";
function OurVision() {
  return (
    <>
      <div className="bg-green-800 w-full flex h-lg text-white">
        <div className="flex flex-col justify-center items-center w-200 p-10">
          <div className="text-4xl font-bold font-serif mb-3 ">Our Vision: A World Without Hunger</div>
          <div className="text-white mb-6 max-w-2xl text-[18px]">
            At FoodSecure, we are committed to ending hunger and nourishing
            communities around the globe. We collaborate with local food banks,
            shelters, and community organizations to provide food to those in
            need. Through our efforts, we aim to raise awareness and promote
            sustainable solutions that tackle hunger at its roots. Together, we
            can create a future where no one goes to bed hungry.
          </div>
        </div>
        <div>
          <img
            src={donation}
            alt="Our Vision"
            className="w-80 object-cover mt-20 mb-10"
          />
        </div>
      </div>
    </>
  );
}
export default OurVision;
