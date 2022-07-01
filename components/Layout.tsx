import { withAuthenticator } from "@aws-amplify/ui-react";
import {
  Box,
  Stack,
  Heading,
  Portal,
  Text,
  useMediaQuery,
  Container,
} from "@chakra-ui/react";
import Head from "next/head";
import Topbar from "./Topbar";
import useGetInfo from "../hooks/useGetInfo";
import CheckBucket from "../features/bucket/CheckBucket";
import Sidebar from "../features/system/Sidebar";
import BottomBar from "./BottomBar";
import ChakraBox from "../components/ChakraBox";
import { useSelector } from "react-redux";
import { getIsMenuCollapsed } from "../features/system/selector";
type Props = {
  children: JSX.Element[] | JSX.Element;
  pageTitle?: string;
  user: any;
  description?: string;
};

const Layout = ({ children, pageTitle, user, description }: Props) => {
  const { username } = user;
  const [isDisplayingInBrowser] = useMediaQuery(["(display-mode: browser)"]);
  const isCollapsed = useSelector(getIsMenuCollapsed);

  useGetInfo(username);
  return (
    <>
      <Head>
        <title>Luminus Conscious Planning</title>
      </Head>
      <main>
        <Box paddingBottom="10">
          <Stack spacing={0} direction="row" width="full">
            <CheckBucket userName={username} />
            <Sidebar />
            <Stack width="full">
              <Topbar />
              <ChakraBox layout display="flex" justifyContent="center">
                <Stack
                  spacing={4}
                  paddingX={{ base: 4, md: 6, lg: 20, xl: 24 }}
                  paddingY={{ base: 24, md: 8, lg: 10 }}
                  width={{ base: "full" }}
                  maxW="876px"
                >
                  <ChakraBox layout w="full">
                    <Heading as="h2" size="md" textTransform="capitalize">
                      Hola {username}
                    </Heading>
                  </ChakraBox>
                  <ChakraBox layout w="full">
                    {pageTitle && <Heading as="h2">{pageTitle}</Heading>}
                  </ChakraBox>
                  {description && <Text>{description}</Text>}
                  <ChakraBox layout w="full">
                    {children}
                  </ChakraBox>
                </Stack>
              </ChakraBox>
            </Stack>
          </Stack>
        </Box>
      </main>
    </>
  );
};
export default withAuthenticator(Layout);
