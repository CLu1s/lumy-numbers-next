import { Auth } from "aws-amplify";
import { Box, Button, Center, VStack, Heading } from "@chakra-ui/react";
import { menuList } from "../config/menu";
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
      display={{ base: "none", xl: "block" }}
    >
      <VStack spacing={8} width={"100%"}>
        <Center height="full" paddingTop={4}>
          <Heading
            as="h2"
            size="md"
            fontWeight="600"
            textTransform="capitalize"
          >
            Luminus
          </Heading>
        </Center>
        <VStack spacing={4} width={"100%"} paddingLeft={4}>
          {menuList.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </VStack>
        <VStack spacing={4} width={"100%"} paddingLeft={4} paddingTop={10}>
          <Button colorScheme="messenger" onClick={signOut}>
            Cerrar Sesión
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Sidebsar;
