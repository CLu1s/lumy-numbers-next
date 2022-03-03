import { Heading, Text, Tag } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import Table, {
  Header,
  HeaderTop,
  HeaderBottom,
  Body,
  Cell,
} from "../../components/TableCards";
import money from "../../utils/money";
import { getItems } from "./selector";

export default function DataTable() {
  const transactions = useSelector(getItems);

  const renderCells = transactions.map((item, index) => (
    <Cell key={item.id}>
      <Header>
        <HeaderTop >
          <Heading as="h6" size="xs" textColor="gray.400">
            Descripción
          </Heading>
          <Text fontWeight="bold">{item.description}</Text>
        </HeaderTop>
        <HeaderBottom>
          <Tag
            size="md"
            variant="solid"
            bgColor={item.type === "monthly" ? "orange" : "teal"}
          >
            {item.type}
          </Tag>
        </HeaderBottom>
      </Header>
      <Body>
        <Text fontWeight="medium">{money(item.amount)}</Text>
      </Body>
    </Cell>
  ));

  return <Table>{renderCells}</Table>;
}
