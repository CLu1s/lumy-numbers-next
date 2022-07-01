import type { ReactElement } from "react";
import BudgetCard from "../../features/wallet/BudgetCard";
import Layout from "../../components/Layout";
import { Box, Stack } from "@chakra-ui/react";
import CheckcIncomes from "../../features/budget/CheckIncomes";
import LastsTransactions from "../../features/wallet/LastsTransactions";
import FixedCostDashboard from "../../features/fixedCost/FixedCostDashboard";
import CategoriesDashboard from "../../features/wallet/CategoriesDashboard";
function Home() {
  return (
    <>
      <CheckcIncomes />
      <Stack spacing={8}>
        <BudgetCard />
        <Box maxW={{ base: "100%" }} width="100%">
          <CategoriesDashboard />
        </Box>

        <Stack spacing={4} direction={["column", "row"]}>
          <Box maxW={{ base: "100%", md: "47%", lg: "49%" }} width="100%">
            <FixedCostDashboard />
          </Box>
          <Box
            maxW={{ base: "100%", md: "auto", lg: "49%" }}
            width={{ base: "full" }}
          >
            <LastsTransactions />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

Home.getLayout = (page: ReactElement) => (
  <Layout pageTitle="Excelente Día 👋">{page}</Layout>
);

export default Home;
