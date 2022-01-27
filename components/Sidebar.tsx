import { Auth } from "aws-amplify";
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

const Sidebsar = () => {
    async function signOut() {
        try {
          await Auth.signOut();
        } catch (error) {
          console.log("error signing out: ", error);
        }
      }
  return (
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
  );
};

export default Sidebsar;
