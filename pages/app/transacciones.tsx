import { useReducer, useEffect } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import sub from "date-fns/sub";
import add from "date-fns/add";
import differenceInMonths from "date-fns/differenceInMonths";
import isSameMonth from "date-fns/isSameMonth";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { Stack, Button, VStack, HStack } from "@chakra-ui/react";
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

function Transacciones({ user }) {
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
      <Head>
        <title>Luminus Conscious Planning</title>
        <meta
          name="description"
          content="Cómo ahorrar cientos al mes y seguir comprando lo que quieres"
        />
        <meta
          name="theme-color"
          content="#edf2f7"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#171923"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        userName={user?.username || ""}
        pageTitle={`Transacciones del mes de ${date(state.current, "MMMM")}`}
      >
        <HStack spacing={6} marginBottom="4">
          <Button
            onClick={() =>
              handleChangePeriod({ newDate: state.previous, type: "PREVIOUS" })
            }
            colorScheme="telegram"
          >
            <GrPrevious />
          </Button>
          {state.showNext && (
            <Button
              colorScheme="telegram"
              onClick={() =>
                handleChangePeriod({ newDate: state.next, type: "NEXT" })
              }
            >
              <GrNext />
            </Button>
          )}
          {!sameMonth && (
            <Button
              onClick={() =>
                handleChangePeriod({ newDate: initDate, type: "CURRENT" })
              }
              colorScheme="telegram"
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
      </Layout>
    </>
  );
}

export default withAuthenticator(Transacciones);
