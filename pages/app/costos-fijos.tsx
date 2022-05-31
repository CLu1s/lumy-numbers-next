import type { ReactElement } from "react";
import { Stack } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import Container from "../../features/fixedCost/Container";

function CostosFijos() {
  return (
    <Stack spacing={8}>
      <Container />
    </Stack>
  );
}

CostosFijos.getLayout = (page: ReactElement) => (
  <Layout pageTitle="Gastos Fijos">{page}</Layout>
);

export default CostosFijos;
