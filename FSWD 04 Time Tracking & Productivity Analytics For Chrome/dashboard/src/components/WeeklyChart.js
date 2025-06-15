import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale);

function WeeklyChart({ userId }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get(`/api/tracker/${userId}/weekly`)
      .then(res => {
        const data = res.data;
        const labels = Object.keys(data);
        const values = Object.values(data).map(ms => (ms / 1000 / 60).toFixed(2)); // mins

        setChartData({
          labels,
          datasets: [{
            label: "Time Spent (min)",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.6)"
          }]
        });
      });
  }, [userId]);

  return (
    <div>
      <h2>Weekly Productivity Report</h2>
      {chartData.labels ? <Bar data={chartData} /> : <p>Loading...</p>}
    </div>
  );
}

export default WeeklyChart;
