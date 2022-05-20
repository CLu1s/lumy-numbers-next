import { useRouter } from "next/router";
import {
  Box,
  Stack,
  Heading,
  Portal,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import Topbar from "./Topbar";
import useBaseInfo from "../hooks/useBaseInfo";
import CheckBucket from "../features/bucket/CheckBucket";
import Sidebar from "./Sidebar";
import BottomBar from "./BottomBar";
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
  const bg = useColorModeValue("gray.100", "gray.900");
  <Head>
    <title>Luminus Conscious Planning</title>
    <meta
      name="description"
      content="Cómo ahorrar cientos al mes y seguir comprando lo que quieres"
    />
    <meta name="theme-color" content={bg} />
    <link rel="icon" href="/favicon.ico" />
  </Head>;
  return (
    <>
      <main>
        <Box bg={bg}>
          <Stack spacing={{ base: 0, xl: 5 }} direction="row">
            <CheckBucket userName={userName} />
            <Sidebar />
            <Stack width="full">
              <Topbar />
              <Stack spacing={4} paddingX={4} paddingTop={{ base: 24, lg: 0 }}>
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
