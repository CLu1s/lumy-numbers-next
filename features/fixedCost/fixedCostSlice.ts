import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import {
  updateBucket,
  createFixedCost,
  updateFixedCost as updateFixedCostMutation,
  deleteFixedCost as deleteFixedCostMutation,
  createTransaction,
} from "../../src/graphql/mutations";
import { fixedCostByBucket } from "../../src/graphql/queries";
import {
  FixedCostState,
  LoadingStates,
  FixedCost,
  Transaction,
} from "../../types";
const initialState: FixedCostState = {
  items: [],
  category: null,
  categoryID: null,
  status: LoadingStates.IDLE,
  error: null,
};

type addCategoryIDProps = {
  fixedCostCategoryID: string;
  id: string;
};

export const addCategoryID = createAsyncThunk(
  "fixedCost/addCategoryID",
  async (input: addCategoryIDProps) => {
    const response = await API.graphql(
      graphqlOperation(updateBucket, { input })
    );
    return response;
  }
);

export const fetchFixedCost = createAsyncThunk(
  "fixedCost/fetchFixedCost",
  async (bucketID: string) => {
    const response = await API.graphql(
      graphqlOperation(fixedCostByBucket, { bucketID })
    );
    return response;
  }
);

export const addFixedCost = createAsyncThunk(
  "fixedCost/addFixedCost",
  async (data: any) => {
    const input = {
      ...data,
      status: "pending",
    };
    const response = await API.graphql(
      graphqlOperation(createFixedCost, { input })
    );
    return response;
  }
);
export const updateFixedCost = createAsyncThunk(
  "fixedCost/updateFixedCost",
  async (element: any) => {
    const { createdAt, updatedAt, category, ...input } = element;

    const response = await API.graphql(
      graphqlOperation(updateFixedCostMutation, { input })
    );
    return response;
  }
);

type paidFixedCostProps = {
  element: FixedCost;
  bucketID: string;
  categoryID: string;
};

export const deleteFixedCost = createAsyncThunk(
  "fixedCost/deleteFixedCost",
  async (id: string) => {
    const response = await API.graphql(
      graphqlOperation(deleteFixedCostMutation, { input: { id } })
    );
    return response;
  }
);

const fixedCostSlice = createSlice({
  name: "fixedCost",
  initialState,
  reducers: {},
  extraReducers: {
    [addCategoryID.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [addCategoryID.fulfilled.type]: (state, action) => {
      state.categoryID = action.payload.data.updateBucket.fixedCostCategoryID;
      state.status = LoadingStates.SUCCEEDED;
    },
    [addCategoryID.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [fetchFixedCost.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [fetchFixedCost.fulfilled.type]: (state, action) => {
      state.items = action.payload.data.fixedCostByBucket.items;
      state.status = LoadingStates.SUCCEEDED;
    },
    [fetchFixedCost.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [addFixedCost.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [addFixedCost.fulfilled.type]: (state, action) => {
      state.items.push(action.payload.data.createFixedCost);
      state.status = LoadingStates.SUCCEEDED;
    },
    [addFixedCost.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [updateFixedCost.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [updateFixedCost.fulfilled.type]: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.data.updateFixedCost.id
          ? action.payload.data.updateFixedCost
          : item
      );
      state.status = LoadingStates.SUCCEEDED;
    },
    [updateFixedCost.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [deleteFixedCost.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [deleteFixedCost.fulfilled.type]: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.data.deleteFixedCost.id
      );
      state.status = LoadingStates.SUCCEEDED;
    },
    [deleteFixedCost.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
  },
});

// export const { updateFixedCost } = fixedCostSlice.actions;
export default fixedCostSlice.reducer;
