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
import { transformColor } from "../../../config/colors";
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
  const groupByCategory = _groupBy(formatedDate, "categoryID");
  const labels = _sortBy([...Object.keys(groupedDate)]);
  const categories = _sortBy([...Object.keys(groupByCategory)]);
  const datasets = categories.map((category) => {
    const _data = groupByCategory[category];
    const _groupedDate = _groupBy(_data, "date");
    return {
      label: _data[0]?.category?.name || "",
      borderColor: transformColor(_data[0]?.category?.color || ""),
      backgroundColor: transformColor(_data[0]?.category?.color || ""),
      data: labels.map(
        (label) =>
          _groupedDate[label]?.reduce((acc, t) => {
            return acc + t.amount;
          }, 0) || 0
      ),
    };
  });

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Gastos General",
          borderColor: "#3e95cd",
          backgroundColor: "#3e95cd",
          data: labels.map((label) =>
            groupedDate[label].reduce((acc, t) => {
              return acc + t.amount;
            }, 0)
          ),
        },
        ...datasets,
      ],
    }),
    [datasets, groupedDate, labels]
  );
  return (
    <Box w="full" height="30%">
      <Line options={options} data={data} />
    </Box>
  );
};

export default LineChart;
