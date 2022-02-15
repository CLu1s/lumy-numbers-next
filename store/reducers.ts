import { combineReducers } from "@reduxjs/toolkit";
import walletSlice from "../features/wallet/walletSlice";
import budgetSlice from "../features/budget/budgetSlice";
import fixedCostSlice from "../features/fixedCost/fixedCostSlice";
import bucketSlice from "../features/bucket/bucketSlice";

export const reducers = combineReducers({
  wallet: walletSlice,
  budget: budgetSlice,
  fixedCost: fixedCostSlice,
  bucket: bucketSlice,
});

export type RootState = ReturnType<typeof reducers>;
