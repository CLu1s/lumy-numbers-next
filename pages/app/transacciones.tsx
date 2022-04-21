import { useEffect } from "react";
import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import sub from "date-fns/sub";
import isSameMonth from "date-fns/isSameMonth";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { Stack, Button } from "@chakra-ui/react";
import Table from "../../features/wallet/Transactions";
import Screen from "../../components/Screen";
import { getPeriod } from "../../features/wallet/selector";
import { changePeriod } from "../../features/wallet/walletSlice";
import useBasicInfo from "../../hooks/useBasicInfo";

function Transacciones({ user }) {
  const dispatch = useDispatch();
  const { fetch, unmount } = useBasicInfo();
  const period = useSelector(getPeriod);
  const currentDate = new Date();
  const sameMonth = isSameMonth(period, currentDate);

  // useEffect(() => {
  //   return () => {
  //     if (!sameMonth) {
  //       unmount();
  //       dispatch(changePeriod(currentDate));
  //     }
  //   };
  // }, [sameMonth]);

  const handleChangePeriod = (newDate) => {
    fetch(newDate);
    dispatch(changePeriod(newDate));
  };
  return (
    <div>
      <Head>
        <title>Luminus Conscious Planning</title>
        <meta name="description" content="Cómo ahorrar cientos al mes y seguir comprando lo que quieres" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout userName={user?.username || ""} pageTitle="Transacciones del mes">
        {sameMonth && (
          <Button
            size="xs"
            onClick={() => handleChangePeriod(sub(new Date(), { months: 1 }))}
          >
            Mes anterior
          </Button>
        )}
        {!sameMonth && (
          <Button size="xs" onClick={() => handleChangePeriod(new Date())}>
            Mes actual
          </Button>
        )}
        <Stack spacing={8}>
          <Screen>
            <Table />
          </Screen>
        </Stack>
      </Layout>
    </div>
  );
}

export default withAuthenticator(Transacciones);
