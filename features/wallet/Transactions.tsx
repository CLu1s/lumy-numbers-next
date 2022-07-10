import React, { useState, useCallback } from "react";
import { Stack, useDisclosure, Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getStatus } from "./selector";
import TableCards from "../../components/TableCards";
import { Transaction } from "../../types";
import Loading from "../../components/Loading";
import RecordExpense from "./RecordExpense";
import AlertDialog from "../../components/AlertDialog";
import { deleteTransaction } from "./walletSlice";
import TransactionMini from "../../components/TransactionMini";
import { compareDates } from "../../utils";
import NoRegisters from "../../components/NoRegisters";
import { LoadingStates } from "../../types";
import Sorters from "../../components/Sorters";
import Filters from "../../components/Filters";
import { getCategories } from "../budget/selector";
import useGetTransactions from "../../hooks/useGetTransactions";

import DataTable from "./DataTable";
enum Order {
  ASC = "asc",
  DESC = "desc",
}

const compareTransactions = (transactions: Transaction[], order: Order) => {
  const transactionsClone = [...transactions];
  const t = transactionsClone.sort((a, b) => {
    return compareDates(new Date(a.date), new Date(b.date));
  });
  if (order === Order.DESC) {
    return t.reverse();
  }
  return t;
};

type Props = {
  transactions: Transaction[];
  filter: string[];
  setOrder: (order: Order) => void;
  setSort: (sort: string) => void;
  setFilter: (filter: string[]) => void;
};
export default function TransactionsTableContainer({
  transactions,
  filter,
  setOrder,
  setSort,
  setFilter,
}: Props) {
  useGetTransactions();
  const categories = useSelector(getCategories);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [elementToEdit, setElementToEdit] = useState<Transaction>(null);

  const status = useSelector(getStatus);
  const dispatch = useDispatch();

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

  if (status === LoadingStates.LOADING) {
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
      <Stack spacing={8} w="full">
        <Sorters onChangeSort={changeSort} onChangeOrder={changeOrder} />
        <Filters
          categories={categories}
          filter={filter}
          setFilter={setFilter}
        />
        <TableCards>
          {transactions.length > 0 ? (
            <>
              <Box display={{ base: "none", lg: "block" }} width="full">
                <DataTable
                  transactions={transactions}
                  manageOpen={manageOpen}
                  handleDelete={handleDelete}
                />
              </Box>
              <Box display={{ base: "block", lg: "none" }}>
                <TransactionMini
                  transactions={transactions}
                  editable
                  onEdit={manageOpen}
                  onDelete={(id) => {
                    handleDelete(id);
                  }}
                />
              </Box>
            </>
          ) : (
            <NoRegisters />
          )}
        </TableCards>
      </Stack>
    </>
  );
}
