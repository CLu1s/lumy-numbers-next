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
  Button,
} from "@chakra-ui/react";
import MenuItem from "./MenuItem";

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
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <MenuItem />
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="blue" onClick={signOut}>
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
