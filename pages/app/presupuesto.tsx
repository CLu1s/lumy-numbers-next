import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../components/Layout";
import { Stack } from "@chakra-ui/react";
import IncomeCard from "../../features/budget/IncomeCard";
import BudgetCategories from "../../features/budget/BudgetCategories";
import ShareBucket from "../../features/bucket/ShareBucket";

function Home({ user }) {
  return (
    <Layout userName={user?.username || ""} pageTitle="Plan de Gastos">
      <Stack spacing={8}>
        <IncomeCard />
        <BudgetCategories />
        <ShareBucket />
      </Stack>
    </Layout>
  );
}

export default withAuthenticator(Home);
