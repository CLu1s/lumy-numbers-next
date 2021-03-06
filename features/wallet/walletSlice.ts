import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import {
  createTransaction,
  updateTransaction as updateTransactionMutation,
  deleteTransaction as deleteTransactionMutation,
} from "../../src/graphql/mutations";
import { createNotification } from "../notificationCenter/notificationSlice";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import format from "date-fns/format";
import add from "date-fns/add";
import { money } from "../../utils";
import {
  WalletState,
  LoadingStates,
  NotificationTypes,
  Notification,
  Transaction,
} from "../../types";
const initialState: WalletState = {
  transactions: [],
  status: LoadingStates.IDLE,
  error: null,
  period: new Date(),
};

export const localFetchTransactions = async (
  id: string,
  init: string,
  end: string
) =>
  API.graphql(
    graphqlOperation(
      `query GetBucket($id: ID!,$init: String!, $end: String!) {
          getBucket(id: $id) {
            transactionsByDate(date: {
              between: [ $init, $end ]
            }) {
              items {
                id
                bucketID
                amount
                categoryID
                categoryName
                categoryColor
                date
                description
                createdAt
                updatedAt
              }
              nextToken
          }
        }
      }`,
      { id, init, end }
    )
  );

export const fetchTransactions = createAsyncThunk(
  "wallet/fetchTransactions",
  async ({ bucketID, period }: { bucketID: string; period?: Date }) => {
    const actualDate = period || new Date();
    const firstDate = startOfMonth(actualDate);
    const lastDate = add(endOfMonth(actualDate), { days: 1 });
    const init = format(firstDate, "yyyy-MM-dd");
    const end = format(lastDate, "yyyy-MM-dd");
    const response = localFetchTransactions(bucketID, init, end);
    return response;
  }
);

interface TransactionData extends Transaction {
  userName: string;
}

export const addNewTransaction = createAsyncThunk(
  "wallet/addNewTransaction",
  async (transaction: TransactionData, { rejectWithValue }) => {
    const { userName, ...transactionData } = transaction;
    let response;
    try {
      response = await API.graphql(
        graphqlOperation(createTransaction, { input: transactionData })
      );
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.errors[0].message);
    }
    try {
      await createNotification({
        message: `Agreg?? un gasto ${transaction.description} por ${money(
          Number(transaction.amount)
        )}`,
        date: new Date().toISOString(),
        type: NotificationTypes.TRANSACTION,
        bucketID: transaction.bucketID,
        userName: transaction.userName,
      } as Notification);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.errors[0].message);
    }
    return response;
  }
);

export const updateTransaction = createAsyncThunk(
  "wallet/updateTransaction",
  async (transaction: WalletState["transactions"][0]) => {
    const { createdAt, updatedAt, category, ...input } = transaction;
    const response = await API.graphql(
      graphqlOperation(updateTransactionMutation, { input })
    );
    return response;
  }
);

export const deleteTransaction = createAsyncThunk(
  "wallet/deleteTransaction",
  async (id: string) => {
    const response = await API.graphql(
      graphqlOperation(deleteTransactionMutation, { input: { id } })
    );
    return response;
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    changePeriod: (state, action) => {
      state.period = action.payload;
    },
  },
  extraReducers: {
    [fetchTransactions.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [fetchTransactions.fulfilled.type]: (state, action) => {
      state.transactions =
        action.payload.data.getBucket.transactionsByDate.items;
      state.status = LoadingStates.SUCCEEDED;
    },
    [fetchTransactions.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.error.message;
      state.status = LoadingStates.FAILED;
    },
    [addNewTransaction.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [addNewTransaction.fulfilled.type]: (state, action) => {
      toast.success("Transacci??n guardada correctamente!");
      state.transactions.push(action.payload.data.createTransaction);
      state.status = LoadingStates.SUCCEEDED;
    },
    [addNewTransaction.rejected.type]: (state, action) => {
      toast.error(action.payload);
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [updateTransaction.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [updateTransaction.fulfilled.type]: (state, action) => {
      toast.success("Guardado correctamente!");
      state.transactions = state.transactions.map((transaction) =>
        transaction.id === action.payload.data.updateTransaction.id
          ? action.payload.data.updateTransaction
          : transaction
      );
      state.status = LoadingStates.SUCCEEDED;
    },
    [updateTransaction.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [deleteTransaction.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [deleteTransaction.fulfilled.type]: (state, action) => {
      toast.success("Eliminado correctamente!");
      state.transactions = state.transactions.filter(
        (transaction) =>
          transaction.id !== action.payload.data.deleteTransaction.id
      );
      state.status = LoadingStates.SUCCEEDED;
    },
  },
});

export const { changePeriod } = walletSlice.actions;
export default walletSlice.reducer;
