import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart = ({ title, labels, data }) => {
  const config = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
      },
    ],
  };
  const options = { responsive: true };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold text-center">{title}</h2>
      <Line data={config} options={options} />
    </div>
  );
};

export default ActivityChart;
