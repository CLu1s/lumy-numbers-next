import React, { useState, useEffect } from "react";
import {
  Heading,
  Text,
  Tag,
  Center,
  Select,
  Stack,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { money, date } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getTransactionsFormatted, getStatus } from "./selector";
import Table, {
  Header,
  HeaderTop,
  HeaderBottom,
  Body,
  Cell,
} from "../../components/Table";
import { FiEdit, FiTrash2 } from "react-icons/fi";

import Loading from "../../components/Loading";
import RecordExpense from "./RecordExpense";
import AlertDialog from "../../components/AlertDialog";
import { deleteTransaction } from "./walletSlice";
enum Order {
  ASC = "asc",
  DESC = "desc",
}

export default function DataTable() {
  const transactions = useSelector(getTransactionsFormatted);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [sort, setSort] = useState("date");
  const [order, setOrder] = useState<boolean | Order>(Order.DESC);
  const [elementToEdit, setElementToEdit] = useState<any>(null);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    setSortedTransactions(_orderBy(transactions, [sort], [order]));
  }, [transactions, sort, order]);

  const manageOpen = (item: any) => {
    setElementToEdit(item);
    onOpen();
  };

  const renderCells = sortedTransactions.map((item) => (
    <Cell key={item.id}>
      <Header>
        <HeaderTop>
          <Text fontWeight="bold">{money(item.amount)}</Text>
        </HeaderTop>
        <HeaderBottom>
          <Tag size="md" variant="solid" bgColor={item.categoryColor}>
            {item.categoryName}
          </Tag>
          <Box>
            <Button bg="white" onClick={() => manageOpen(item)}>
              <FiEdit />
            </Button>
            <Button
              bg="white"
              onClick={() => {
                setDeleteId(item.id);
                setAlertDialogIsOpen(true);
              }}
              color="red.500"
            >
              <FiTrash2 />
            </Button>
          </Box>
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
      <AlertDialog
        title="Eliminar Transacción"
        description=" ¿Está seguro? No podrás deshacer esta acción después."
        isOpen={alertDialogIsOpen}
        onClose={() => {
          setAlertDialogIsOpen(false);
          setDeleteId(null);
        }}
        onDelete={() => {
          dispatch(deleteTransaction(deleteId));
          setAlertDialogIsOpen(false);
          setDeleteId(null);
        }}
      />
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
