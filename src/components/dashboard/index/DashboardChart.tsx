"use client";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { ViewsChartData } from "@/hooks/useDashboardStats";

interface Props {
  chartData?: ViewsChartData | null;
}

const FALLBACK_LABELS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const FALLBACK_DATA = [0, 0, 0, 0, 0, 0, 0];

const DashboardChart = ({ chartData }: Props) => {
  const labels = chartData?.labels ?? FALLBACK_LABELS;
  const values = chartData?.data ?? FALLBACK_DATA;

  const data = {
    labels,
    datasets: [
      {
        label: "Total Views",
        backgroundColor: "#ff6725",
        borderColor: "#ff6725",
        borderWidth: 1,
        hoverBackgroundColor: "#e85a1a",
        hoverBorderColor: "#e85a1a",
        data: values,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { mode: "index" as const, intersect: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default DashboardChart;
