import React, { useState, useEffect, useMemo } from "react";
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
  HStack,
} from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { money, date } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getTransactionsFormatted, getStatus } from "./selector";
import TableCards, {
  Header,
  HeaderTop,
  HeaderBottom,
  Body,
  Cell,
} from "../../components/TableCards";
import Table from "../../components/Table";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Transaction } from "../../types";
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
  const [elementToEdit, setElementToEdit] = useState<Transaction>(null);
  const [sortedTransactions, setSortedTransactions] = useState<Transaction[]>(
    []
  );
  const status = useSelector(getStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    setSortedTransactions(_orderBy(transactions, [sort], [order]));
  }, [transactions, sort, order]);

  const manageOpen = (item: any) => {
    setElementToEdit(item);
    onOpen();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Fecha",
        accessor: "date",
        Cell: ({ cell: { value } }) => (
          <Text> {date(new Date(value), "dd - LLLL")}</Text>
        ),
      },

      {
        Header: "Descripción",
        accessor: "description",
      },
      {
        Header: "Categoría",
        accessor: "category",
        Cell: ({ cell: { value } }) => (
          <Tag size="md" variant="solid" bgColor={value.color}>
            {value ? value.name : "Sin categoría"}
          </Tag>
        ),
      },
      {
        Header: "Monto",
        accessor: "amount",
        Cell: ({ cell: { value } }) => <Text>{money(value)}</Text>,
      },
      {
        id: "edit",
        accessor: (row) => row,
        Cell: ({ cell: { value } }) => (
          <HStack>
            <Button bg="white" onClick={() => manageOpen(value)}>
              <FiEdit />
            </Button>
            <Button
              bg="white"
              onClick={() => {
                setDeleteId(value.id);
                setAlertDialogIsOpen(true);
              }}
              color="red.500"
            >
              <FiTrash2 />
            </Button>
          </HStack>
        ),
      },
    ],

    []
  );

  const renderCells = sortedTransactions.map((item) => (
    <Cell key={item.id}>
      <Header>
        <HeaderTop>
          <Text fontWeight="bold">{money(item.amount)}</Text>
        </HeaderTop>
        <HeaderBottom>
          <Tag size="md" variant="solid" bgColor={item.category?.color}>
            {item.category?.name ? item.category?.name : "Sin categoría"}
          </Tag>
          <HStack>
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
          </HStack>
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
        <Stack spacing={4} display={{ base: "flex", lg: "none" }}>
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
        <TableCards>
          {renderCells.length > 0 ? (
            <>
              <Box display={{ base: "none", lg: "block" }}>
                <Table columns={columns} data={transactions} />
              </Box>
              <Box display={{ base: "block", lg: "none" }}>{renderCells}</Box>
            </>
          ) : (
            <Center>
              <Heading as="h6" size="xs" textColor="gray.400">
                No hay registros
              </Heading>
            </Center>
          )}
        </TableCards>
      </Stack>
    </>
  );
}
