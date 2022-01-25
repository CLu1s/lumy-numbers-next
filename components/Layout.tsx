import { useState } from "react";
import { Container } from "@chakra-ui/react";
import Loading, { LoadingType } from "./Loading";
import Topbar from "./Topbar";
import Typography, { Types } from "./Typography";
import { Heading } from "@chakra-ui/react";
type Props = {
  children: JSX.Element[] | JSX.Element;
  pageTitle?: string;
  userName: string;
};

const Layout = ({ children, pageTitle, userName }: Props) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading type={LoadingType.FULL_PAGE} />;
  }
  return (
    <>
      <main>
        <Topbar />
        <Container>
          <Heading as="h2">Hola {userName}</Heading>
          {pageTitle && <Heading as="h2">{pageTitle}</Heading>}
          {children}
        </Container>
      </main>

      <footer></footer>
    </>
  );
};
export default Layout;
