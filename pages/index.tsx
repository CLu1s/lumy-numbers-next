import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import BudgetCard from "../features/wallet/BudgetCard";
import Layout from "../components/Layout";
import Categories from "../features/wallet/Categories";
import { Stack } from "@chakra-ui/react";
import CheckcIncomes from "../features/budget/CheckIncomes";

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
          <Categories />
        </Stack>
      </Layout>
    </div>
  );
}

export default withAuthenticator(Home);
