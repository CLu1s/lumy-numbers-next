import React from "react";
import { Heading, Text, Tag, HStack, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import Table, {
  Header,
  HeaderTop,
  HeaderBottom,
  Body,
  Cell,
} from "../../components/TableCards";
import money from "../../utils/money";
import { getItems } from "./selector";
import { FixedCost } from "../../types";

type Props = {
  items: FixedCost[];
  handleDelete: (id: string) => void;
  manageOpen: (item: FixedCost) => void;
  managePaid: (item: FixedCost) => void;
};

export default function DataTable({
  items,
  handleDelete,
  manageOpen,
  managePaid,
}: Props) {
  const renderCells = items.map((item, index) => (
    <Cell key={item.id}>
      <Header>
        <HeaderTop>
          <Heading as="h6" size="xs" textColor="gray.400">
            Descripción
          </Heading>
          <Text fontWeight="bold">{item.description}</Text>
        </HeaderTop>
        <HeaderBottom>
          <HStack>
            {item.status !== "paid" ? (
              <Button colorScheme="teal" size="sm" onClick={() => managePaid(item)}>
                Pagar
              </Button>
            ) : (
              <Tag colorScheme="purple">Pagado</Tag>
            )}
            <Button bg="white" onClick={() => manageOpen(item)}>
              <FiEdit />
            </Button>
            <Button
              bg="white"
              onClick={() => handleDelete(item.id)}
              color="red.500"
            >
              <FiTrash2 />
            </Button>
          </HStack>
        </HeaderBottom>
      </Header>
      <Body>
        <Text fontWeight="medium">{money(item.amount)}</Text>
      </Body>
    </Cell>
  ));

  return <Table>{renderCells}</Table>;
}
