import { combineReducers } from "@reduxjs/toolkit";
import walletSlice from "../features/wallet/walletSlice";
import budgetSlice from "../features/budget/budgetSlice";
import fixedCostSlice from "../features/fixedCost/fixedCostSlice";
import bucketSlice from "../features/bucket/bucketSlice";
import projectSlice from "../features/project/projectsSlice";
import notificationSlice from "../features/notificationCenter/notificationSlice";
import { createReducer } from "async-selector-kit";

export const reducers = combineReducers({
  wallet: walletSlice,
  budget: budgetSlice,
  fixedCost: fixedCostSlice,
  bucket: bucketSlice,
  projects: projectSlice,
  notifications: notificationSlice,
  AsyncSelector: createReducer(),
});

export type RootState = ReturnType<typeof reducers>;
