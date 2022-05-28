import Head from "next/head";
import { useRouter } from "next/router";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../../components/Layout";
import useGetProjects from "../../../hooks/useGetProjects";
import ProjectsDetail from "../../../features/project/ProjectDetail";
import { Button, VStack } from "@chakra-ui/react";

function Projects({ user }) {
  useGetProjects();
  const router = useRouter();
  const { pid } = router.query;
  return (
    <>
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
      <Layout userName={user?.username || ""}>
        <VStack spacing={8} alignItems="flex-start">
          <Button onClick={() => router.push("/app/proyectos")}>
            Ver Todos los Proyectos
          </Button>
          <ProjectsDetail id={pid as string} />
        </VStack>
      </Layout>
    </>
  );
}

export default withAuthenticator(Projects);
