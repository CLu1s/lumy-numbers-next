import {
  Box,
  LinkBox,
  HStack,
  VStack,
  Text,
  LinkOverlay,
  Square,
  Button,
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";

const MenuItem = () => {
  return (
    <LinkBox as="button" width="full" maxW="full">
      <LinkOverlay href="#">
        <Box p={2} shadow="md" borderWidth="1px" flex="1" borderRadius="xl">
          <HStack spacing={4}>
            <Square size="30px" bg="green.500" color="white" borderRadius="md">
              <AiFillHome />
            </Square>
            <Text>Dashboard</Text>
          </HStack>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

export default MenuItem;
