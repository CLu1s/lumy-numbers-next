import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../components/Layout";
import { Stack } from "@chakra-ui/react";
import Container from "../../features/fixedCost/Container";

function CostosFijos({ user }) {
  return (
    <div>
      <Head>
        <title>Luminus Conscious Planning</title>
        <meta
          name="description"
          content="Cómo ahorrar cientos al mes y seguir comprando lo que quieres"
        />
        <meta
          name="theme-color"
          content="#edf2f7"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#171923"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout userName={user?.username || ""} pageTitle="Gastos Fijos">
        <Stack spacing={8}>
          <Container />
        </Stack>
      </Layout>
    </div>
  );
}

export default withAuthenticator(CostosFijos);
