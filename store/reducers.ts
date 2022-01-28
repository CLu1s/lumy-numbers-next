import { combineReducers } from "@reduxjs/toolkit";
import walletSlice from "../features/wallet/walletSlice";
import budgetSlice from "../features/budget/budgetSlice";

export const reducers = combineReducers({
  wallet: walletSlice,
  budget: budgetSlice,
});

export type RootState = ReturnType<typeof reducers>;
