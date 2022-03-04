import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import TransactionMini from "../../components/TransactionMini";

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

  const manageOpen = useCallback((item: any) => {
    setElementToEdit(item);
    onOpen();
  }, [onOpen]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setAlertDialogIsOpen(true);
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
          <Tag size="md" variant="solid" bgColor={value?.color ?? "gray.400"}>
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
              onClick={() => handleDelete(value.id)}
              color="red.500"
            >
              <FiTrash2 />
            </Button>
          </HStack>
        ),
      },
    ],

    [manageOpen]
  );

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
          {sortedTransactions.length > 0 ? (
            <>
              <Box display={{ base: "none", lg: "block" }}>
                <Table columns={columns} data={transactions} />
              </Box>
              <Box display={{ base: "block", lg: "none" }}>
                <TransactionMini
                  transactions={sortedTransactions}
                  editable
                  onEdit={manageOpen}
                  onDelete={(id) => {
                    handleDelete(id);
                  }}
                />
              </Box>
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
