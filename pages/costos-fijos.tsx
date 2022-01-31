import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../components/Layout";
import { Stack } from "@chakra-ui/react";
import Table from "../features/fixedCost/ItemsList";
import Screen from "../components/Screen";
function CostosFijos({ user }) {
  return (
    <div>
      <Head>
        <title>Lumi Budget</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout userName={user?.username || ""} pageTitle="Costos Fijos">
        <Stack spacing={8}>
          <Screen>
            <Table />
          </Screen>
        </Stack>
      </Layout>
    </div>
  );
}

export default withAuthenticator(CostosFijos);