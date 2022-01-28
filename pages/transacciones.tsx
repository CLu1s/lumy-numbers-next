import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../components/Layout";
import { Stack } from "@chakra-ui/react";
import Table from "../components/Table";
import Screen from "../components/Screen";
function Home({ user }) {
  return (
    <div>
      <Head>
        <title>Lumi Budget</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout userName={user?.username || ""} pageTitle="Transacciones del mes">
        <Stack spacing={8}>
          <Screen>
            <Table />
          </Screen>
        </Stack>
      </Layout>
    </div>
  );
}

export default withAuthenticator(Home);