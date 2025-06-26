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
    color: "text-green-600",
    title: "Campaign Creation",
    description:
      "Donors can easily create food donation campaigns with relevant details and timelines.",
  },
  {
    icon: Link2,
    color: "text-blue-600",
    title: "Recipient Applications",
    description:
      "Individuals or NGOs can apply for available food campaigns based on location and need.",
  },
  {
    icon: Clock,
    color: "text-yellow-600",
    title: "Scheduled Donations",
    description:
      "Set up recurring donations to support consistent food support efforts.",
  },
  {
    icon: AlertTriangle,
    color: "text-red-600",
    title: "Emergency Response",
    description:
      "Enable rapid food distribution during emergencies or disaster relief situations.",
  },
  {
    icon: ShieldCheck,
    color: "text-purple-600",
    title: "Food Quality Assurance",
    description:
      "Ensure donated food is fresh, safe, and meets hygiene standards.",
  },
  {
    icon: Users,
    color: "text-pink-600",
    title: "Communication System",
    description:
      "Seamless in-app chat and updates between donors and recipients.",
  },
  {
    icon: Heart,
    color: "text-indigo-600",
    title: "Status Tracking",
    description:
      "Real-time updates on campaign progress, recipient acceptance, and delivery.",
  },
  {
    icon: UserCheck,
    color: "text-orange-600",
    title: "User Profiles & History",
    description:
      "Maintain detailed profiles for donors and recipients, including donation and participation history.",
  },
];

function OurServices() {
  // Render the Services section with a title, description, and a grid of service cards
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 my-10 md:pb-20 pb-10">
      <div className="text-center">
        {/* Section heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800 mt-20 font-[Poppins]">
          Engage, Contribute, and Track
        </h2>
        {/* Section description */}
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
          Create a personalized profile, manage your donations, and keep track
          of your contributions, ensuring a meaningful impact every step of the
          way.
        </p>
        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mx-auto">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              // Individual service card
              <div
                key={index}
                className="group relative bg-white p-6 sm:p-8 rounded-lg shadow-2xl text-center border border-gray-300 transform transition duration-300 ease-in-out hover:scale-105"
              >
               <span className="absolute bottom-0 left-1/2 w-0 h-[4px] rounded bg-green-800 transition-all duration-700 ease-out transform -translate-x-1/2 group-hover:w-full"></span>
                {/* Service icon */}
                <Icon
                  className={`mx-auto ${service.color} mb-4 h-10 w-10 sm:h-12 sm:w-12`}
                />
                {/* Service title */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {service.title}
                </h3>
                {/* Service description */}
                <p className="text-sm sm:text-base text-gray-600">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OurServices;
