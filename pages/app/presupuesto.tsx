import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../components/Layout";
import { Stack } from "@chakra-ui/react";
import IncomeCard from "../../features/budget/IncomeCard";
import BudgetCategories from "../../features/budget/BudgetCategories";
import ShareBucket from "../../features/bucket/ShareBucket";

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

      <Layout userName={user?.username || ""} pageTitle="Plan de Gastos">
        <Stack spacing={8}>
          <IncomeCard />
          <BudgetCategories />
          <ShareBucket />
        </Stack>
      </Layout>
    </div>
  );
}

export default withAuthenticator(Home);
