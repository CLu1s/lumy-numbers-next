import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { BudgetState, Income, Category, LoadingStates } from "../../types";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import sub from "date-fns/sub";
import format from "date-fns/format";
import add from "date-fns/add";
import {
  createIncome,
  createCategory as createCategoryMutation,
  updateCategory as updateCategoryMutation,
  updateIncome as updateIncomeMutation,
  deleteIncome as deleteIncomeMutation,
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

export const updateIcome = createAsyncThunk(
  "budget/updateIncome",
  async (icome: Income) => {
    const { createdAt, updatedAt, ...input } = icome;
    const response = await API.graphql(
      graphqlOperation(updateIncomeMutation, { input })
    );
    return response;
  }
);

const localFetchIncome = async (id: string, init: string, end: string) =>
  API.graphql(
    graphqlOperation(
      `query GetBucket($id: ID!,$init: String!, $end: String!) {
          getBucket(id: $id) {
            incomes(date: {
              between: [ $init, $end ]
            }) {
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
      { id, init, end }
    )
  );

export const fetchIncomes = createAsyncThunk(
  "budget/fetchIncomes",
  async (bucketId: string) => {
    const actualDate = new Date();
    const firstDate = startOfMonth(actualDate);
    const lastDate = add(endOfMonth(actualDate), { days: 1 });
    const init = format(firstDate, "yyyy-MM-dd");
    const end = format(lastDate, "yyyy-MM-dd");
    let newIncomes = [];
    const currentIcomes = (await localFetchIncome(bucketId, init, end)) as any;
    const incomes = currentIcomes.data.getBucket.incomes.items;
    if (incomes.length === 0) {
      const initLastMonth = format(sub(firstDate, { months: 1 }), "yyyy-MM-dd");
      const endLastMonth = format(sub(lastDate, { months: 1 }), "yyyy-MM-dd");
      const lastMonthIncomes = (await localFetchIncome(
        bucketId,
        initLastMonth,
        endLastMonth
      )) as any;

      const oldIncomes = lastMonthIncomes.data.getBucket.incomes.items;
      const promises = oldIncomes.map((income) => {
        const { id, updatedAt, createdAt, ...input } = income;
        input.date = startOfMonth(actualDate);
        return API.graphql(graphqlOperation(createIncome, { input }));
      });
      newIncomes = await Promise.all(promises);
    }
    return currentIcomes || newIncomes;
  }
);

export const deleteIncome = createAsyncThunk(
  "budget/deleteIncome",
  async (id: string) => {
    const response = await API.graphql(
      graphqlOperation(deleteIncomeMutation, { input: { id } })
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
export const createCategory = createAsyncThunk(
  "budget/createCategory",
  async (input: Category) => {
    const { id, ...rest } = input;
    console.log(rest);
    try {
      return await API.graphql(
        graphqlOperation(createCategoryMutation, { input: rest })
      );
    } catch (e) {
      console.log(e);
    }
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
        bucketID: "",
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
      state.error = "Hubo un error al crear el ingreso";
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
    [createCategory.fulfilled.type]: (state, action) => {
      const { id, ...rest } = action.payload.data.createCategory;
      state.categories.push({ id, ...rest });
      state.status = LoadingStates.SUCCEEDED;
    },
    [createCategory.rejected.type]: (state, action) => {
      state.status = LoadingStates.FAILED;
      state.error = action.payload;
    },
    [createCategory.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [updateIcome.fulfilled.type]: (state, action) => {
      const { id, ...rest } = action.payload.data.updateIncome;
      const index = state.incomes.findIndex((item) => item.id === id);
      state.incomes[index] = { id, ...state.incomes[id], ...rest };
    },
    [updateIcome.rejected.type]: (state, action) => {
      state.status = LoadingStates.FAILED;
      console.log(action);
      state.error = action.error?.message || "Error al actualizar el ingreso";
    },
    [updateIcome.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [deleteIncome.fulfilled.type]: (state, action) => {
      const index = state.incomes.findIndex(
        (item) => item.id === action.payload.data.deleteIncome.id
      );
      state.incomes.splice(index, 1);
    },
    [deleteIncome.rejected.type]: (state, action) => {
      state.status = LoadingStates.FAILED;
      state.error = "Error deleting income";
    },
    [deleteIncome.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
  },
});

export const { addCategory } = budgetSlice.actions;
export default budgetSlice.reducer;
