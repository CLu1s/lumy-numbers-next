import Head from "next/head";
import { useRouter } from "next/router";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../../components/Layout";
import useGetProjects from "../../../hooks/useGetProjects";
import ProjectsDetail from "../../../features/project/ProjectDetail";
import { Button, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";

function Projects({ user }) {
  useGetProjects();
  const router = useRouter();
  const { pid } = router.query;
  return (
    <VStack spacing={8} alignItems="flex-start">
      <Button onClick={() => router.push("/app/proyectos")}>
        Ver Todos los Proyectos
      </Button>
      <ProjectsDetail id={pid as string} />
    </VStack>
  );
}
Projects.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export default Projects;
