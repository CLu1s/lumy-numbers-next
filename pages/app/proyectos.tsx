import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../components/Layout";
import useGetProjects from "../../hooks/useGetProjects";
import ProjectsList from "../../features/project/ProjecstList";

function Projects({ user }) {
  useGetProjects();
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
      <Layout userName={user?.username || ""} pageTitle="Mis Proyectos">
        <ProjectsList />
      </Layout>
    </>
  );
}

export default withAuthenticator(Projects);
