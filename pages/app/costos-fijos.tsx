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
        <meta name="description" content="Cómo ahorrar cientos al mes y seguir comprando lo que quieres" />
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
