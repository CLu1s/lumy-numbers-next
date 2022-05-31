import type { ReactElement } from "react";
import Layout from "../../components/Layout";
import { Stack } from "@chakra-ui/react";
import IncomeCard from "../../features/budget/IncomeCard";
import BudgetCategories from "../../features/budget/BudgetCategories";
import ShareBucket from "../../features/bucket/ShareBucket";
import { useGetCategories, useGetIncomes } from "../../hooks";

function Presupuesto() {
  useGetCategories();
  useGetIncomes();
  return (
    <Stack spacing={8}>
      <IncomeCard />
      <BudgetCategories />
      <ShareBucket />
    </Stack>
  );
}

Presupuesto.getLayout = (page: ReactElement) => (
  <Layout pageTitle="Plan de Gastos">{page}</Layout>
);

export default Presupuesto;
