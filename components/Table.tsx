import {
  Box,
  VStack,
  StackDivider,
  Flex,
  HStack,
} from "@chakra-ui/react";

export const HeaderTop = ({ children, ...props }) => (
  <VStack spacing={1} align="stretch">
    {children}
  </VStack>
);

export const Body = ({ children, ...props }) => (
  <Flex
    justifyContent="center"
    border="1px"
    borderRadius="lg"
    borderColor="gray.200"
    padding={2}
  >
    <HStack spacing={6}>{children}</HStack>
  </Flex>
);

export const HeaderBottom = ({ children, ...props }) => <Box>{children}</Box>;

export const Header = ({ children }) => (
  <Flex justifyContent="space-between">{children}</Flex>
);

export const Cell = ({ children, ...props }) => (
  <Box width="full">
    <VStack spacing={4} align="stretch" width="full">
      {children}
    </VStack>
  </Box>
);

const Table = ({ children }) => {
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {children}
    </VStack>
  );
};

export default Table;