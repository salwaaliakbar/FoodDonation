import React, { useContext, useState, useEffect } from "react";
import { ChangeContext } from "../../context/ChangeContext";
import { useData } from "../../context/UserContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Label,
} from "recharts";

export default function StatsSection() {
  const {
    isChangeGranted,
    isChangeExpired,
    isLoggedout,
    activeMeals,
    grantedMeals,
    blacklistMeals,
  } = useContext(ChangeContext);

  const { user } = useData();

  const [statsSummary, setStatsSummary] = useState({
    totalDonations: 0,
    granted: 0,
    remaining: 0,
  });

  useEffect(() => {
    async function getStats() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/statSummary/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          const total =
            (data.data?.active || 0) +
            (data.data?.granting || 0) +
            (data.data?.blacklist || 0);

          const granted = data.data?.granting || 0;
          const remaining = total - granted;

          setStatsSummary({
            totalDonations: total,
            granted,
            remaining,
          });
        } else {
          alert(data.error || "Failed to fetch stats summary.")
        }
      } catch (err) {
        console.error("Error while fetching stats summary!", err);
      }
    }

    if (user?._id && isChangeGranted && isChangeExpired && !isLoggedout) {
      getStats();
    } else {
      const total =
        (activeMeals?.length || 0) +
        (grantedMeals?.length || 0) +
        (blacklistMeals?.length || 0);

      const granted = grantedMeals?.length || 0;
      const remaining = total - granted;

      setStatsSummary({ totalDonations: total, granted, remaining });
    }
  }, [user, isChangeGranted, isChangeExpired, isLoggedout, activeMeals]);

  const pieData = [
    { name: "Granted", value: statsSummary.granted },
    { name: "Not Granted", value: statsSummary.remaining },
  ];

  const COLORS = ["#15803d", "#d1d5db"]; // green and gray

  const awardData = [
    { event: "Jan", count: 3 },
    { event: "Feb", count: 5 },
    { event: "Mar", count: 6 },
    { event: "Apr", count: 4 },
    { event: "May", count: 7 },
  ]; // 🔧 Replace with actual dynamic data if needed

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[50vh] gap-4 mt-4">
      {/* Pie Chart - Meals Granted Summary */}
      <div className="w-full lg:w-[30%] bg-white rounded-xl shadow-md p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <h2 className="text-green-700 font-semibold text-lg">
            Meals Granted: {statsSummary.granted}
          </h2>
          <span>{new Date().toLocaleDateString()}</span>
        </div>

        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              startAngle={90}
              endAngle={-270}
              isAnimationActive={true}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-0 text-center">
          <span className="text-lg font-semibold text-green-700">
            Total Donations: {statsSummary.totalDonations}
          </span>
        </div>
      </div>

      {/* Bar Chart - Monthly Distribution */}
      <div className="w-full lg:w-[70%] bg-white rounded-xl shadow-md p-4">
        <h2 className="text-green-700 font-semibold text-lg mb-2">
          Food Distribution Stats
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={awardData}
            margin={{ top: 20, right: 20, left: 10, bottom: 30 }}
          >
            <XAxis dataKey="event" stroke="#4b5563">
              <Label value="Months" offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis stroke="#4b5563">
              <Label
                value="People Fed"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#15803d"
              barSize={25}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
