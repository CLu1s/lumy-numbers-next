import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WalletState } from "../../types";
const initialState: WalletState = {
  transactions: [
    {
      id: "1",
      amount: 5000,
      categoryID: "1",
      date: "2020-01-01",
    },
    {
      id: "2",
      amount: 3300,
      categoryID: "2",
      date: "2020-01-02",
    },
    {
      id: "3",
      amount: 1200,
      categoryID: "3",
      date: "2020-01-03",
    },
  ],
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<{ amount: number }>) => {
      const { amount } = action.payload;
      state.transactions.push({
        id: (Math.random() * 1000).toString(),
        amount,
        categoryID: "1",
        date: new Date().toISOString(),
      });
    },
  },
});

export const { addTransaction } = walletSlice.actions;
export default walletSlice.reducer;
