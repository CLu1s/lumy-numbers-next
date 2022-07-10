import { ReactElement, useState } from "react";
import { useReducer, useEffect } from "react";
import sub from "date-fns/sub";
import add from "date-fns/add";
import differenceInMonths from "date-fns/differenceInMonths";
import isSameMonth from "date-fns/isSameMonth";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { Stack, VStack } from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import Table from "../../features/wallet/Transactions";
import TransactionsResume from "../../features/wallet/TransactionsResume";
import Screen from "../../components/Screen";
import {
  getPeriod,
  getTransactionsFormatted,
} from "../../features/wallet/selector";
import { changePeriod } from "../../features/wallet/walletSlice";
import useBasicInfo from "../../hooks/useBasicInfo";
import useGetCategories from "../../hooks/useGetCategories";
import { DatesHandler, Transaction } from "../../types";
import { getCategories } from "../../features/budget/selector";
import { compareDates } from "../../utils";

const initDate = new Date();
const compareTransactions = (transactions: Transaction[], order: Order) => {
  const transactionsClone = [...transactions];
  const t = transactionsClone.sort((a, b) => {
    return compareDates(new Date(a.date), new Date(b.date));
  });
  if (order === Order.DESC) {
    return t.reverse();
  }
  return t;
};
const initialState = {
  current: initDate,
  previous: sub(initDate, { months: 1 }),
  next: sub(initDate, { months: -1 }),
  showNext: true,
};

function reducer(state: DatesHandler, action: any) {
  switch (action.type) {
    case "PREVIOUS":
      return {
        ...state,
        previous: sub(state.current, { months: 1 }),
        current: state.previous,
        next: add(state.previous, { months: 1 }),
        showNext: true,
      };
    case "NEXT":
      return {
        ...state,
        previous: state.current,
        current: state.next,
        next: add(state.next, { months: 1 }),
        showNext: differenceInMonths(state.next, initDate) < 1,
      };
    case "CURRENT":
      return {
        ...state,
        previous: sub(initDate, { months: 1 }),
        next: add(initDate, { months: 1 }),
        current: initDate,
        showNext: true,
      };
    default:
      return state;
  }
}
enum Order {
  ASC = "asc",
  DESC = "desc",
}
function Transacciones() {
  useGetCategories();
  const dispatch = useDispatch();
  const { fetch, unmount } = useBasicInfo();
  const transactions = useSelector(getTransactionsFormatted);
  const period = useSelector(getPeriod);
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const [sort, setSort] = useState("date");
  const [filter, setFilter] = useState<string[]>([]);
  const [order, setOrder] = useState<Order>(Order.DESC);
  const [sortedTransactions, setSortedTransactions] = useState<Transaction[]>(
    []
  );
  const sameMonth = isSameMonth(period, initDate);
  let sortTrans;

  useEffect(() => {
    return () => {
      if (!sameMonth) {
        unmount();
        dispatch(changePeriod(initDate));
      }
    };
  }, [dispatch]);

  useEffect(() => {
    if (sort === "date") {
      sortTrans = compareTransactions(transactions, order);
    } else {
      sortTrans = _orderBy(transactions, [sort], [order]);
    }
    if (filter.length > 0) {
      sortTrans = sortTrans.filter((transaction) => {
        return filter.includes(transaction.categoryID);
      });
    }
    setSortedTransactions(sortTrans);
  }, [transactions, sort, order, filter]);

  const handleChangePeriod = ({ newDate, type }) => {
    dispatchReducer({ type });
    fetch(newDate);
    dispatch(changePeriod(newDate));
  };
  return (
    <Stack spacing={8}>
      <TransactionsResume
        state={state}
        handleChangePeriod={handleChangePeriod}
        transactions={sortedTransactions}
      />
      <Screen title="Transcciones del mes">
        <VStack spacing={8}>
          <Table
            transactions={sortedTransactions}
            setOrder={setOrder}
            setSort={setSort}
            filter={filter}
            setFilter={setFilter}
          />
        </VStack>
      </Screen>
    </Stack>
  );
}

Transacciones.getLayout = (page: ReactElement) => (
  <Layout pageTitle={`Transacciones del mes`}>{page}</Layout>
);

export default Transacciones;
