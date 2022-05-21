import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import BudgetCard from "../../features/wallet/BudgetCard";
import Layout from "../../components/Layout";
import { Stack, Wrap, WrapItem, useColorModeValue } from "@chakra-ui/react";
import CheckcIncomes from "../../features/budget/CheckIncomes";
import Screen from "../../components/Screen";
import LastsTransactions from "../../features/wallet/LastsTransactions";
import FixedCostDashboard from "../../features/fixedCost/FixedCostDashboard";
import CategoriesDashboard from "../../features/wallet/CategoriesDashboard";

function Home({ user }) {
  const bg = useColorModeValue("gray.100", "gray.900");
  return (
    <div>
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

      <Layout userName={user?.username || ""} pageTitle="Excelente Día">
        <CheckcIncomes />
        <Stack spacing={8}>
          <BudgetCard />
          <Wrap spacing={4}>
            <WrapItem maxW={{ base: "100%" }} width="100%">
              <CategoriesDashboard />
            </WrapItem>
            <WrapItem
              maxW={{ base: "100%", md: "47%", lg: "49%" }}
              width={{ base: "full" }}
            >
              <Screen title="Transacciones Recientes">
                <LastsTransactions />
              </Screen>
            </WrapItem>
            <WrapItem
              maxW={{ base: "100%", md: "47%" }}
              width={{ base: "full" }}
            >
              <FixedCostDashboard />
            </WrapItem>
          </Wrap>
        </Stack>
      </Layout>
    </div>
  );
}

export default withAuthenticator(Home);
