function Journey() {
  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Started as a small community initiative during the pandemic, driven by a simple goal: connect surplus food with people who need it.",
    },
    {
      year: "2021",
      title: "Growing Impact",
      description:
        "Expanded our network by partnering with local restaurants, grocery stores, and community organizations.",
    },
    {
      year: "2022",
      title: "Tech Integration",
      description:
        "Launched our digital platform to make food sharing faster, simpler, and more accessible.",
    },
    {
      year: "2023",
      title: "Community Hub",
      description:
        "Built a growing food-sharing network that brings donors and recipients together through technology.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      {/* Background decoration */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-brand-50/70 blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent-50/70 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            Our Journey
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            From an idea
            <span className="block text-brand-600">
              to a growing movement.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Our journey began with a simple vision: reduce food waste while
            helping ensure that people in our communities have access to food.
            Every milestone brings us closer to that goal.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="relative mt-20 hidden lg:block">

          {/* Timeline Line */}
          <div className="absolute left-0 right-0 top-7 h-0.5 bg-stone-200" />

          {/* Progress Line */}
          <div className="absolute left-0 top-7 h-0.5 w-full bg-brand-500" />

          <div className="grid grid-cols-4 gap-6">
            {milestones.map((item, index) => (
              <div key={item.year} className="group relative">

                {/* Timeline Point */}
                <div className="relative z-10 mb-10 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-brand-600 text-xs font-extrabold text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-700">
                    {item.year}
                  </div>
                </div>

                {/* Card */}
                <div className="rounded-3xl border border-stone-200/70 bg-white p-6 text-left shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-brand-200 group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                    Milestone {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-stone-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>

                  <div className="mt-6 h-1 w-8 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-14" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile / Tablet Timeline */}
        <div className="relative mt-14 lg:hidden">

          {/* Vertical Line */}
          <div className="absolute bottom-6 left-6 top-6 w-0.5 bg-stone-200" />

          <div className="space-y-8">
            {milestones.map((item, index) => (
              <div
                key={item.year}
                className="group relative flex gap-5"
              >
                {/* Timeline Point */}
                <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-brand-600 text-[10px] font-extrabold text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  {item.year}
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl border border-stone-200/70 bg-white p-5 shadow-[0_6px_25px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:border-brand-200 group-hover:shadow-lg">
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                    Milestone {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-stone-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Message */}
        <div className="mt-14 rounded-3xl bg-stone-900 px-6 py-9 text-center sm:px-10">
          <p className="text-xl font-bold text-white sm:text-2xl">
            The journey continues.
            <span className="text-brand-300">
              {" "}And you can be part of it.
            </span>
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-stone-400">
            Every donor, recipient, volunteer, and supporter helps us take
            another step toward a more food-secure future.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Journey;