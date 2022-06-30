import type { ReactElement } from "react";
import BudgetCard from "../../features/wallet/BudgetCard";
import Layout from "../../components/Layout";
import { Box, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import CheckcIncomes from "../../features/budget/CheckIncomes";
import LastsTransactions from "../../features/wallet/LastsTransactions";
import FixedCostDashboard from "../../features/fixedCost/FixedCostDashboard";
import CategoriesDashboard from "../../features/wallet/CategoriesDashboard";
import ChakraBox from "../../components/ChakraBox";
import { getIsMenuCollapsed } from "../../features/system/selector";
import { useSelector } from "react-redux";
function Home() {
  const isCollapsed = useSelector(getIsMenuCollapsed);

  return (
    <>
      <CheckcIncomes />

      <Stack spacing={8}>
        <BudgetCard />
        <Wrap spacing={[4, 4, 8]}>
          <WrapItem width={isCollapsed ? "50%" : "full"}>
            <CategoriesDashboard />
          </WrapItem>
          <WrapItem width={isCollapsed ? "43%" : "full"}>
            <LastsTransactions />
          </WrapItem>
        </Wrap>

        <Box maxW={{ base: "100%", md: "47%" }} width={{ base: "full" }}>
          <FixedCostDashboard />
        </Box>
      </Stack>
    </>
  );
}

Home.getLayout = (page: ReactElement) => (
  <Layout pageTitle="Excelente Día 👋">{page}</Layout>
);

export default Home;
