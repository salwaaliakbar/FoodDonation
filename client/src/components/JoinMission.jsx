import React from "react";
import { HandHeart, CircleUser, Award } from "lucide-react";

function JoinMission() {
  return (
    // Section with green background and white text
    <div className="relative bg-green-700 text-white py-15 overflow-hidden z-0">
      {/* Faded background image */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c')] bg-cover bg-center"></div>
      </div>

      {/* Main content wrapper with padding */}
      <div className="mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[Poppins]">
            Join Our Mission Today
          </h2>

          {/* Intro paragraph */}
          <p className="text-xl mb-12 leading-relaxed">
            Whether you're a restaurant, business, or individual, your
            contribution can make a real difference in someone's life. Together,
            we can create a hunger-free community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto px-2">
            {/* Donor card */}
            <div className="bg-white/20 rounded-xl p-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-white/30 shadow-lg hover:shadow-2xl">
              <HandHeart className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Become a Donor</h3>
              <p className="mb-6">
                Share your surplus food with those in need. Every donation
                counts in our fight against hunger.
              </p>
            </div>

            {/* Recipient card */}
            <div className="bg-white/20 rounded-xl p-8 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-white/30 shadow-lg hover:shadow-2xl">
              <CircleUser className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Become a Recipient</h3>
              <p className="mb-6">
                If you're in need of food assistance, join us today and receive
                the help you deserve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinMission;
