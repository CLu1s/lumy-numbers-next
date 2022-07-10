import React from "react";
import {
  Stack,
  HStack,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Icon,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { FiRefreshCw } from "react-icons/fi";
import Drawer from "./Drawer";
import { useAnimation } from "framer-motion";
import NotificationCenter from "../features/notificationCenter/NotificationCenter";
import { useSelector } from "react-redux";
import { getIsMenuCollapsed } from "../features/system/selector";
import useRefresh from "../hooks/useRefresh";
import { getCollaborators } from "../features/bucket/selector";

export default function Topbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const notificationCenter = useDisclosure();
  const controls = useAnimation();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#F7F7FF", "#242731");
  const isCollapsed = useSelector(getIsMenuCollapsed);
  const collab = useSelector(getCollaborators);
  const showRefresh = collab.length > 1;
  const [refresh, isLoading] = useRefresh();

  if (isLoading) {
    controls.start({
      rotate: 360,
      transition: {
        duration: 1,
        ease: "easeInOut",
        // @ts-ignore no problem in operation, although type error appears.
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  } else {
    controls.stop();
  }
  return (
    <Box
      position={["fixed", "static"]}
      borderBottomWidth={["1px", 0]}
      backgroundColor={bg}
      borderColor="gray.100"
      padding={[6, 2]}
      zIndex={100}
      width="full"
    >
      <HStack spacing={4} justifyContent={"space-between"} w="full">
        <Stack isInline spacing={4}>
          <IconButton
            variant="ghost"
            aria-label="Menu hamburguesa"
            onClick={onOpen}
            display={["block", "none"]}
            icon={<Icon as={HiOutlineMenuAlt4} w={8} h={8} />}
          />
        </Stack>
        <Stack isInline spacing={4}>
          {showRefresh && (
            <IconButton
              aria-label="color mode"
              onClick={refresh}
              variant="ghost"
              size="lg"
              icon={<FiRefreshCw />}
            />
          )}
          <IconButton
            aria-label="color mode"
            onClick={toggleColorMode}
            size="lg"
            variant="ghost"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />

          <NotificationCenter />
        </Stack>
      </HStack>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
