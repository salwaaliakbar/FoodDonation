import React from "react";
import { HandHeart, Users, Award, ChartBar } from "lucide-react";

function AboutHero() {
  const features = [
    {
      icon: <HandHeart className="h-6 w-6" />,
      text: "Community-Driven Impact"
    },
    {
      icon: <Users className="h-6 w-6" />,
      text: "Volunteer Network"
    },
    {
      icon: <Award className="h-6 w-6" />,
      text: "Award-Winning Program"
    },
    {
      icon: <ChartBar className="h-6 w-6" />,
      text: "Measurable Results"
    }
  ];

  return (
    <div className="relative bg-green-700 text-white py-16 mb-5 z-0 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c')] bg-cover bg-center opacity-20"></div>
      </div>

      {/* Content wrapper aligned left */}
      <div className="relative z-10 w-full px-4 md:px-10 text-left">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 font-[Poppins]">
          About FoodSecure
        </h1>

        <p className="text-lg mb-12 leading-relaxed max-w-3xl">
          Bridging the gap between food abundance and scarcity, we're creating a community 
          where no one goes hungry and no food goes to waste. Our mission is powered by 
          compassion, driven by efficiency, and sustained by community support.
        </p>

        {/* Features list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-4xl">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/20 rounded-lg p-4"
            >
              {feature.icon}
              <span className="text-lg">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-4 max-w-4xl">
          {["Food Rescue", "Community Support", "Zero Waste", "Local Impact"].map((tag, i) => (
            <span key={i} className="px-6 py-3 bg-white/20 rounded-full text-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutHero;
