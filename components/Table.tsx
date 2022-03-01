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

export const Body = ({ children }) => (
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

export const HeaderBottom = ({ children, ...props }) => <HStack spacing={4}>{children}</HStack>;

export const Header = ({ children }) => (
  <Flex justifyContent="space-between">{children}</Flex>
);

export const Cell = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => (
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
