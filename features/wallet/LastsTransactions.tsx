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
  HStack,
  VStack,
  Divider,
} from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { money, date, icons } from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import { getLastTransactions, getStatus } from "./selector";
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

export default function LastsTransactions() {
  const transactions = useSelector(getLastTransactions);
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

  const renderCells = sortedTransactions.map((item) => (
    <HStack key={item.id} spacing="4" alignItems="flex-start">
      <VStack color={item.category?.color} fontSize="2xl" spacing={0} >
        {icons(item.category?.icon)}
        <Box height="12" width="2px" backgroundColor="gray.200" />
      </VStack>
      <Stack spacing={0}>
        <Text fontWeight="bold">{`${money(item.amount)}, ${
          item.description
        }`}</Text>
        <Text textColor="gray.500" textTransform="capitalize">
          {date(new Date(item.date), "dd - LLLL")}
        </Text>
      </Stack>
    </HStack>
  ));

  if (status === "idle") {
    return <Loading />;
  }

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

      <Stack spacing={2}>
        {renderCells.length > 0 ? (
          renderCells
        ) : (
          <Center>
            <Heading as="h6" size="xs" textColor="gray.400">
              No hay registros
            </Heading>
          </Center>
        )}
      </Stack>
    </>
  );
}
