// OurVision section: outlines mission and long-term goal
function OurVision() {
  return (
    <section className="w-full py-12 md:py-16 text-white relative bg-brand-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c')] bg-cover bg-center"></div>
      </div>

      {/* Main content */}
      <div className="relative flex flex-col justify-center items-center max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-accent-400 font-semibold uppercase tracking-wide text-sm mb-4">
          Our Vision
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-center">
          A World Without Hunger
        </h2>
        <p className="text-white/80 text-base md:text-lg text-center leading-relaxed">
          At FoodSecure, we are dedicated to eradicating hunger and fostering nourishment across communities worldwide. We work hand-in-hand with local food banks, shelters, and community organizations to ensure that food reaches those who need it most. Our mission goes beyond just providing meals—we are focused on raising awareness and driving sustainable solutions that address the root causes of hunger. Through collective action, we strive to build a future where every individual has access to nutritious food, and no one is left hungry.
        </p>
      </div>
    </section>
  );
}

export default OurVision;
