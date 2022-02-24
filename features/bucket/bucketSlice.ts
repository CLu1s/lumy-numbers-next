import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import { BucketState, LoadingStates } from "../../types";
import {
  getBucket,
  userByUserName,
  bucketByNanoid as bucketByNanoidQuery,
} from "../../src/graphql/queries";
import { nanoid } from "nanoid";
import {
  createBucket as createBucketMutation,
  createUser,
  createCategory,
} from "../../src/graphql/mutations";

const CATEGORIES = [
  {
    icon: "HiOutlineHome",
    name: "Gastos Fijos",
    percentage: 50,
    color: "green.500",
  },
  {
    icon: "AiOutlineStock",
    name: "Ahorro e Inversión",
    percentage: 30,
    color: "purple.500",
  },
  {
    icon: "BiHappyBeaming",
    name: "Gastos sin Culpa",
    percentage: 20,
    color: "blue.500",
  },
];

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
    const user = (await API.graphql(
      graphqlOperation(userByUserName, { userName })
    )) as any;
    const [item] = user.data.userByUserName.items;
    if (item) {
      const { bucketID } = item;
      const bucketResult = (await API.graphql(
        graphqlOperation(getBucket, { id: bucketID })
      )) as any;
      const bucket = bucketResult.data.getBucket;
      return { bucket, userName };
    }
    return { bucket: null, userName };
  }
);

type PropCreateBucket = {
  name: string;
  code: string;
};

export const createBucket = createAsyncThunk(
  "budget/createBucket",
  async (input: PropCreateBucket) => {
    const { code, name } = input;
    const formatInput = {
      name,
      nanoid: nanoid(10),
    };
    let bucket;
    let id;
    let item = null;
    if (!code) {
      bucket = (await API.graphql(
        graphqlOperation(createBucketMutation, { input: formatInput })
      )) as any;
    } else {
      bucket = (await API.graphql(
        graphqlOperation(bucketByNanoidQuery, { nanoid: code })
      )) as any;
    }
    const { createBucket, bucketByNanoid } = bucket.data;
    if (bucketByNanoid) {
      const { items } = bucketByNanoid || createBucket;
      item = items[0];
      id = item.id;
    } else {
      id = createBucket.id;
    }

    const userInput = {
      userName: input.name,
      bucketID: id,
    };
    await API.graphql(graphqlOperation(createUser, { input: userInput }));
    if (!code) {
      const promises = CATEGORIES.map((category) =>
        API.graphql(
          graphqlOperation(createCategory, {
            input: {
              ...category,
              bucketID: id,
            },
          })
        )
      );
      await Promise.all(promises);
    }
    return item || createBucket;
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
      state.bucket = action.payload.bucket;
    },
    [fetchBucket.rejected.type]: (state, action) => {
      state.status.status = LoadingStates.FAILED;
      state.status.error =
        action.error.message || "Hubo un error al cargar el contenedor";
    },
    [createBucket.pending.type]: (state) => {
      state.status.status = LoadingStates.LOADING;
    },
    [createBucket.fulfilled.type]: (state, action) => {
      state.status.status = LoadingStates.SUCCEEDED;
      state.bucket = action.payload;
    },
    [createBucket.rejected.type]: (state, action) => {
      state.status.status = LoadingStates.FAILED;
      state.status.error = action.error.message;
    },
  },
});

// export const { addCategory, updateCategory } = bucketSlice.actions;
export default bucketSlice.reducer;
