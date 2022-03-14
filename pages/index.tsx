import Head from "next/head";
import Link from "next/link";
import { withAuthenticator } from "@aws-amplify/ui-react";
import BudgetCard from "../features/wallet/BudgetCard";
import Layout from "../components/Layout";
import Categories from "../features/wallet/Categories";
import { Stack, Wrap, WrapItem, Link as ChakraLink } from "@chakra-ui/react";
import CheckcIncomes from "../features/budget/CheckIncomes";
import Screen from "../components/Screen";
import LastsTransactions from "../features/wallet/LastsTransactions";
import FixedCostDashboard from "../features/fixedCost/FixedCostDashboard";

function Home({ user }) {
  return (
    <div>
      <Head>
        <title>Lumi Budget</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout userName={user?.username || ""} pageTitle="Excelente Día">
        <CheckcIncomes />
        <Stack spacing={8}>
          <BudgetCard />
          <Wrap spacing={4}>
            <WrapItem maxW={{ base: "100%", lg: "50%" }} width="auto">
              <Screen
                title="Categorías"
                description="Cada categoría muestra el total disponible en tu presupuesto con la cantidad y porcentaje que le queda."
              >
                <Categories />
              </Screen>
            </WrapItem>
            <WrapItem
              maxW={{ base: "100%", lg: "50%" }}
              width={{ base: "full", lg: "auto" }}
            >
              <Screen title="Transacciones Recientes">
                <LastsTransactions />
                <Link href="/transacciones" passHref>
                  <ChakraLink color="teal.500">
                    Ver todas las transacciones
                  </ChakraLink>
                </Link>
              </Screen>
            </WrapItem>
            <WrapItem maxW={{ base: "100%", lg: "50%" }} width="auto">
              <FixedCostDashboard />
            </WrapItem>
          </Wrap>
        </Stack>
      </Layout>
    </div>
  );
}

export default withAuthenticator(Home);
