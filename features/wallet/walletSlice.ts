import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import {
  createTransaction,
  updateTransaction as updateTransactionMutation,
  deleteTransaction as deleteTransactionMutation,
} from "../../src/graphql/mutations";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import format from "date-fns/format";
import add from "date-fns/add";
import { WalletState, LoadingStates } from "../../types";
const initialState: WalletState = {
  transactions: [],
  status: LoadingStates.IDLE,
  error: null,
};

const localFetchTransactions = async (id: string, init: string, end: string) =>
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
  async (bucketID: string) => {
    const actualDate = new Date();
    const firstDate = startOfMonth(actualDate);
    const lastDate = add(endOfMonth(actualDate), { days: 1 });
    const init = format(firstDate, "yyyy-MM-dd");
    const end = format(lastDate, "yyyy-MM-dd");
    const response = localFetchTransactions(bucketID, init, end);
    return response;
  }
);

export const addNewTransaction = createAsyncThunk(
  "wallet/addNewTransaction",
  async (transaction: WalletState["transactions"][0]) => {
    const response = await API.graphql(
      graphqlOperation(createTransaction, { input: transaction })
    );
    return response;
  }
);

export const updateTransaction = createAsyncThunk(
  "wallet/updateTransaction",
  async (transaction: WalletState["transactions"][0]) => {
    try {
      const { createdAt, updatedAt, category, ...input } = transaction;
      const response = await API.graphql(
        graphqlOperation(updateTransactionMutation, { input })
      );
      return response;
    } catch (error) {
      console.log(error);
    }
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
  reducers: {},
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
      toast.success("Transacción guardada correctamente!");
      state.transactions.push(action.payload.data.createTransaction);
      state.status = LoadingStates.SUCCEEDED;
    },
    [addNewTransaction.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
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

// export const { addTransaction } = walletSlice.actions;
export default walletSlice.reducer;
