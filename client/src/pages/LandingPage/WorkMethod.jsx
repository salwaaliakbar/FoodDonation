import gift from "../../assets/images/gift.png";
import search from "../../assets/images/magnifying-glass.png";

// WorkMethod component: Explains how donors and recipients use the platform
function WorkMethod() {
  const donorSteps = [
    {
      number: "01",
      title: "Create an Account",
      description: "Sign up or log in to start making a difference.",
    },
    {
      number: "02",
      title: "List Your Donation",
      description: "Add the food you're able to share with others.",
    },
    {
      number: "03",
      title: "Add Details",
      description: "Provide food information, quantity, location, and photos.",
    },
    {
      number: "04",
      title: "Complete Donation",
      description: "Receive confirmation and coordinate the handover.",
    },
  ];

  const recipientSteps = [
    {
      number: "01",
      title: "Join FoodSecure",
      description: "Create your recipient account and get started.",
    },
    {
      number: "02",
      title: "Find Food",
      description: "Explore available food donations in your area.",
    },
    {
      number: "03",
      title: "Request Items",
      description: "Choose the food items that meet your needs.",
    },
    {
      number: "04",
      title: "Pickup or Delivery",
      description: "Coordinate collection or delivery with the donor.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-gradient-to-b from-accent-50 via-cream-50 to-white py-2 md:py-4"
    >
      {/* Decorative background */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-100/30 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-accent-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            How FoodSecure Works
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Food sharing made
            <span className="block text-brand-600">
              simple and meaningful.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Whether you're sharing extra food or looking for support,
            FoodSecure connects people through a simple and trusted process.
          </p>
        </div>

        {/* Donor & Recipient Cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <MethodCard
            icon={gift}
            title="For Donors"
            subtitle="Turn extra food into meaningful help."
            steps={donorSteps}
          />

          <MethodCard
            icon={search}
            title="For Recipients"
            subtitle="Find available food when you need it."
            steps={recipientSteps}
          />
        </div>

        {/* Bottom Message */}
        <div className="mt-10 text-center">
          <p className="text-sm font-medium text-stone-500">
            Simple for donors. Accessible for recipients.{" "}
            <span className="font-semibold text-brand-600">
              Better for the community.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// Reusable method card
function MethodCard({ icon, title, subtitle, steps }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-stone-200/70 bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_55px_rgba(0,0,0,0.10)] sm:p-8">
      {/* Top gradient */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-400 opacity-70" />

      {/* Card Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 transition-transform duration-300 group-hover:scale-105">
            <img
              src={icon}
              alt=""
              className="h-8 w-8 object-contain"
            />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-stone-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              {subtitle}
            </p>
          </div>
        </div>

        <span className="hidden rounded-full bg-stone-50 px-3 py-1 text-xs font-semibold text-stone-400 sm:block">
          4 Steps
        </span>
      </div>

      {/* Divider */}
      <div className="my-7 h-px bg-stone-100" />

      {/* Steps */}
      <div className="space-y-1">
        {steps.map((step, index) => (
          <StepItem
            key={step.number}
            {...step}
            isLast={index === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

// Reusable step component
function StepItem({ number, title, description, isLast }) {
  return (
    <div className="group/step relative flex gap-4 py-4">
      {/* Connecting line */}
      {!isLast && (
        <div className="absolute left-[19px] top-[52px] h-[calc(100%-20px)] w-px bg-stone-200 transition-colors duration-300 group-hover/step:bg-brand-200" />
      )}

      {/* Number */}
      <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-stone-200 bg-white text-xs font-bold text-stone-400 transition-all duration-300 group-hover/step:border-brand-500 group-hover/step:bg-brand-50 group-hover/step:text-brand-600">
        {number}
      </div>

      {/* Content */}
      <div className="pt-0.5">
        <h4 className="font-bold text-stone-900 transition-colors duration-300 group-hover/step:text-brand-600">
          {title}
        </h4>

        <p className="mt-1 text-sm leading-6 text-stone-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default WorkMethod;