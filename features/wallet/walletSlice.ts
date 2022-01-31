import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { createTransaction } from "../../src/graphql/mutations";
import { listTransactions } from "../../src/graphql/queries";
import { WalletState, LoadingStates } from "../../types";
const initialState: WalletState = {
  transactions: [],
  status: LoadingStates.IDLE,
  error: null,
  pokemon: null,
};

export const fetchTransactions = createAsyncThunk(
  "wallet/fetchTransactions",
  async () => {
    const response = await API.graphql(graphqlOperation(listTransactions));
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
      state.status = LoadingStates.Loading;
    },
    [fetchTransactions.fulfilled.type]: (state, action) => {
      state.transactions = action.payload.data.listTransactions.items;
      state.status = LoadingStates.SUCCEEDED;
    },
    [fetchTransactions.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [addNewTransaction.pending.type]: (state) => {
      state.status = LoadingStates.Loading;
    },
    [addNewTransaction.fulfilled.type]: (state, action) => {
      state.transactions.push(action.payload.data.createTransaction);
      state.status = LoadingStates.SUCCEEDED;
    },
    [addNewTransaction.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    }
  },
});

export const { addTransaction } = walletSlice.actions;
export default walletSlice.reducer;
