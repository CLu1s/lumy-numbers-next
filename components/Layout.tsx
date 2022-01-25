import { useState } from "react";
import { Container } from "@chakra-ui/react";
import Loading, { LoadingType } from "./Loading";
import Topbar from "./Topbar";
import { Stack, HStack, VStack } from "@chakra-ui/react";
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
        <Stack spacing={4}>
          <Topbar />
          <Container>
            <Stack spacing={8}>
              <Heading as="h2" textTransform="capitalize">
                Hola {userName}
              </Heading>
              {pageTitle && <Heading as="h2">{pageTitle}</Heading>}
              {children}
            </Stack>
          </Container>
        </Stack>
      </main>

      <footer></footer>
    </>
  );
};
export default Layout;
