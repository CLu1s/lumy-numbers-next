import React from "react";
import { RiMenuFill } from "react-icons/ri";
import {
  Box,
  Stack,
  HStack,
  Avatar,
  AvatarBadge,
  useDisclosure,
  Button,
  useColorModeValue,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { RiNotification2Line } from "react-icons/ri";
import Drawer from "./Drawer";
import NotificationCenter from "../features/notificationCenter/NotificationCenter";

export default function Topbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notificationCenter = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const btnRef = React.useRef();
  const bg = useColorModeValue("gray.100", "gray.900");

  return (
    <Box
      position={{ base: "fixed", md: "static" }}
      display={{ base: "block" }}
      backgroundColor={bg}
      borderBottomWidth={1}
      padding={2}
      zIndex={100}
      width="full"
    >
      <HStack spacing={4} justifyContent={"space-between"}>
        <Stack isInline spacing={4}>
          <Button
            ref={btnRef}
            colorScheme="messenger"
            variant="ghost"
            onClick={onOpen}
            display={{ base: "block", xl: "none" }}
          >
            <RiMenuFill fontSize={"1.5rem"} />
          </Button>
        </Stack>
        <Stack isInline spacing={4}>
          <IconButton
            aria-label="color mode"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
          <NotificationCenter />
        </Stack>
      </HStack>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
