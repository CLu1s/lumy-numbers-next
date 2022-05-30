import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import {
  updateBucket,
  createFixedCost,
  updateFixedCost as updateFixedCostMutation,
  deleteFixedCost as deleteFixedCostMutation,
} from "../../src/graphql/mutations";
import { fixedCostByBucket } from "../../src/graphql/queries";
import {
  FixedCostState,
  LoadingStates,
  FixedCost,
  NotificationTypes,
  Notification,
} from "../../types";
import { money } from "../../utils";

import { createNotification } from "../notificationCenter/notificationSlice";

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

interface NewFixedCost extends FixedCost {
  userName: string;
}

export const addFixedCost = createAsyncThunk(
  "fixedCost/addFixedCost",
  async (data: NewFixedCost, { rejectWithValue }) => {
    const { userName, ...fixedCost } = data;
    const input = {
      ...fixedCost,
      status: "pending",
    };
    const response = await API.graphql(
      graphqlOperation(createFixedCost, { input })
    );
    try {
      await createNotification({
        message: `Agregó un nuevo gasto fijo: ${data.description} por ${money(
          Number(data.amount)
        )}`,
        date: new Date().toISOString(),
        type: NotificationTypes.FIXED_COST,
        bucketID: data.bucketID,
        userName: userName,
      } as Notification);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.errors[0].message);
    }
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
      toast.success("Guardado correctamente!");
      state.categoryID = action.payload.data.updateBucket.fixedCostCategoryID;
      state.status = LoadingStates.SUCCEEDED;
    },
    [addCategoryID.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
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
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [addFixedCost.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [addFixedCost.fulfilled.type]: (state, action) => {
      toast.success("Guardado correctamente!");
      state.items.push(action.payload.data.createFixedCost);
      state.status = LoadingStates.SUCCEEDED;
    },
    [addFixedCost.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [updateFixedCost.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [updateFixedCost.fulfilled.type]: (state, action) => {
      toast.success("Guardado correctamente!");
      state.items = state.items.map((item) =>
        item.id === action.payload.data.updateFixedCost.id
          ? action.payload.data.updateFixedCost
          : item
      );
      state.status = LoadingStates.SUCCEEDED;
    },
    [updateFixedCost.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [deleteFixedCost.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [deleteFixedCost.fulfilled.type]: (state, action) => {
      toast.success("Eliminado correctamente!");
      state.items = state.items.filter(
        (item) => item.id !== action.payload.data.deleteFixedCost.id
      );
      state.status = LoadingStates.SUCCEEDED;
    },
    [deleteFixedCost.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
  },
});

// export const { updateFixedCost } = fixedCostSlice.actions;
export default fixedCostSlice.reducer;
