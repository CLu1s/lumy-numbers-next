import React from "react";
import { Heading, Text, Tag, HStack, Button } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { CheckIcon } from "@chakra-ui/icons";
import Table, {
  Header,
  HeaderTop,
  HeaderBottom,
  Body,
  Cell,
} from "../../components/TableCards";
import { money, date } from "../../utils";
import { FixedCost } from "../../types";

type Props = {
  items: FixedCost[];
  handleDelete?: (id: string) => void;
  manageOpen?: (item: FixedCost) => void;
  managePaid: (item: FixedCost) => void;
};

export default function DataTable({
  items,
  handleDelete,
  manageOpen,
  managePaid,
}: Props) {
  const renderCells = items.map((item) => {
    const currentDate = new Date();
    currentDate.setDate(item.dueDay);

    const dueDate = item.dueDay
      ? date(currentDate, " eeee dd MMMM")
      : "Sin Definir";
    return (
      <Cell key={item.id}>
        <Header>
          <HeaderTop>
            <Heading as="h6" size="xs" textColor="gray.400">
              Descripción
            </Heading>
            <HStack>
              <Text fontWeight="bold">{item.description}</Text>
              <Text>{dueDate}</Text>
            </HStack>
          </HeaderTop>
          <HeaderBottom>
            <HStack>
              {manageOpen && (
                <Button onClick={() => manageOpen(item)}>
                  <FiEdit />
                </Button>
              )}
              {handleDelete && (
                <Button onClick={() => handleDelete(item.id)} color="red.500">
                  <FiTrash2 />
                </Button>
              )}
            </HStack>
          </HeaderBottom>
        </Header>
        <Body>
          <Text fontWeight="medium">{money(item.amount)}</Text>
          {item.status !== "paid" ? (
            <Button
              leftIcon={<CheckIcon />}
              onClick={() => managePaid(item)}
              colorScheme="messenger"
              variant="solid"
            >
              Pagado
            </Button>
          ) : (
            <Tag colorScheme="messenger">Pagado</Tag>
          )}
        </Body>
      </Cell>
    );
  });

  return <Table>{renderCells}</Table>;
}
