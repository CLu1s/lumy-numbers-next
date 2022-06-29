import { withAuthenticator } from "@aws-amplify/ui-react";
import {
  Box,
  Stack,
  Heading,
  Portal,
  Text,
  useMediaQuery,
  chakra,
} from "@chakra-ui/react";
import Head from "next/head";
import { motion, isValidMotionProp } from "framer-motion";
import Topbar from "./Topbar";
import useGetInfo from "../hooks/useGetInfo";
import CheckBucket from "../features/bucket/CheckBucket";
import Sidebar from "../features/system/Sidebar";
import BottomBar from "./BottomBar";

type Props = {
  children: JSX.Element[] | JSX.Element;
  pageTitle?: string;
  user: any;
  description?: string;
};
const ChakraBox = chakra(motion.div, {
  /**
   * Allow motion props and the children prop to be forwarded.
   * All other chakra props not matching the motion props will still be forwarded.
   */
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

const Layout = ({ children, pageTitle, user, description }: Props) => {
  const { username } = user;
  const [isDisplayingInBrowser] = useMediaQuery(["(display-mode: browser)"]);

  useGetInfo(username);
  return (
    <ChakraBox layout>
      <Head>
        <title>Luminus Conscious Planning</title>
      </Head>
      <main>
        <Box paddingBottom="10">
          <Stack spacing={{ base: 0, xl: 5 }} direction="row">
            <CheckBucket userName={username} />
            <Sidebar />
            <Stack width="full">
              <Topbar />
              <Stack spacing={4} paddingX={4} paddingY={{ base: 24, lg: 10 }}>
                <Heading as="h2" size="md" textTransform="capitalize">
                  Hola {username}
                </Heading>

                {pageTitle && <Heading as="h2">{pageTitle}</Heading>}
                {description && <Text>{description}</Text>}
                <ChakraBox layout minW={{ base: "full", md: "647px" }}>
                  {children}
                </ChakraBox>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        {!isDisplayingInBrowser && (
          <Portal>
            <BottomBar />
          </Portal>
        )}
      </main>
    </ChakraBox>
  );
};
export default withAuthenticator(Layout);
