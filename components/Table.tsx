import {
  Box,
  VStack,
  StackDivider,
  Flex,
  HStack,
  Button,
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

export const HeaderBottom = ({ children, ...props }) => <Box>{children}</Box>;

export const Header = ({ children }) => (
  <Flex justifyContent="space-between">{children}</Flex>
);

export const Cell = ({ children, onClick }:{children:JSX.Element|JSX.Element[], onClick?:()=>void}) => (
  <Box width="full">
    <button style={{ width: "100%" }} onClick={onClick}>
      <VStack spacing={4} align="stretch" width="full">
        {children}
      </VStack>
    </button>
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
