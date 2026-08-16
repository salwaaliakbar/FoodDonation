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

  const stats = [
    {
      img: pic1,
      value: "45,200+",
      label: "Meals Donated",
      description: "Meals shared with people in need",
    },
    {
      img: pic2,
      value: "3,780",
      label: "Active Donors",
      description: "People making a difference",
    },
    {
      img: pic3,
      value: "3,780",
      label: "Recipients Helped",
      description: "People receiving support",
    },
    {
      img: pic4,
      value: "25",
      label: "Communities Served",
      description: "Communities connected",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-cream-50 py-12 md:py-16">
      {/* Background decoration */}
      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-brand-100/40 blur-3xl" />
      <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-accent-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            Our Impact
          </span>

          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
            Together, we're making
            <span className="block text-brand-600">
              a measurable difference.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
            Every donation creates an impact. See how our community is growing
            and helping connect surplus food with people who need it.
          </p>
        </div>

        {/* Main Chart Card */}
        <div className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-3xl border border-stone-200/70 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.06)]">

          {/* Chart */}
          <div className="px-4 pb-6 sm:px-8 sm:pb-8">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={GROWTH_DATA}
                margin={{ left: 0, right: 10, top: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="colorMeals"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="#f97316"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="100%"
                      stopColor="#f97316"
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#78716c", fontSize: 12 }}
                  dy={10}
                />

                <YAxis hide />

                <Tooltip
                  cursor={{
                    stroke: "#fed7aa",
                    strokeWidth: 1,
                  }}
                  contentStyle={{
                    background: "#ffffff",
                    border: "1px solid #f5f5f4",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    padding: "10px 14px",
                  }}
                  labelStyle={{
                    color: "#44403c",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="meals"
                  stroke="#f97316"
                  strokeWidth={3}
                  fill="url(#colorMeals)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    strokeWidth: 3,
                    stroke: "#fff",
                    fill: "#f97316",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div className="mt-2 flex items-center justify-center gap-2">
              <span className="text-xs text-stone-400">
                Continuous growth powered by our community
              </span>
            </div>
          </div>
        </div>

        {/* KPI Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group rounded-3xl border border-stone-200/70 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-brand-200 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:p-6"
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={stat.img}
                  alt=""
                  className="h-7 w-7 object-contain"
                />
              </div>

              {/* Value */}
              <div className="mt-5">
                <p className="text-2xl font-extrabold tracking-tight text-stone-900 sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm font-bold text-stone-700">
                  {stat.label}
                </p>

                <p className="mt-2 hidden text-xs leading-5 text-stone-500 sm:block">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-10 text-center">
          <p className="text-sm font-medium text-stone-500">
            Every number represents a person, a meal, and an opportunity to
            make a difference.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Statistics; 