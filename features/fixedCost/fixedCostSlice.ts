import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { createTransaction } from "../../src/graphql/mutations";
import { listTransactions } from "../../src/graphql/queries";
import { FixedCostState, LoadingStates } from "../../types";
const initialState: FixedCostState = {
  items: [
    {
      id: "1",
      name: "Renta",
      type: "monthly",
      amount: 5500,
      description: "La renta de la casa",
    },
    {
      id: "2",
      name: "Amazon Prime",
      type: "anual",
      amount: 1042.84,
    },
  ],
};

const fixedCostSlice = createSlice({
  name: "fixedCost",
  initialState,
  reducers: {
    addFixedCost: (
      state,
      action: PayloadAction<{
        name: string;
        type: string;
        amount: number;
        description: string;
      }>
    ) => {
      const { name, type, amount, description } = action.payload;
      state.items.push({
        id: Math.random().toString(),
        name,
        type,
        amount,
        description,
      });
    },
  },
});

export const { addFixedCost } = fixedCostSlice.actions;
export default fixedCostSlice.reducer;
