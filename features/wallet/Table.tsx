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
import money from "../../utils/money";
import { useSelector } from "react-redux";
import { getTransactionsFormatted } from "./selector";

export default function DataTable() {
  const transactions = useSelector(getTransactionsFormatted);

  const comapare = (a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  };

  const renderCells = transactions.sort(comapare).map((item, index) => (
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
            <Tag size="md" variant="solid" bgColor={item.categoryColor}>
              {item.categoryName}
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
