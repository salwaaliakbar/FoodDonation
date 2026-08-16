import React from "react";
import {
  Megaphone,
  Link2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Users,
  Heart,
  UserCheck,
} from "lucide-react";

const servicesData = [
  {
    icon: Megaphone,
    title: "Campaign Creation",
    description:
      "Donors can easily create food donation campaigns with relevant details and timelines.",
  },
  {
    icon: Link2,
    title: "Recipient Applications",
    description:
      "Individuals or NGOs can apply for available food campaigns based on location and need.",
  },
  {
    icon: Clock,
    title: "Scheduled Donations",
    description:
      "Set up recurring donations to support consistent food support efforts.",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Response",
    description:
      "Enable rapid food distribution during emergencies or disaster relief situations.",
  },
  {
    icon: ShieldCheck,
    title: "Food Quality Assurance",
    description:
      "Ensure donated food is fresh, safe, and meets hygiene standards.",
  },
  {
    icon: Users,
    title: "Communication System",
    description:
      "Seamless in-app chat and updates between donors and recipients.",
  },
  {
    icon: Heart,
    title: "Status Tracking",
    description:
      "Real-time updates on campaign progress, recipient acceptance, and delivery.",
  },
  {
    icon: UserCheck,
    title: "User Profiles & History",
    description:
      "Maintain detailed profiles for donors and recipients, including donation and participation history.",
  },
];

function OurServices() {
  return (
    <section className="relative overflow-hidden bg-cream-100 py-12 md:py-16">
      {/* Background decoration */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-accent-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            Platform Features
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Everything you need to
            <span className="block text-brand-600">
              make an impact.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            From creating donation campaigns to tracking deliveries, FoodSecure
            provides the tools needed to make food sharing simple, transparent,
            and effective.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-stone-200/70 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
              >
                {/* Number */}
                <span className="absolute right-6 top-5 text-5xl font-black tracking-tight text-stone-100 transition-colors duration-300 group-hover:text-brand-50">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-100">
                  <Icon
                    className="h-7 w-7"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Content */}
                <div className="mt-7">
                  <h3 className="text-xl font-bold leading-tight text-stone-900">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-stone-600">
                    {service.description}
                  </p>
                </div>

                {/* Bottom indicator */}
                <div className="mt-7">
                  <div className="h-1 w-8 rounded-full bg-brand-500 transition-all duration-300 group-hover:w-14" />
                </div>
              </div>
            );
          })}
        </div>
        </div>
    </section>
  );
}

export default OurServices;