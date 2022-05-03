import Head from "next/head";
import Link from "next/link";
import { withAuthenticator } from "@aws-amplify/ui-react";
import BudgetCard from "../../features/wallet/BudgetCard";
import Layout from "../../components/Layout";
import { Stack, Wrap, WrapItem, Link as ChakraLink } from "@chakra-ui/react";
import CheckcIncomes from "../../features/budget/CheckIncomes";
import Screen from "../../components/Screen";
import LastsTransactions from "../../features/wallet/LastsTransactions";
import FixedCostDashboard from "../../features/fixedCost/FixedCostDashboard";
import CategoriesDashboard from "../../features/wallet/CategoriesDashboard";

function Home({ user }) {
  return (
    <div>
      <Head>
        <title>Luminus Conscious Planning</title>
        <meta
          name="description"
          content="Cómo ahorrar cientos al mes y seguir comprando lo que quieres"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout userName={user?.username || ""} pageTitle="Excelente Día">
        <CheckcIncomes />
        <Stack spacing={8}>
          <BudgetCard />
          <Wrap spacing={4}>
            <WrapItem maxW={{ base: "100%" }} width="auto">
              <CategoriesDashboard />
            </WrapItem>
            <WrapItem
              maxW={{ base: "100%", md: "47%", lg: "49%" }}
              width={{ base: "full" }}
            >
              <Screen title="Transacciones Recientes">
                <LastsTransactions />
                <Link href="/app/transacciones" passHref>
                  <ChakraLink color="teal.500">
                    Ver todas las transacciones
                  </ChakraLink>
                </Link>
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
