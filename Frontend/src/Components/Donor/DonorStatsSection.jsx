import React, { useContext, useState } from "react";
import { ChangeContext } from "../ContextAPIs/ChangeContext";
import { useEffect } from "react";
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
import { useData } from "../ContextAPIs/UserContext";

export default function StatsSection() {
  const {
    isChangeActive,
    isChangeGranted,
    isChangeExpired,
    isLoggedout,
    activeMeals,
    grantedMeals,
    blacklistMeals,
  } = useContext(ChangeContext);
  const [statsSummary, setStatsSummary] = useState({
    totalDonations: 0,
    granted: 0,
    remaining: 0,
  });

  const { user } = useData();
  useEffect(() => {
    async function getStats() {
      try {
        if (user._id) {
          const response = await fetch(
            `http://localhost:5000/api/statSummary/${user?._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          if (data.success) {
            const td =
              data.data?.active + data.data?.granting + data.data.blacklist;
            const gran = data.data?.granting;
            const rem = td - gran;
            setStatsSummary(() => ({
              totalDonations: td,
              granted: gran,
              remaining: rem,
            }));
          }
        }
      } catch (err) {
        console.error("Error while fetching stats summary!", err);
      }
    }

    if (isChangeGranted && isChangeExpired && !isLoggedout) {
      getStats();
    } else {
      const td =
        activeMeals?.length + grantedMeals?.length + blacklistMeals?.length;
      const gran = grantedMeals?.length;
      const rem = td - gran;
      setStatsSummary(() => ({
        totalDonations: td,
        granted: gran,
        remaining: rem,
      }));
    }
  }, [user]);

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
  ]; // static for now

  return (
    <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[50vh] gap-4 mt-4">
      {/* Pie Chart Section */}
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

        <div className="mt-0">
          <span className="text-lg font-semibold text-green-700">
            Total Donations: {statsSummary.totalDonations}
          </span>
        </div>
      </div>

      {/* Bar Chart Section */}
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
