import {
  Box,
  Stack,
  Heading,
  Portal,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import Topbar from "./Topbar";
import useGetInfo from "../hooks/useGetInfo";
import CheckBucket from "../features/bucket/CheckBucket";
import Sidebar from "./Sidebar";
import BottomBar from "./BottomBar";
type Props = {
  children: JSX.Element[] | JSX.Element;
  pageTitle?: string;
  userName: string;
};

const Layout = ({ children, pageTitle, userName }: Props) => {
  useGetInfo(userName);
  const bg = useColorModeValue("gray.100", "gray.900");
  return (
    <>
      <main>
        <Box bg={bg} position="relative">
          <Stack spacing={{ base: 0, xl: 5 }} direction="row">
            <CheckBucket userName={userName} />
            <Sidebar />
            <Stack width="full">
              <Topbar />
              <Stack spacing={4} paddingX={4} paddingY={{ base: 24, lg: 10 }}>
                <Heading as="h2" size="md" textTransform="capitalize">
                  Hola {userName}
                </Heading>

                {pageTitle && <Heading as="h2">{pageTitle}</Heading>}
                <Box>{children}</Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        {/* <BottomBar /> */}
      </main>
    </>
  );
};
export default Layout;
