import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../components/Layout";
import { Stack } from "@chakra-ui/react";
import Container from "../../features/fixedCost/Container";

function CostosFijos({ user }) {
  return (
    <div>
      <Layout userName={user?.username || ""} pageTitle="Gastos Fijos">
        <Stack spacing={8}>
          <Container />
        </Stack>
      </Layout>
    </div>
  );
}

export default withAuthenticator(CostosFijos);
