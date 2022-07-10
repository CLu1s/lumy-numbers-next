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
  Box,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { menuList } from "../../config/menu";
import MenuItem from "../../components/MenuItem";
import { getIsMenuCollapsed } from "./selector";
import { setMenuCollapsed } from "./systemSlice";
import { useIsTablet } from "../../hooks";

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
    <Box
      borderRight="1px solid"
      borderColor="gray.100"
      backgroundColor={bg}
      display={["none", "block"]}
      layout
    >
      <VStack
        width={
          isCollapsed && isTablet
            ? "96px"
            : ["96px", "96px", "96px", "220px", "256px"]
        }
      >
        <Center
          height="full"
          paddingY={{ base: "29px", xl: "40px" }}
          paddingX={"20px"}
        >
          <HStack spacing={6}>
            {!isCollapsed && (
              <Heading
                as="h2"
                size="md"
                fontWeight="800"
                textTransform="capitalize"
                display={["none", "none", "none", "block"]}
              >
                Luminus
              </Heading>
            )}
            <IconButton
              variant="ghost"
              aria-label="Menu hamburguesa"
              onClick={() => dispatch(setMenuCollapsed(!isCollapsed))}
              display={{ base: "none", xl: "none" }}
              icon={<Icon as={HiOutlineMenuAlt4} w={8} h={8} />}
            />
          </HStack>
        </Center>
        <VStack
          spacing={4}
          width={"100%"}
          paddingX="20px"
          alignItems="flex-start"
        >
          <Text color="gray.500" fontSize="12" fontWeight="medium">
            Menú
          </Text>

          <VStack spacing={5} width={"100%"} alignItems="flex-start">
            {menuList.map((item) => (
              <MenuItem key={item.id} {...item} showLabel={!isCollapsed} />
            ))}
          </VStack>
        </VStack>

        {/* <VStack spacing={4} width={"100%"} paddingLeft={4} paddingTop={10}>
          <Button colorScheme="messenger" onClick={signOut}>
          Cerrar Sesión
          </Button>
        </VStack> */}
      </VStack>
    </Box>
  );
};

export default Sidebsar;
