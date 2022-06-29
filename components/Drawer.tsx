import React from "react";
import { Auth } from "aws-amplify";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Button,
  HStack,
  Heading,
  Center,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import MenuItem from "./MenuItem";
import { menuList } from "../config/menu";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DrawerMenu = React.forwardRef(
  ({ isOpen, onClose }: Props, btnRef: any) => {
    async function signOut() {
      try {
        await Auth.signOut();
        onClose();
      } catch (error) {
        console.log("error signing out: ", error);
      }
    }
    const color = useColorModeValue("black", "white");

    return (
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader color={"gray"}>
            <Center height="full" paddingY="16px">
              <HStack spacing={1}>
                <Heading
                  as="h2"
                  size="md"
                  fontWeight="800"
                  textTransform="capitalize"
                  color={color}
                >
                  Luminus
                </Heading>
              </HStack>
            </Center>
          </DrawerHeader>

          <DrawerBody>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.300")}
            >
              Menú
            </Text>
            <Stack spacing={4}>
              {menuList.map((item) => (
                <MenuItem key={item.id} {...item} showLabel />
              ))}
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              backgroundColor="purple.400"
              color="white"
              onClick={signOut}
            >
              Cerrar Sesión
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
);
DrawerMenu.displayName = "DrawerMenu";
export default DrawerMenu;
