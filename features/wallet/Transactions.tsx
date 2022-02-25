import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Tag,
  Center,
  Select,
  Stack,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { money, date } from "../../utils";
import { useSelector } from "react-redux";
import { getTransactionsFormatted, getStatus } from "./selector";
import Table, {
  Header,
  HeaderTop,
  HeaderBottom,
  Body,
  Cell,
} from "../../components/Table";
import Loading from "../../components/Loading";
import RecordExpense from "./RecordExpense";

enum Order {
  ASC = "asc",
  DESC = "desc",
}

export default function DataTable() {
  const transactions = useSelector(getTransactionsFormatted);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sort, setSort] = useState("date");
  const [order, setOrder] = useState<boolean | Order>(Order.DESC);
  const [elementToEdit, setElementToEdit] = useState<any>(null);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const status = useSelector(getStatus);

  useEffect(() => {
    setSortedTransactions(_orderBy(transactions, [sort], [order]));
  }, [transactions, sort, order]);

  const manageOpen = (item: any) => {
    setElementToEdit(item);
    onOpen();
  };

  const renderCells = sortedTransactions.map((item) => (
    <Cell key={item.id} onClick={() => manageOpen(item)}>
      <Header>
        <HeaderTop>
          <Text fontWeight="bold">{money(item.amount)}</Text>
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
        <Text fontWeight="medium">{item.description}</Text>
        {/* <Text fontWeight="medium">American Express</Text> */}
      </Body>
    </Cell>
  ));

  if (status === "idle") {
    return <Loading />;
  }
  const changeOrder = (value: Order) => {
    setOrder(value);
  };

  const changeSort = (value: string) => {
    setSort(value);
  };
  const manageOnClose = () => {
    elementToEdit && setElementToEdit(null);
    onClose();
  };
  return (
    <>
      <RecordExpense
        isOpen={isOpen}
        onClose={manageOnClose}
        toEdit={elementToEdit}
      />
      <Stack spacing={8}>
        <Stack spacing={4}>
          <Select onChange={(e) => changeSort(e.target.value)}>
            <option value="date">Fecha</option>
            <option value="categoryName">Categoría</option>

            <option value="description">Descripcion</option>
            <option value="amount">Monto</option>
          </Select>
          <Select onChange={(e) => changeOrder(e.target.value as Order)}>
            <option value={Order.DESC}>Descendente</option>
            <option value={Order.ASC}>Ascendente</option>
          </Select>
        </Stack>
        <Table>
          {renderCells.length > 0 ? (
            renderCells
          ) : (
            <Center>
              <Heading as="h6" size="xs" textColor="gray.400">
                No hay registros
              </Heading>
            </Center>
          )}
        </Table>
      </Stack>
    </>
  );
}
