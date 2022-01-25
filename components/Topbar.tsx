import React from "react";
import { Auth } from "aws-amplify";
import { RiMenuFill } from "react-icons/ri";
import {
  Container,
  Stack,
  HStack,
  Avatar,
  AvatarBadge,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { RiUserLine, RiNotification2Line } from "react-icons/ri";
import Link from "next/link";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/", current: false },
  { name: "Transacciones", href: "/transacciones", current: false },
  {
    name: "Configurar Presupuesto",
    href: "/configurarPresupuesto",
    current: false,
  },
  { name: "Compartir Link", href: "/compartir", current: false },
];

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export default function Topbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Container borderBottomWidth={1} paddingY={2}>
      <HStack spacing={4} justifyContent={"space-between"}>
        <Stack isInline spacing={4}>
          <Button
            ref={btnRef}
            colorScheme="teal"
            variant="ghost"
            onClick={onOpen}
          >
            <RiMenuFill fontSize={"1.5rem"} />
          </Button>
        </Stack>
        <Stack isInline spacing={4}>
          <Avatar
            size="md"
            bg="transparent"
            icon={<RiNotification2Line fontSize="2rem"  />}
          >
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          </Avatar>
          <Avatar
            size="md"
            bg="purple.500"
            icon={<RiUserLine fontSize="2rem" color="white" />}
          />
        </Stack>
      </HStack>
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
            <Button colorScheme="blue" onClick={signOut}>
              Cerrar Sesión
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}
