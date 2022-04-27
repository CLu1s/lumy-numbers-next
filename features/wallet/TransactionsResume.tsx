import { useMemo } from "react";
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
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { getTransactionsFormatted, getStatus } from "./selector";
import { getCategories } from "../budget/selector";
import Screen from "../../components/Screen";
import _groupBy from "lodash/groupBy";
import _sortBy from "lodash/sortBy";
import Stats from "../../components/Stats";
import { Stack, Wrap, WrapItem, Box } from "@chakra-ui/react";
import { LoadingStates } from "../../types";
import Loading from "../../components/Loading";
import { date } from "../../utils";

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

const TransactionsResume = () => {
  const transactions = useSelector(getTransactionsFormatted);
  const categories = useSelector(getCategories);
  const status = useSelector(getStatus);
  const grouped = _groupBy(transactions, "categoryID");
  const keys = Object.keys(grouped);
  const totals = useMemo(
    () =>
      keys.map((key) => {
        const transactions = grouped[key];
        const total = transactions.reduce((acc, transaction) => {
          return acc + transaction.amount;
        }, 0);
        return {
          category: categories.find((category) => category.id === key),
          total,
        };
      }),
    [categories, keys, grouped]
  );
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

  const stats = useMemo(
    () =>
      totals.map((total) => (
        <WrapItem key={total.category.id}>
          <Stats name={total.category.name} amount={total.total} />
        </WrapItem>
      )),
    [totals]
  );

  if (status === LoadingStates.LOADING) {
    return <Loading />;
  }

  return (
    <Stack direction={{ base: "column", lg: "row" }} width="full">
      <Box width={{ base: "100%", lg: "40%" }}>
        <Screen
          title="Resumen"
          description="Montos gastados en el mes por categoría"
        >
          <Wrap>{stats}</Wrap>
        </Screen>
      </Box>
      <Screen>
        <Line options={options} data={data} />
      </Screen>
    </Stack>
  );
};

export default TransactionsResume;
