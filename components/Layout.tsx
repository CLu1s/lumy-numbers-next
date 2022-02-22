import Topbar from "./Topbar";
import { Box, Stack, Heading } from "@chakra-ui/react";
import useBaseInfo from "../hooks/useBaseInfo";
import CheckBucket from "../features/bucket/CheckBucket";
import CheckcIncomes from "../features/budget/CheckIncomes";

import Sidebar from "./Sidebar";
type Props = {
  children: JSX.Element[] | JSX.Element;
  pageTitle?: string;
  userName: string;
};

const Layout = ({ children, pageTitle, userName }: Props) => {
  useBaseInfo(userName);
  return (
    <>
      <main>
        <Stack spacing={[0, 8]} direction="row">
          <CheckBucket userName={userName} />
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
