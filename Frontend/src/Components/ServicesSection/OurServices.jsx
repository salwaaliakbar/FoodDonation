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

const Services = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 my-10">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800 mt-20">
          Engage, Contribute, and Track
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
          Create a personalized profile, manage your donations, and keep track of your contributions, ensuring a meaningful impact every step of the way.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <Megaphone className="mx-auto text-green-600 mb-4 h-10 w-10 sm:h-12 sm:w-12" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Campaign Creation
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Donors can easily create food donation campaigns with relevant details and timelines.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <Link2 className="mx-auto text-blue-600 mb-4 h-10 w-10 sm:h-12 sm:w-12" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Recipient Applications
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Individuals or NGOs can apply for available food campaigns based on location and need.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <Clock className="mx-auto text-yellow-600 mb-4 h-10 w-10 sm:h-12 sm:w-12" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Scheduled Donations
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Set up recurring donations to support consistent food support efforts.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <AlertTriangle className="mx-auto text-red-600 mb-4 h-10 w-10 sm:h-12 sm:w-12" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Emergency Response
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Enable rapid food distribution during emergencies or disaster relief situations.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <ShieldCheck className="mx-auto text-purple-600 mb-4 h-10 w-10 sm:h-12 sm:w-12" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Food Quality Assurance
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Ensure donated food is fresh, safe, and meets hygiene standards.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <Users className="mx-auto text-pink-600 mb-4 h-10 w-10 sm:h-12 sm:w-12" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Communication System
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Seamless in-app chat and updates between donors and recipients.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <Heart className="mx-auto text-indigo-600 mb-4 h-10 w-10 sm:h-12 sm:w-12" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Status Tracking
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Real-time updates on campaign progress, recipient acceptance, and delivery.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <UserCheck className="mx-auto text-orange-600 mb-4 h-10 w-10 sm:h-12 sm:w-12" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              User Profiles & History
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Maintain detailed profiles for donors and recipients, including donation and participation history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
