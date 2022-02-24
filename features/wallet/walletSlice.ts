import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { createTransaction,updateTransaction as updateTransactionMutation } from "../../src/graphql/mutations";
import { getBucket } from "../../src/graphql/queries";
import { WalletState, LoadingStates } from "../../types";
const initialState: WalletState = {
  transactions: [],
  status: LoadingStates.IDLE,
  error: null,
};

export const fetchTransactions = createAsyncThunk(
  "wallet/fetchTransactions",
  async (bucketID: String) => {
    const response = await API.graphql(graphqlOperation(getBucket, { id: bucketID
    }));
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
    try{
      const { createdAt, updatedAt, ...input } = transaction;
      const response = await API.graphql(
        graphqlOperation(updateTransactionMutation, { input })
        );
        return response;
      }catch(error){
        console.log(error);
      }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<{
        amount: string;
        description: string;
        categoryID: string;
      }>
    ) => {
      const { amount, description, categoryID } = action.payload;
      state.transactions.push({
        id: (Math.random() * 1000).toString(),
        amount: parseFloat(amount),
        description,
        categoryID: categoryID,
        date: new Date().toISOString(),
      });
    },
  },
  extraReducers: {
    [fetchTransactions.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [fetchTransactions.fulfilled.type]: (state, action) => {
      state.transactions = action.payload.data.getBucket.transactionsByDate.items;
      state.status = LoadingStates.SUCCEEDED;
    },
    [fetchTransactions.rejected.type]: (state, action) => {
      state.error = action.error.message;
      state.status = LoadingStates.FAILED;
    },
    [addNewTransaction.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [addNewTransaction.fulfilled.type]: (state, action) => {
      state.transactions.push(action.payload.data.createTransaction);
      state.status = LoadingStates.SUCCEEDED;
    },
    [addNewTransaction.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [updateTransaction.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [updateTransaction.fulfilled.type]: (state, action) => {
      state.transactions = state.transactions.map((transaction) =>
        transaction.id === action.payload.data.updateTransaction.id
          ? action.payload.data.updateTransaction
          : transaction
      );
      state.status = LoadingStates.SUCCEEDED;
    },
    [updateTransaction.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    }
  },
});

export const { addTransaction } = walletSlice.actions;
export default walletSlice.reducer;
