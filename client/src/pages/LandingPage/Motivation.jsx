import React from "react";
import free from "../../assets/images/puzzle.png";
import donate from "../../assets/images/food-donation.png";
import help from "../../assets/images/give-love.png";

function Motivation() {
  const impactCards = [
    {
      icon: free,
      label: "100% Impact",
      title: "No Hidden Fees",
      description:
        "Every donation goes directly toward helping people facing food insecurity.",
    },
    {
      icon: donate,
      label: "Every Minute",
      title: "A Meal Delivered",
      description:
        "Your support helps us provide nutritious meals to people who need them most.",
    },
    {
      icon: help,
      label: "Every Day",
      title: "Families Supported",
      description:
        "Together, we're helping thousands of families access essential food resources.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-cream-100 py-12 md:py-16">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            Making an Impact Together
          </span>

          <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Every meal can make
            <span className="block text-brand-600">
              a meaningful difference.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Join our mission to fight hunger and support individuals and
            families facing food insecurity. Your contribution helps turn
            compassion into nutritious meals and real community impact.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {impactCards.map((card, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-white/70 bg-white/75 p-7 shadow-[0_10px_40px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)]"
            >
              {/* Icon */}
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="h-8 w-8 object-contain"
                />
              </div>

              {/* Label */}
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-600">
                {card.label}
              </p>

              {/* Title */}
              <h3 className="text-2xl font-bold text-stone-900">
                {card.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {card.description}
              </p>

              {/* Bottom accent */}
              <div className="mt-7 h-1 w-10 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-20" />
            </div>
          ))}
        </div>

        {/* Bottom CTA / Trust Message */}
        <div className="mt-10 rounded-3xl bg-stone-900 px-6 py-8 text-center shadow-xl sm:px-10">
          <p className="text-lg font-semibold text-white sm:text-xl">
            Together, we can help make sure{" "}
            <span className="text-brand-300">no one goes hungry.</span>
          </p>

          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-stone-400">
            Every contribution, big or small, helps create a stronger and more
            caring community.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Motivation;