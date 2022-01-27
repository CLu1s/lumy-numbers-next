import {
  Box,
  VStack,
  StackDivider,
  Wrap,
  Heading,
  Text,
  Tag,
  Flex,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import money from "../utils/money";

export default function DataTable() {
  const data = React.useMemo(
    () => [
      {
        id: 1,
        description: "Compras",
        amount: Math.random() * 10000,
        date: "2022-05-01",
        category: "Compras",
      },
      {
        id: 2,
        description: "Compras",
        amount: Math.random() * 10000,
        date: "2022-05-01",
        category: "Compras",
      },
      {
        id: 3,
        description: "Compras",
        amount: Math.random() * 10000,
        date: "2022-05-01",
        category: "Compras",
      },
    ],
    []
  );
  const renderCells = data.map((item, index) => (
    <Box width="full" key={item.id}>
      <VStack spacing={4} align="stretch" width="full">
        <Flex justifyContent="space-between">
          <VStack spacing={1} align="stretch">
            <Heading as="h6" size="xs" textColor="gray.400">
              Descripción
            </Heading>
            <Text fontWeight="bold">{item.description}</Text>
          </VStack>
          <Box>
            <Tag size="md" variant="solid" colorScheme="whatsapp">
              {item.category}
            </Tag>
          </Box>
        </Flex>
        <Flex
          justifyContent="center"
          border="1px"
          borderRadius="lg"
          borderColor="gray.200"
          padding={2}
        >
          <HStack spacing={6}>
            <Text textColor="gray.500" textTransform="capitalize">
              {format(new Date(item.date), "dd - LLLL", {
                locale: es,
              })}
            </Text>
            <Text fontWeight="medium">{money(item.amount)}</Text>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  ));

  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      {renderCells}
    </VStack>
  );
}
