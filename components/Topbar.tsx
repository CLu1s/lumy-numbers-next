import React from "react";
import {
  Box,
  Stack,
  HStack,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import Drawer from "./Drawer";
import NotificationCenter from "../features/notificationCenter/NotificationCenter";
import ChakraBox from "./ChakraBox";
import { useSelector } from "react-redux";
import { getIsMenuCollapsed } from "../features/system/selector";
export default function Topbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notificationCenter = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#F7F7FF", "#242731");
  const isCollapsed = useSelector(getIsMenuCollapsed);

  return (
    <ChakraBox
      position={{ base: "fixed", md: "static" }}
      display={{ base: "block" }}
      borderBottomWidth={["1px", 0]}
      backgroundColor={bg}
      borderColor="gray.100"
      padding={[6, 2]}
      zIndex={100}
      width="full"
      layout
    >
      <HStack spacing={4} justifyContent={"space-between"} w="full">
        <Stack isInline spacing={4}>
          <IconButton
            variant="ghost"
            aria-label="Menu hamburguesa"
            onClick={onOpen}
            display={{ base: "block", md: "none" }}
            icon={<Icon as={HiOutlineMenuAlt4} w={8} h={8} />}
          />
        </Stack>
        <ChakraBox layout>
          <Stack isInline spacing={4}>
            <IconButton
              aria-label="color mode"
              onClick={toggleColorMode}
              variant="ghost"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            />
            <NotificationCenter />
          </Stack>
        </ChakraBox>
      </HStack>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </ChakraBox>
  );
}
