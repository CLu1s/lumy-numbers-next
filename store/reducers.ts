import { combineReducers } from "@reduxjs/toolkit";
import walletSlice from "../features/wallet/walletSlice";
import budgetSlice from "../features/budget/budgetSlice";
import fixedCostSlice from "../features/fixedCost/fixedCostSlice";

export const reducers = combineReducers({
  wallet: walletSlice,
  budget: budgetSlice,
  fixedCost: fixedCostSlice,
});

export type RootState = ReturnType<typeof reducers>;
