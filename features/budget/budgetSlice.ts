import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { BudgetState, LoadingStates } from "../../types";
import { createIncome } from "../../src/graphql/mutations";

const initialState: BudgetState = {
  status: LoadingStates.IDLE,
  error: null,
  incomes: [],
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

export const createNewIncome = createAsyncThunk(
  "budget/createNewIncome",
  async (input: BudgetState["incomes"]) => {
    try {
      const response = await API.graphql(
        graphqlOperation(createIncome, { input })
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const fetchIncomes = createAsyncThunk(
  "budget/fetchIncomes",
  async (bucketId: string) => {
    const response = await API.graphql(
      graphqlOperation(
        `query GetBucket($id: ID!) {
            getBucket(id: $id) {
              incomes {
                items {
                  id
                  amount
                  date
                  description
                createdAt
                updatedAt
                bucketID
              }
              nextToken
            }
          }
        }`,
        { id: bucketId }
      )
    );
    return response;
  }
);

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
  extraReducers: {
    [createNewIncome.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [createNewIncome.fulfilled.type]: (state, action) => {
      state.status = LoadingStates.IDLE;
      state.incomes.push(action.payload.data.createIncome);
    },
    [createNewIncome.rejected.type]: (state, action) => {
      state.status = LoadingStates.FAILED;
      state.error = action.payload.message;
    },
    [fetchIncomes.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [fetchIncomes.fulfilled.type]: (state, action) => {
      state.status = LoadingStates.SUCCEEDED;
      state.incomes = action.payload.data.getBucket.incomes.items;
    },
    [fetchIncomes.rejected.type]: (state, action) => {
      state.status = LoadingStates.FAILED;
      console.log(action.payload);
      state.error = action.payload;
    },
  },
});

export const { addCategory, updateCategory } = budgetSlice.actions;
export default budgetSlice.reducer;
