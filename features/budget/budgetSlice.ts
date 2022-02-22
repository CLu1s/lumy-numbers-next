import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { BudgetState, Category, LoadingStates } from "../../types";
import {
  createIncome,
  updateCategory as updateCategoryMutation,
} from "../../src/graphql/mutations";

const initialState: BudgetState = {
  status: LoadingStates.IDLE,
  error: null,
  incomes: [],
  categories: [],
};

export const createNewIncome = createAsyncThunk(
  "budget/createNewIncome",
  async (input: BudgetState["incomes"]) => {
    const response = await API.graphql(
      graphqlOperation(createIncome, { input })
    );
    return response;
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

export const updateCategory = createAsyncThunk(
  "budget/updateCategory",
  async (input: Category) => {
    const { createdAt, updatedAt, ...rest } = input;

    return await API.graphql(
      graphqlOperation(updateCategoryMutation, { input: rest })
    );
  }
);

export const fetchCategories = createAsyncThunk(
  "budget/fetchCategories",
  async (bucketId: string) => {
    const response = await API.graphql(
      graphqlOperation(
        `query GetBucket($id: ID!) {
            getBucket(id: $id) {
              categories {
                items {
                  id
                  icon
                  name
                  percentage
                  color
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
        bucketID:""
      });
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
    [fetchCategories.rejected.type]: (state) => {
      state.status = LoadingStates.FAILED;
      state.error = "Error Cargando las Categorias";
    },
    [fetchCategories.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [fetchCategories.fulfilled.type]: (state, action) => {
      state.status = LoadingStates.SUCCEEDED;
      state.categories = action.payload.data.getBucket.categories.items;
    },
    [updateCategory.fulfilled.type]: (state, action) => {
      const { id, ...rest } = action.payload.data.updateCategory;
      const index = state.categories.findIndex((item) => item.id === id);
      state.categories[index] = { id, ...state.categories[id], ...rest };
    },
    [updateCategory.rejected.type]: (state, action) => {
      state.status = LoadingStates.FAILED;
      state.error = action.payload;
    },
    [updateCategory.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
  },
});

export const { addCategory } = budgetSlice.actions;
export default budgetSlice.reducer;
