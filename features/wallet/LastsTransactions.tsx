import React, { useState, useCallback } from "react";
import { Text, Stack, useDisclosure } from "@chakra-ui/react";
import _orderBy from "lodash/orderBy";
import { useSelector, useDispatch } from "react-redux";
import { getLastTransactions, getStatus } from "./selector";
import Loading from "../../components/Loading";
import TransactionMini from "../../components/TransactionMini";
import { Transaction } from "../../types";
import { deleteTransaction } from "./walletSlice";
import RecordExpense from "./RecordExpense";
import AlertDialog from "../../components/AlertDialog";

export default function LastsTransactions() {
  const dispatch = useDispatch();
  const transactions = useSelector(getLastTransactions);
  const [elementToEdit, setElementToEdit] = useState<Transaction>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteId, setDeleteId] = useState(null);
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);

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
      <Stack spacing={4}>
        <Text>
          Aquí listamos las 6 transacciones más recientes que has tenido
        </Text>
        <TransactionMini
          transactions={transactions}
          editable
          onEdit={manageOpen}
          onDelete={(id) => {
            handleDelete(id);
          }}
        />
      </Stack>
    </>
  );
}
