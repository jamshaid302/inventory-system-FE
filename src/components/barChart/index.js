import React from "react";
import "./style.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { YEARS_LIST } from "../../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ monthlySalesTotal }) => {
  const data = {
    labels: YEARS_LIST,
    datasets: [
      {
        label: "Monthly Sales",
        // data: [
        //   10000, 1500, 12000, 1800, 900, 2000, 4000, 5000, 6000, 7000, 8000,
        //   8500,
        // ],
        data: monthlySalesTotal,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      {" "}
      <Bar data={data} options={options} />{" "}
    </>
  );
};

export default BarChart;
