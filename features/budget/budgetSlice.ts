import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { BudgetState, LoadingStates } from "../../types";
import { userByUserName } from "../../src/graphql/queries";

const initialState: BudgetState = {
  status: LoadingStates.IDLE,
  incomes: [
    {
      id: "1",
      amount: 60557.28,
      date: "2020-01-01",
      description: "Salary 1",
    },
    {
      id: "2",
      amount: 9148.3,
      date: "2020-01-01",
      description: "Salary 2",
    },
  ],
  categories: [
    {
      id: "1",
      icon: "HiOutlineHome",
      name: "Gastos Fijos",
      percentage: 50,
      color: "green.500",
    },
    {
      id: "2",
      icon: "AiOutlineStock",
      name: "Ahorro e Inversión",
      percentage: 30,
      color: "purple.500",
    },
    {
      id: "3",
      icon: "BiHappyBeaming",
      name: "Gastos sin Culpa",
      percentage: 20,
      color: "blue.500",
    },
  ],
};



const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    addCategory: (
      state,
      action: PayloadAction<{
        name: string;
        percentage: number;
        color: string;
        icon: string;
      }>
    ) => {
      const { name, percentage, color, icon } = action.payload;
      state.categories.push({
        id: Math.random().toString(),
        name,
        percentage,
        color,
        icon,
      });
    },
    updateCategory: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        percentage: number;
        color: string;
        icon: string;
      }>
    ) => {
      const { id, name, percentage, color, icon } = action.payload;
      const category = state.categories.find((category) => category.id === id);
      if (category) {
        category.name = name;
        category.percentage = percentage;
        category.color = color;
        category.icon = icon;
      }
    },
  },
  
});

export const { addCategory, updateCategory } = budgetSlice.actions;
export default budgetSlice.reducer;
