import type { ReactElement } from "react";
import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../../components/Layout";
import useGetProjects from "../../../hooks/useGetProjects";
import ProjectsList from "../../../features/project/ProjecstList";

function Project() {
  useGetProjects();
  return <ProjectsList />;
}
Project.getLayout = (page: ReactElement) => (
  <Layout pageTitle="Mis Proyectos">{page}</Layout>
);
export default Project;
