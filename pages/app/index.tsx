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
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout userName={user?.username || ""} pageTitle="Excelente Día">
        <CheckcIncomes />
        <Stack spacing={8}>
          <BudgetCard />
          <Wrap spacing={4}>
            <WrapItem maxW={{ base: "100%", lg: "45%" }} width="auto">
              <CategoriesDashboard />
            </WrapItem>
            <WrapItem
              maxW={{ base: "100%", lg: "45%" }}
              width={{ base: "full", lg: "50%", xl: "auto" }}
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
              maxW={{ base: "100%", lg: "45%" }}
              width={{ base: "full", lg: "auto" }}
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
