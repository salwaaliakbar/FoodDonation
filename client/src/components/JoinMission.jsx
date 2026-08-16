import React from "react";
import { HandHeart, CircleUser, Award } from "lucide-react";

function JoinMission() {
  return (
    // Section with dark brand background and white text
    <div className="relative bg-brand-900 text-white py-16 md:py-24 overflow-hidden z-0">
      {/* Faded background image */}
      <div className="absolute inset-0 opacity-5 ">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c')] bg-cover bg-center"></div>
      </div>

      {/* Main content wrapper with padding */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Accent eyebrow */}
          <span className="inline-block bg-accent-500/20 text-accent-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Get Involved
          </span>

          {/* Main heading */}
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Join Our Mission Today
          </h2>

          {/* Intro paragraph */}
          <p className="text-lg md:text-xl mb-12 leading-relaxed text-brand-50/90">
            Whether you're a restaurant, business, or individual, your
            contribution can make a real difference in someone's life. Together,
            we can create a hunger-free community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Donor card */}
            <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 shadow-sm hover:shadow-xl">
              <div className="bg-white/10 rounded-full p-4 w-fit mx-auto mb-4">
                <HandHeart className="h-8 w-8 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Become a Donor</h3>
              <p className="text-brand-50/80">
                Share your surplus food with those in need. Every donation
                counts in our fight against hunger.
              </p>
            </div>

            {/* Recipient card */}
            <div className="bg-white/10 border border-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 shadow-sm hover:shadow-xl">
              <div className="bg-white/10 rounded-full p-4 w-fit mx-auto mb-4">
                <CircleUser className="h-8 w-8 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Become a Recipient</h3>
              <p className="text-brand-50/80">
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
