import { Auth } from "aws-amplify";
import {
  Box,
  Center,
  VStack,
  Heading,
  Text,
  useMediaQuery,
  HStack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { menuList } from "../../config/menu";
import MenuItem from "../../components/MenuItem";
import { getIsMenuCollapsed } from "./selector";
import { setMenuCollapsed } from "./systemSlice";

const Sidebsar = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector(getIsMenuCollapsed);
  const [isTablet] = useMediaQuery(["(min-width: 768px)"]);
  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }
  return (
    <Box
      borderRight="1px solid"
      borderColor="gray.100"
      display={{ base: "none", md: "block" }}
    >
      <VStack width={isCollapsed && isTablet ? "96px" : "256px"}>
        <Center
          height="full"
          paddingY={{ base: "29px", xl: "40px" }}
          paddingX={{ base: "29px", xl: "48px" }}
        >
          <HStack spacing={6}>
            {!isCollapsed && (
              <Heading
                as="h2"
                size="md"
                fontWeight="800"
                textTransform="capitalize"
              >
                Luminus
              </Heading>
            )}
            <IconButton
              variant="ghost"
              aria-label="Menu hamburguesa"
              onClick={() => dispatch(setMenuCollapsed(!isCollapsed))}
              display={{ base: "block", xl: "none" }}
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
          <VStack spacing={5} width={"100%"}>
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
