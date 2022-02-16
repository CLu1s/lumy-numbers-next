import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { BucketState, LoadingStates } from "../../types";
import { userByUserName } from "../../src/graphql/queries";
import {
  createBucket as createBucketMutation,
  createUser,
} from "../../src/graphql/mutations";
const initialState: BucketState = {
  userName: null,
  bucket: null,
  status: {
    status: LoadingStates.IDLE,
    error: null,
  },
  error: null,
};

export const fetchBucket = createAsyncThunk(
  "budget/fetchBucket",
  async (userName: string) => {
    const response = await API.graphql(
      graphqlOperation(userByUserName, { userName })
    );
    return { response, userName };
  }
);

export const createBucket = createAsyncThunk(
  "budget/createBucket",
  async (input: any) => {
    const bucket = (await API.graphql(
      graphqlOperation(createBucketMutation, { input })
    )) as any;

    const { id } = bucket.data.createBucket;

    const userInput = {
      userName: input.name,
      bucketID: id,
    };
    await API.graphql(
      graphqlOperation(createUser, { input: userInput })
    );
    return bucket;
  }
);

const bucketSlice = createSlice({
  name: "bucket",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchBucket.pending.type]: (state) => {
      state.status.status = LoadingStates.LOADING;
    },
    [fetchBucket.fulfilled.type]: (state, action) => {
      state.status.status = LoadingStates.SUCCEEDED;
      state.userName = action.payload.userName;
      state.bucket = action.payload.response.data.userByUserName.items[0];
    },
    [fetchBucket.rejected.type]: (state,action) => {
      state.status.status = LoadingStates.FAILED;
      state.status.error = action.payload.error;
    },
    [createBucket.pending.type]: (state) => {
      state.status.status = LoadingStates.LOADING;
    },
    [createBucket.fulfilled.type]: (state, action) => {
      state.status.status = LoadingStates.SUCCEEDED;
      state.bucket = action.payload.data.createBucket;
    },
    [createBucket.rejected.type]: (state,action) => {
      state.status.status = LoadingStates.FAILED;
      state.status.error = action.payload.error;
    },
  },
});

// export const { addCategory, updateCategory } = bucketSlice.actions;
export default bucketSlice.reducer;
