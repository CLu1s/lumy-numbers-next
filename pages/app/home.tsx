import type { ReactElement } from "react";
import BudgetCard from "../../features/wallet/BudgetCard";
import Layout from "../../components/Layout";
import { Box, Stack, SimpleGrid } from "@chakra-ui/react";
import CheckcIncomes from "../../features/budget/CheckIncomes";
import LastsTransactions from "../../features/wallet/LastsTransactions";
import FixedCostDashboard from "../../features/fixedCost/FixedCostDashboard";
import CategoriesDashboard from "../../features/wallet/CategoriesDashboard";
import { getIsMenuCollapsed } from "../../features/system/selector";
import { useSelector } from "react-redux";
function Home() {
  const isCollapsed = useSelector(getIsMenuCollapsed);

  return (
    <>
      <CheckcIncomes />

      <Stack spacing={8}>
        <BudgetCard />
        <Box maxW={{ base: "100%" }} width="100%">
          <CategoriesDashboard />
        </Box>

        <SimpleGrid spacing={4} columns={[1, 2]}>
          <Box width={{ base: "full" }}>
            <LastsTransactions />
          </Box>
          <Box width="100%">
            <FixedCostDashboard />
          </Box>
        </SimpleGrid>
      </Stack>
    </>
  );
}

Home.getLayout = (page: ReactElement) => (
  <Layout pageTitle="Excelente Día 👋">{page}</Layout>
);

export default Home;
