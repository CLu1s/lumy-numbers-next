import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Box } from "@chakra-ui/react";
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
import _groupBy from "lodash/groupBy";
import _sortBy from "lodash/sortBy";
import { date } from "../../../utils";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Gastos por día",
    },
  },
};
const LineChart = ({ transactions }) => {
  const formatedDate = useMemo(
    () =>
      transactions.map((transaction) => ({
        ...transaction,
        date: date(new Date(transaction.date), "dd"),
      })),
    [transactions]
  );
  const groupedDate = _groupBy(formatedDate, "date");
  const labels = _sortBy([...Object.keys(groupedDate)]);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Gastos por día",
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          data: labels.map((label) =>
            groupedDate[label].reduce((acc, t) => {
              return acc + t.amount;
            }, 0)
          ),
        },
      ],
    }),
    [groupedDate, labels]
  );
  return (
    <Box w="full" height="30%">
      <Line options={options} data={data} />
    </Box>
  );
};

export default LineChart;
