import { useRouter } from "next/router";
import { Box, Button, HStack, Flex } from "@chakra-ui/react";
import { menuList } from "../config/menu";

const BottomBar = () => {
  const router = useRouter();
  return (
    <Box
      position={{ base: "fixed", md: "static" }}
      display={{ base: "block", md: "none" }}
      boxShadow="lg"
      backgroundColor="white"
      color="gray.500"
      bottom="0"
      width="full"
      paddingBottom={6}
    >
      <HStack spacing="4">
        {menuList.map((item) => (
          <Button
            key={item.id}
            width="25%"
            h="60px"
            colorScheme="whiteAlpha"
            color={router.pathname === item.path ? "blue.400" : "gray.400"}
            // shadow={router.pathname === item.path ? "md" : "none"}
            fontSize="xl"
            onClick={() => {
              router.push(item.path);
            }}
          >
            <Flex direction="column" align="center" justify="center">
              {item.icon}
              {/* <Text fontSize="xs">{item.label}</Text> */}
            </Flex>
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default BottomBar;
