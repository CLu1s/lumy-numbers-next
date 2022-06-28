import { useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Box, Stack, Heading, Portal, Text } from "@chakra-ui/react";
import Head from "next/head";
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

const Layout = ({ children, pageTitle, user, description }: Props) => {
  const { username } = user;
  const [isCollapsed, setIsCollapsed] = useState(false);

  useGetInfo(username);
  return (
    <>
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
                <Box>{children}</Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
        <Portal>
          <BottomBar />
        </Portal>
      </main>
    </>
  );
};
export default withAuthenticator(Layout);
