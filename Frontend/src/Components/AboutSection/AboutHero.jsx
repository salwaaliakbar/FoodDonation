import React from "react";
import { HandHeart, Users, Award, ChartBar } from "lucide-react";

function AboutHero () {
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
    <div className="relative bg-green-700 text-white py-15 mb-5">
        <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c')] bg-cover bg-center"></div>
        </div>
        <div className="mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl">
                <h1 className="text-4xl font-serif md:text-6xl font-bold mb-8">
                    About FoodSecure
                </h1>
                <p className="text-xl mb-12 leading-relaxed">
                    Bridging the gap between food abundance and scarcity, we're creating a community 
                    where no one goes hungry and no food goes to waste. Our mission is powered by 
                    compassion, driven by efficiency, and sustained by community support.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 bg-white/20  rounded-lg p-4"
                        >
                            {feature.icon}
                            <span className="text-lg">{feature.text}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap md:flex-row flex-col gap-4">
                    <span className="px-6 py-3 bg-white/20 rounded-full text-lg">Food Rescue</span>
                    <span className="px-6 py-3 bg-white/20 rounded-full text-lg">Community Support</span>
                    <span className="px-6 py-3 bg-white/20 rounded-full text-lg">Zero Waste</span>
                    <span className="px-6 py-3 bg-white/20 rounded-full text-lg">Local Impact</span>
                </div>
            </div>
        </div>
    </div>
);
};

export default AboutHero;