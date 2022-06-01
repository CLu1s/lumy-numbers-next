import type { ReactElement } from "react";
import { useReducer, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Head from "next/head";
import sub from "date-fns/sub";
import add from "date-fns/add";
import differenceInMonths from "date-fns/differenceInMonths";
import isSameMonth from "date-fns/isSameMonth";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { Stack, Button, VStack, HStack, Heading } from "@chakra-ui/react";
import Table from "../../features/wallet/Transactions";
import TransactionsResume from "../../features/wallet/TransactionsResume";
import Screen from "../../components/Screen";
import { getPeriod } from "../../features/wallet/selector";
import { changePeriod } from "../../features/wallet/walletSlice";
import useBasicInfo from "../../hooks/useBasicInfo";
import useGetCategories from "../../hooks/useGetCategories";
import { date } from "../../utils";

type DatesHandler = {
  current: Date;
  previous: Date;
  next: Date;
  showNext: boolean;
};
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
        previous: sub(state.previous, { months: 1 }),
        current: sub(state.current, { months: 1 }),
        next: add(state.previous, { months: 1 }),
        showNext: true,
      };
    case "NEXT":
      return {
        ...state,
        previous: sub(state.previous, { months: 1 }),
        current: add(state.current, { months: 1 }),
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
  }, [sameMonth]);

  const handleChangePeriod = ({ newDate, type }) => {
    dispatchReducer({ type });
    fetch(newDate);
    dispatch(changePeriod(newDate));
  };
  return (
    <>
      <Heading as="h1" size="lg" mb={4} textTransform="capitalize">
        {`${date(state.current, "MMMM")}`}
      </Heading>
      <HStack spacing={6} marginBottom="4">
        <Button
          onClick={() =>
            handleChangePeriod({ newDate: state.previous, type: "PREVIOUS" })
          }
          colorScheme="messenger"
        >
          <ChevronLeftIcon fontSize="2xl" />
        </Button>
        {state.showNext && (
          <Button
            colorScheme="messenger"
            onClick={() =>
              handleChangePeriod({ newDate: state.next, type: "NEXT" })
            }
          >
            <ChevronRightIcon fontSize="2xl" />
          </Button>
        )}
        {!sameMonth && (
          <Button
            onClick={() =>
              handleChangePeriod({ newDate: initDate, type: "CURRENT" })
            }
            colorScheme="messenger"
          >
            Ver mes actual
          </Button>
        )}
      </HStack>
      <Stack spacing={8}>
        <TransactionsResume />

        <Screen title="Transcciones del mes">
          <VStack spacing={8}>
            <Table />
          </VStack>
        </Screen>
      </Stack>
    </>
  );
}

Transacciones.getLayout = (page: ReactElement) => (
  <Layout pageTitle={`Transacciones del mes`}>{page}</Layout>
);

export default Transacciones;
