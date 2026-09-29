import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
BarChart,Bar} from "recharts";

const Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.thingspeak.com/channels/3400246/feeds.json")
      .then((response) => response.json())
      .then((result) => {
        setData(result.feeds);
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
  }, []);

  const latestData = data[data.length - 1];

  const chartData = data.map((item) => ({
    time: new Date(item.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    voltage: Number(item.field1),
    current: Number(item.field2),
  }));

  return (
    <div className="container">

      <div className="title">
        <h1>ENERGY LIVE DASHBOARD</h1>
      </div>

      <div className="main">

        <div className="card volt">
          <h3>Voltage</h3>
          <p>{latestData?.field1} V</p>
        </div>

        <div className="card ampere">
          <h3>Current</h3>
          <p>{latestData?.field2} A</p>
        </div>

        <div className="card watt">
          <h3>Power</h3>
          <p>{latestData?.field3} W</p>
        </div>

      </div>

      <div className="line">

        <h2>Voltage & Current</h2>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 10,
              bottom: 20,
            }}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="time"
              interval={25}
            />

            <YAxis
              yAxisId="voltage"
              orientation="left"
              label={{
                value: "Voltage (V)",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <YAxis
              yAxisId="current"
              orientation="right"
              label={{
                value: "Current (A)",
                angle: 90,
                position: "insideRight",
              }}
            />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="voltage"
              yAxisId="voltage"
              name="Voltage"
              stroke="red"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="current"
              yAxisId="current"
              name="Current"
              stroke="green"
              strokeWidth={2}
              dot={false}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Page;