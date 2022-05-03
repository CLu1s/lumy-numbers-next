import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../components/Layout";

import ProjectsList from "../../features/project/ProjecstList";

function Projects({ user }) {
  return (
    <>
      <Head>
        <title>Luminus Conscious Planning</title>
        <meta
          name="description"
          content="Cómo ahorrar cientos al mes y seguir comprando lo que quieres"
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
