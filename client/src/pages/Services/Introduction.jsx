import { ThumbsUp, ShoppingBag, Users, Lightbulb } from "lucide-react";

function Introduction() {
  const steps = [
    {
      number: "01",
      icon: ThumbsUp,
      title: "Food Collection",
      description:
        "We collect surplus food from restaurants, grocery stores, and events to ensure good food doesn't go to waste.",
    },
    {
      number: "02",
      icon: ShoppingBag,
      title: "Food Distribution",
      description:
        "Collected food is connected with shelters, food banks, and communities where it can make a real difference.",
    },
    {
      number: "03",
      icon: Lightbulb,
      title: "Awareness",
      description:
        "We encourage communities to understand food waste and discover simple ways to become part of the solution.",
    },
    {
      number: "04",
      icon: Users,
      title: "Community Support",
      description:
        "Donors, volunteers, and recipients work together to make food sharing more accessible and meaningful.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      {/* Background decoration */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-brand-50/70 blur-3xl" />
      <div className="absolute -right-40 bottom-10 h-80 w-80 rounded-full bg-accent-50/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            How We Create Impact
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            From kindness
            <span className="block text-brand-600">
              to meaningful connection.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            FoodSecure brings people together around a simple idea: good food
            should reach people who need it instead of going to waste.
          </p>
        </div>

        {/* Process */}
        <div className="relative mt-16">

          {/* Connecting line - desktop */}
          <div className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-stone-200 lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >
                  {/* Step indicator */}
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-brand-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-700">
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Card */}
                  <div className="mt-7 rounded-3xl border border-stone-200/70 bg-white p-7 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-brand-200 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]">

                    {/* Number */}
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
                      Step {step.number}
                    </span>

                    {/* Title */}
                    <h3 className="mt-3 text-xl font-bold text-stone-900">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-6 text-stone-600">
                      {step.description}
                    </p>

                    {/* Accent */}
                    <div className="mx-auto mt-6 h-1 w-8 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-14" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-14 max-w-4xl text-center">
          <p className="text-base font-medium leading-7 text-stone-500 sm:text-lg">
            Every contribution plays a role in turning surplus food into
            nourishment, connection, and hope.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Introduction;