import Head from "next/head";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Layout from "../../components/Layout";

import ProjectsList from "../../features/project/ProjecstList";

function Projects({ user }) {
  return (
    <Layout userName={user?.username || ""} pageTitle="Mis Proyectos">
      <ProjectsList />
    </Layout>
  );
}

export default withAuthenticator(Projects);
