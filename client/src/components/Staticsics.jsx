import pic1 from "../assets/images/growth.png";
import pic2 from "../assets/images/donors.png";
import pic3 from "../assets/images/puzzle-pieces.png";
import pic4 from "../assets/images/database-file.png";
import {
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

function Statistics() {
  const GROWTH_DATA = [
    { month: "Jan", meals: 400 },
    { month: "Feb", meals: 800 },
    { month: "Mar", meals: 1200 },
    { month: "Apr", meals: 1500 },
    { month: "May", meals: 1800 },
    { month: "Jun", meals: 2000 },
  ];

  return (
    <div className="pt-16 text-center pb-36">
      {/* Header */}
      <div className="mb-20 mx-2">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 font-poppins">
          Food Secure Impact at a Glance
        </h2>
        <p className="text-lg mb-6 text-gray-600">
          Empowering communities through sustainable solutions to end hunger
          and ensure food security for all
        </p>
      </div>

      {/* Growth Area Chart */}
      <div className="mx-2">
        <div className="bg-gradient-to-r from-orange-100/30 to-yellow-100/30 rounded-2xl shadow-lg max-w-5xl mx-auto py-10 px-6 mb-10 flex flex-col items-center border-2 border-orange-200">
          <ResponsiveContainer width="100%" minHeight={220} height={260}>
            <AreaChart
              data={GROWTH_DATA}
              margin={{ left: 8, right: 8, top: 16, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#fde1d3" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "white",
                  borderRadius: 10,
                  boxShadow: "0 4px 24px #0002",
                }}
              />
              <Area
                type="monotone"
                dataKey="meals"
                stroke="#f97316"
                strokeWidth={3}
                fill="url(#colorMeals)"
              />
            </AreaChart>
          </ResponsiveContainer>
          <p className="mt-4 text-sm text-gray-600 italic">
            Continuous growth in generous food donations thanks to our amazing
            community.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-20 bg-amber-100 p-4">
        {[
          {
            img: pic1,
            value: "45,200+",
            label: "Meals Donated",
          },
          {
            img: pic2,
            value: "3,780",
            label: "Active Donors",
          },
          {
            img: pic3,
            value: "3,780",
            label: "Happy Recipients",
          },
          {
            img: pic4,
            value: "25",
            label: "Communities Served",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-end gap-6 md:gap-2 m-4"
          >
            <span className="rounded-full bg-white/80 p-2 shadow-md">
              <img src={stat.img} className="w-8 h-8" alt={stat.label} />
            </span>
            <div className="flex flex-col items-center md:items-start">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900 leading-none">
                {stat.value}
              </span>
              <span className="text-sm text-gray-700 font-medium mt-1">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Statistics;
