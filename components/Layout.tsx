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
              <Stack
                spacing={4}
                paddingX={[4, 8]}
                paddingY={[24, 8, 10]}
                width={{ base: "full" }}
                maxW={["876px", "960px", "1024px"]}
              >
                <Heading as="h2" size="md" textTransform="capitalize">
                  Hola {username}
                </Heading>
                {pageTitle && <Heading as="h2">{pageTitle}</Heading>}
                {description && <Text>{description}</Text>}
                <Box w="full">{children}</Box>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </main>
    </>
  );
};
export default withAuthenticator(Layout);
