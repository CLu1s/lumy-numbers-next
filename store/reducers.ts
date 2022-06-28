import { combineReducers } from "@reduxjs/toolkit";
import { createReducer } from "async-selector-kit";
import walletSlice from "../features/wallet/walletSlice";
import budgetSlice from "../features/budget/budgetSlice";
import fixedCostSlice from "../features/fixedCost/fixedCostSlice";
import bucketSlice from "../features/bucket/bucketSlice";
import projectSlice from "../features/project/projectsSlice";
import notificationSlice from "../features/notificationCenter/notificationSlice";
import systemSlice from "../features/system/systemSlice";

export const reducers = combineReducers({
  AsyncSelector: createReducer(),
  wallet: walletSlice,
  budget: budgetSlice,
  fixedCost: fixedCostSlice,
  bucket: bucketSlice,
  projects: projectSlice,
  notifications: notificationSlice,
  system: systemSlice,
});

export type RootState = ReturnType<typeof reducers>;
