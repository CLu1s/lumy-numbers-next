import Topbar from "./Topbar";
import { Box, Stack, Heading, Portal, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import useBaseInfo from "../hooks/useBaseInfo";
import CheckBucket from "../features/bucket/CheckBucket";
import CheckcIncomes from "../features/budget/CheckIncomes";
import { RiMenuFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
type Props = {
  children: JSX.Element[] | JSX.Element;
  pageTitle?: string;
  userName: string;
};

const Layout = ({ children, pageTitle, userName }: Props) => {
  useBaseInfo(userName);
  const router = useRouter();
  const backButton = () => {
    router.back();
  };
  const isNotIndex = router.pathname !== "/";
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
        <Portal>
          {isNotIndex && (
            <IconButton
              position={{ base: "fixed", md: "static" }}
              display={{ base: "block", md: "none" }}
              right="1.5rem"
              bottom="1.5rem"
              boxShadow="lg"
              aria-label="Search database"
              icon={<ArrowBackIcon />}
              backgroundColor="white"
              color="gray.500"
              rounded="full"
              height="52px"
              width="52px"
              onClick={backButton}
            />
          )}
        </Portal>
      </main>

      <footer></footer>
    </>
  );
};
export default Layout;
