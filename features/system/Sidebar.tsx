import { Auth } from "aws-amplify";
import {
  Center,
  VStack,
  Heading,
  Text,
  HStack,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { menuList } from "../../config/menu";
import MenuItem from "../../components/MenuItem";
import { getIsMenuCollapsed } from "./selector";
import { setMenuCollapsed } from "./systemSlice";
import { useIsTablet } from "../../hooks";
import ChakraBox from "../../components/ChakraBox";

const Sidebsar = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector(getIsMenuCollapsed);
  const isTablet = useIsTablet();
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  const bg = useColorModeValue("#F7F7FF", "#242731");

  return (
    <ChakraBox
      borderRight="1px solid"
      borderColor="gray.100"
      backgroundColor={bg}
      display={["none", "block"]}
      layout
    >
      <VStack
        width={isCollapsed && isTablet ? "96px" : ["220px", "220px", "256px"]}
      >
        <Center
          height="full"
          paddingY={{ base: "29px", xl: "40px" }}
          paddingX={"20px"}
        >
          <HStack spacing={6}>
            {!isCollapsed && (
              <ChakraBox layout>
                <Heading
                  as="h2"
                  size="md"
                  fontWeight="800"
                  textTransform="capitalize"
                >
                  Luminus
                </Heading>
              </ChakraBox>
            )}
            <ChakraBox layout>
              <IconButton
                variant="ghost"
                aria-label="Menu hamburguesa"
                onClick={() => dispatch(setMenuCollapsed(!isCollapsed))}
                display={{ base: "block", xl: "none" }}
                icon={<Icon as={HiOutlineMenuAlt4} w={8} h={8} />}
              />
            </ChakraBox>
          </HStack>
        </Center>
        <VStack
          spacing={4}
          width={"100%"}
          paddingX="20px"
          alignItems="flex-start"
        >
          <ChakraBox layout>
            <Text color="gray.500" fontSize="12" fontWeight="medium">
              Menú
            </Text>
          </ChakraBox>

          <VStack spacing={5} width={"100%"}>
            {menuList.map((item) => (
              <ChakraBox
                key={item.id}
                layout
                width={"100%"}
                initial={{ borderRadius: "0.75rem" }}
              >
                <MenuItem {...item} showLabel={!isCollapsed} />
              </ChakraBox>
            ))}
          </VStack>
        </VStack>

        {/* <VStack spacing={4} width={"100%"} paddingLeft={4} paddingTop={10}>
          <Button colorScheme="messenger" onClick={signOut}>
          Cerrar Sesión
          </Button>
        </VStack> */}
      </VStack>
    </ChakraBox>
  );
};

export default Sidebsar;
