import { Shield, Leaf, Globe, Users } from "lucide-react";

function OurValue() {
  const values = [
    {
      number: "01",
      icon: Shield,
      title: "Food as a Right",
      description:
        "We believe access to nutritious food is a fundamental human right, not a privilege.",
    },
    {
      number: "02",
      icon: Leaf,
      title: "Environmental Stewardship",
      description:
        "Food systems must work in harmony with nature for long-term sustainability.",
    },
    {
      number: "03",
      icon: Users,
      title: "Community-Led Solutions",
      description:
        "Local communities know their needs best and should help shape the solutions that serve them.",
    },
    {
      number: "04",
      icon: Globe,
      title: "Global Solidarity",
      description:
        "Food security challenges require collaboration, compassion, and collective action across communities.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-cream-100 py-12 md:py-16">
      {/* Decorative background */}
      <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            What We Stand For
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            The values behind
            <span className="block text-brand-600">
              everything we do.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            These principles guide our decisions, shape our platform, and
            keep our mission focused on creating a more food-secure future.
          </p>
        </div>

        {/* Values */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.number}
                className="group relative overflow-hidden rounded-3xl border border-stone-200/70 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)]"
              >
                {/* Number */}
                <span className="absolute right-6 top-5 text-5xl font-black text-stone-100 transition-colors duration-300 group-hover:text-brand-50">
                  {value.number}
                </span>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-100">
                  <Icon
                    className="h-7 w-7"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Content */}
                <h3 className="mt-7 text-xl font-bold leading-tight text-stone-900">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-600">
                  {value.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-7 flex items-center gap-2">
                  <span className="h-1 w-8 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-14" />

                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                    Our Principle
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OurValue;