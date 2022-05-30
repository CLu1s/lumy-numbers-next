import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import { LoadingStates, NotificationState, Notification } from "../../types";
import {
  createNotification as createNotificationMutation,
  deleteNotification as deleteNotificationMutation,
} from "../../src/graphql/mutations";

const initialState: NotificationState = {
  items: [],
  status: LoadingStates.IDLE,
  error: null,
};

export const createNotification = async (
  notification: Notification
): Promise<Notification> => {
  const input = {
    ...notification,
  };
  try {
    const result = (await API.graphql(
      graphqlOperation(createNotificationMutation, { input })
    )) as any;
    return result.data.createNotification;
  } catch (error) {
    return error;
  }
};

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id: string, { rejectWithValue }) => {
    try {
      const result = (await API.graphql(
        graphqlOperation(deleteNotificationMutation, { input: { id } })
      )) as any;
      return result.data.deleteNotification;
    } catch (error) {
      return rejectWithValue(error.errors[0].message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.items.push(action.payload);
    },
    removeNotification: (state, action) => {
      state.items = state.items.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
  extraReducers: {
    [deleteNotification.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [deleteNotification.fulfilled.type]: (state, action) => {
      state.status = LoadingStates.SUCCEEDED;
    },
    [deleteNotification.rejected.type]: (state, action) => {
      state.status = LoadingStates.FAILED;
      toast.error(action.payload);
      console.error(action.payload);
      state.error = action.payload;
    },
  },
});
export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
