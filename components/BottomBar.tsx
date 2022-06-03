import { useRouter } from "next/router";
import Link from "next/link";

import {
  Box,
  LinkBox,
  HStack,
  LinkOverlay,
  useColorModeValue,
  Text,
  VStack,
  Square,
} from "@chakra-ui/react";
import { menuList } from "../config/menu";

const BottomBar = () => {
  const router = useRouter();
  const bg = useColorModeValue("white", "gray.900");
  const bgButton = useColorModeValue("white", "gray.800");
  const bgSquareActive = useColorModeValue("blue.500", "blue.200");
  const bgSquare = useColorModeValue("white", "gray.800");

  const renderButtons = menuList
    .map((item) => {
      const isActive = router.pathname === item.path;
      if (!item.showOnMobile) return null;
      return (
        <LinkBox key={item.path} as="button" maxWidth="70px" padding={4}>
          <Link href={item.path} passHref>
            <LinkOverlay>
              <VStack spacing={1}>
                <Square
                  size="30px"
                  bg={isActive ? bgSquareActive : bgSquare}
                  color={isActive ? "white" : "blue.200"}
                  borderRadius={"lg"}
                >
                  {item.icon}
                </Square>
                <Text fontSize="xs">{item.mobileLabel ?? item.label}</Text>
              </VStack>
            </LinkOverlay>
          </Link>
        </LinkBox>
      );
    })
    .filter((item) => item);
  return (
    <Box
      position={{ base: "fixed", md: "static" }}
      display={{ base: "block", md: "none" }}
      // boxShadow="lg"
      backgroundColor={bg}
      color="gray.500"
      bottom="0"
      width="full"
      paddingBottom={6}
      paddingX={2}
      zIndex={100}
    >
      <HStack spacing={0} width="full" justifyContent="space-between">
        {renderButtons}
      </HStack>
    </Box>
  );
};

export default BottomBar;
