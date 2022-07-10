import type { ReactElement } from "react";
import { useReducer, useEffect } from "react";
import sub from "date-fns/sub";
import add from "date-fns/add";
import differenceInMonths from "date-fns/differenceInMonths";
import isSameMonth from "date-fns/isSameMonth";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { Stack, VStack } from "@chakra-ui/react";
import Table from "../../features/wallet/Transactions";
import TransactionsResume from "../../features/wallet/TransactionsResume";
import Screen from "../../components/Screen";
import { getPeriod } from "../../features/wallet/selector";
import { changePeriod } from "../../features/wallet/walletSlice";
import useBasicInfo from "../../hooks/useBasicInfo";
import useGetCategories from "../../hooks/useGetCategories";
import { DatesHandler } from "../../types";

const initDate = new Date();

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

function Transacciones() {
  useGetCategories();
  const dispatch = useDispatch();
  const { fetch, unmount } = useBasicInfo();
  const period = useSelector(getPeriod);
  const [state, dispatchReducer] = useReducer(reducer, initialState);
  const sameMonth = isSameMonth(period, initDate);

  useEffect(() => {
    return () => {
      if (!sameMonth) {
        unmount();
        dispatch(changePeriod(initDate));
      }
    };
  }, [dispatch]);

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
      />
      <Screen title="Transcciones del mes">
        <VStack spacing={8}>
          <Table />
        </VStack>
      </Screen>
    </Stack>
  );
}

Transacciones.getLayout = (page: ReactElement) => (
  <Layout pageTitle={`Transacciones del mes`}>{page}</Layout>
);

export default Transacciones;
