import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { updateBucket, createFixedCost } from "../../src/graphql/mutations";
import { fixedCostByBucket } from "../../src/graphql/queries";
import { FixedCostState, LoadingStates } from "../../types";
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

const fixedCostSlice = createSlice({
  name: "fixedCost",
  initialState,
  reducers: {
    updateFixedCost: (
      state,
      action: PayloadAction<{
        id: string;
        amount: number;
        description: string;
        status: string;
      }>
    ) => {
      const { id, ...rest } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.amount = rest.amount;
        item.description = rest.description;
        item.status = rest.status;
      }
    },
  },
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
  },
});

export const { updateFixedCost } = fixedCostSlice.actions;
export default fixedCostSlice.reducer;
