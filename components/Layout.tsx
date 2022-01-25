import { useState } from "react";
import { Auth } from "aws-amplify";
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

import MenuItem from "./MenuItem";
type Props = {
  children: JSX.Element[] | JSX.Element;
  pageTitle?: string;
  userName: string;
};
async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}
const Layout = ({ children, pageTitle, userName }: Props) => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading type={LoadingType.FULL_PAGE} />;
  }
  return (
    <>
      <main>
        <Stack spacing={4}>
          <Stack spacing={[0, 8]} direction="row">
            <Box
              width={"260px"}
              paddingTop="2"
              paddingx="4"
              display={["none", "block"]}
            >
              <VStack spacing={8} width={"100%"}>
                <Center height="full">
                  <Heading
                    as="h2"
                    size="md"
                    fontWeight="600"
                    textTransform="capitalize"
                  >
                    Lumi Budget
                  </Heading>
                </Center>
                <VStack spacing={4} width={"100%"} paddingLeft={4}>
                  <MenuItem />
                </VStack>
                <VStack spacing={4} width={"100%"} paddingLeft={4}>
                  <Button colorScheme="blue" onClick={signOut}>
                    Cerrar Sesión
                  </Button>
                </VStack>
              </VStack>
            </Box>
            <Stack width="full">
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
          </Stack>
        </Stack>
      </main>

      <footer></footer>
    </>
  );
};
export default Layout;
