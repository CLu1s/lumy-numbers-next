import {
  Box,
  VStack,
  StackDivider,
  Heading,
  Text,
  Tag,
  Flex,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { money, date } from "../../utils/";
import { useSelector } from "react-redux";
import { getTransactionsFormatted } from "./selector";
import Table, {
  Header,
  HeaderTop,
  HeaderBottom,
  Body,
  Cell,
} from "../../components/Table";

const compare = (a, b) => {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
};

export default function DataTable() {
  const transactions = useSelector(getTransactionsFormatted);

  const renderCells = transactions.sort(compare).map((item, index) => (
    <Cell key={item.id}>
      <Header>
        <HeaderTop >
          <Heading as="h6" size="xs" textColor="gray.400">
            Descripción
          </Heading>
          <Text fontWeight="bold">{item.description}</Text>
        </HeaderTop>
        <HeaderBottom>
          <Tag size="md" variant="solid" bgColor={item.categoryColor}>
            {item.categoryName}
          </Tag>
        </HeaderBottom>
      </Header>
      <Body>
        <Text textColor="gray.500" textTransform="capitalize">
          {date(new Date(item.date), "dd - LLLL")}
        </Text>
        <Text fontWeight="medium">{money(item.amount)}</Text>
      </Body>
    </Cell>
  ));

  return <Table>{renderCells}</Table>;
}
