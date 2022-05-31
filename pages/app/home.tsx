import type { ReactElement } from "react";
import BudgetCard from "../../features/wallet/BudgetCard";
import Layout from "../../components/Layout";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import CheckcIncomes from "../../features/budget/CheckIncomes";
import Screen from "../../components/Screen";
import LastsTransactions from "../../features/wallet/LastsTransactions";
import FixedCostDashboard from "../../features/fixedCost/FixedCostDashboard";
import CategoriesDashboard from "../../features/wallet/CategoriesDashboard";
function Home() {
  return (
    <>
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
          <WrapItem maxW={{ base: "100%", md: "47%" }} width={{ base: "full" }}>
            <FixedCostDashboard />
          </WrapItem>
        </Wrap>
      </Stack>
    </>
  );
}

Home.getLayout = (page: ReactElement) => (
  <Layout pageTitle="Excelente Día">{page}</Layout>
);

export default Home;
