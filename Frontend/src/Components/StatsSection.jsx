import React, { useState } from 'react';
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
  Label
} from 'recharts';

export default function StatsSection({ actives, grants }) {
  const [applied] = useState(actives);
  const [awarded] = useState(grants);

  const [awardData] = useState([
    { event: 'Jan', count: 3 },
    { event: 'Feb', count: 5 },
    { event: 'Mar', count: 6 },
    { event: 'Apr', count: 4 },
    { event: 'May', count: 7 },
  ]);

  const pieData = [
    { name: 'Awarded', value: awarded },
    { name: 'Unawarded', value: applied - awarded },
  ];

  const COLORS = ['#15803d', '#d1d5db']; // green and light gray

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-[40vh] gap-6 mt-4">
      {/* Pie Chart Section */}
      <div className="w-full lg:w-[30%] bg-white rounded-xl shadow-md p-4 flex flex-col justify-between">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <h2 className="text-green-700 font-semibold text-lg">Awarded: {awarded}</h2>
          <span>15 Apr 2025</span>
        </div>

        <div className="flex justify-center items-center h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
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
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 text-center">
          <span className="text-lg font-semibold text-green-700">Applied: {applied}</span>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="w-full lg:w-[70%] bg-white rounded-xl shadow-md p-4">
        <h2 className="text-green-700 font-semibold text-lg mb-2">Food Distribution Stats</h2>

        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={awardData} margin={{ top: 20, right: 20, left: 10, bottom: 30 }}>
              <XAxis dataKey="event" stroke="#4b5563">
                <Label value="Months" offset={-10} position="insideBottom" />
              </XAxis>
              <YAxis stroke="#4b5563">
                <Label
                  value="People Fed"
                  angle={-90}
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip />
              <Bar dataKey="count" fill="#15803d" barSize={25} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
