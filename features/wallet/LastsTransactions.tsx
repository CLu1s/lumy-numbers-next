import React, { useState, useCallback } from "react";
import {
  Text,
  Stack,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { useSelector, useDispatch } from "react-redux";
import { getLastTransactions, getStatus } from "./selector";
import Loading from "../../components/Loading";
import TransactionMini from "../../components/TransactionMini";
import { Transaction } from "../../types";
import { deleteTransaction } from "./walletSlice";
import RecordExpense from "./RecordExpense";
import AlertDialog from "../../components/AlertDialog";
import useGetTransactions from "../../hooks/useGetTransactions";
import Button from "../../components/Button";
import Screen from "../../components/Screen";

export default function LastsTransactions() {
  const dispatch = useDispatch();
  useGetTransactions();
  const transactions = useSelector(getLastTransactions);
  const [elementToEdit, setElementToEdit] = useState<Transaction>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);

  const color = useColorModeValue("blue", "cyan.200");

  const status = useSelector(getStatus);
  const manageOpen = useCallback(
    (item: any) => {
      setElementToEdit(item);
      onOpen();
    },
    [onOpen]
  );
  const handleDelete = (id) => {
    setDeleteId(id);
    setAlertDialogIsOpen(true);
  };
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
      <Screen
        title="Transacciones Recientes"
        description=" Aquí listamos las transacciones más recientes que has tenido"
      >
        <Stack spacing={4} marginBottom={4}>
          <TransactionMini
            transactions={transactions}
            editable
            onEdit={manageOpen}
            onDelete={(id) => {
              handleDelete(id);
            }}
          />
          <Button to="/app/transacciones">Ver Todas las Transacciones</Button>
        </Stack>
      </Screen>
    </>
  );
}
