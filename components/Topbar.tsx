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
  useColorMode,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { RiNotification2Line } from "react-icons/ri";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import Drawer from "./Drawer";
import NotificationCenter from "../features/notificationCenter/NotificationCenter";

export default function Topbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notificationCenter = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.900");

  return (
    <Box
      position={{ base: "fixed", md: "static" }}
      display={{ base: "block" }}
      borderBottomWidth={[1, 0]}
      backgroundColor={bg}
      padding={2}
      zIndex={100}
      width="full"
    >
      <HStack spacing={4} justifyContent={"space-between"}>
        <Stack isInline spacing={4}>
          <IconButton
            variant="ghost"
            aria-label="Menu hamburguesa"
            onClick={onOpen}
            display={{ base: "block", md: "none" }}
            icon={<Icon as={HiOutlineMenuAlt4} w={8} h={8} />}
          />
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
