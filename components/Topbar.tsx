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
} from "@chakra-ui/react";
import { RiUserLine, RiNotification2Line } from "react-icons/ri";
import Link from "next/link";
import Drawer from "./Drawer";

export default function Topbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            colorScheme="teal"
            variant="ghost"
            onClick={onOpen}
            display={{ base: "block", xl: "none" }}
          >
            <RiMenuFill fontSize={"1.5rem"} />
          </Button>
        </Stack>
        <Stack isInline spacing={4}>
          {/* <Avatar
            size="md"
            bg="transparent"
            icon={<RiNotification2Line fontSize="2rem"  />}
          >
            <AvatarBadge
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            />
          </Avatar> */}
          <Avatar
            size="md"
            bg="purple.500"
            icon={<RiUserLine fontSize="2rem" color="white" />}
          />
        </Stack>
      </HStack>
      <Drawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
