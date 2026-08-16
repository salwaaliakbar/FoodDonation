import pic1 from "../../assets/images/love.png";
import pic2 from "../../assets/images/heart.png";
import pic3 from "../../assets/images/group.png";

// WhyDonate section: highlights key reasons for contributing to FoodSecure
function WhyDonate() {
  const reasons = [
    {
      number: "01",
      image: pic1,
      title: "Fight Hunger Locally",
      description:
        "Your food donation directly helps people and families in your community, creating an immediate and meaningful impact.",
    },
    {
      number: "02",
      image: pic2,
      title: "Reduce Food Waste",
      description:
        "Give surplus food a second purpose instead of letting it go to waste, while helping create a more sustainable community.",
    },
    {
      number: "03",
      image: pic3,
      title: "Build Stronger Communities",
      description:
        "Food sharing creates connections, supports families, and brings people together through compassion and generosity.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-8 md:py-12">
      {/* Decorative background */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-50/70 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-accent-50/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            Why FoodSecure?
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            One donation.
            <span className="block text-brand-600">
              Three powerful impacts.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Every contribution, no matter the size, can help put food on a
            table, reduce waste, and create a stronger community.
          </p>
        </div>

        {/* Reasons */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white p-7 shadow-[0_8px_35px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] sm:p-8"
            >
              {/* Number */}
              <div className="absolute right-6 top-5 text-5xl font-black text-stone-100 transition-colors duration-300 group-hover:text-brand-50">
                {reason.number}
              </div>

              {/* Icon */}
              <div className="relative mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-100">
                <img
                  src={reason.image}
                  alt=""
                  className="h-10 w-10 object-contain"
                />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold leading-tight text-stone-900">
                {reason.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-stone-600">
                {reason.description}
              </p>

              {/* Bottom accent */}
              <div className="mt-7 flex items-center gap-2">
                <span className="h-1 w-8 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-14" />
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Make an impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyDonate;