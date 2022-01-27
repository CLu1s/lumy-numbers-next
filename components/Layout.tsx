import { useState } from "react";
import Loading, { LoadingType } from "./Loading";
import Topbar from "./Topbar";
import {
  Box,
  Button,
  Container,
  Stack,
  Center,
  VStack,
  Heading,
} from "@chakra-ui/react";

import Sidebar from "./Sidebar";
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
        <Stack spacing={[0, 8]} direction="row">
          <Sidebar />
          <Stack width="full">
            <Topbar />
            <Stack spacing={4} padding={4}>
              <Heading as="h2" size="md" textTransform="capitalize">
                Hola {userName}
              </Heading>

              {pageTitle && <Heading as="h2">{pageTitle}</Heading>}
              <Box>{children}</Box>
            </Stack>
          </Stack>
        </Stack>
      </main>

      <footer></footer>
    </>
  );
};
export default Layout;
