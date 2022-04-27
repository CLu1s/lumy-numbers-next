import { money, date } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getTransactionsFormatted, getStatus } from "./selector";
import { getCategories } from "../budget/selector";
import Screen from "../../components/Screen";
import _groupBy from "lodash/groupBy";
import Stats from "../../components/Stats";
import { Wrap, WrapItem } from "@chakra-ui/react";

const TransactionsResume = () => {
  const transactions = useSelector(getTransactionsFormatted);
  const categories = useSelector(getCategories);
  const grouped = _groupBy(transactions, "categoryID");
  const keys = Object.keys(grouped);
  const totals = keys.map((key) => {
    const transactions = grouped[key];
    const total = transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
    return {
      category: categories.find((category) => category.id === key),
      total,
    };
  });

  const stats = totals.map((total) => (
    <WrapItem key={total.category.id}>
      <Stats name={total.category.name} amount={total.total} />
    </WrapItem>
  ));

  return (
    <Screen title="Resumen" description="Montos gastados en el mes">
      <Wrap>{stats}</Wrap>
    </Screen>
  );
};

export default TransactionsResume;
