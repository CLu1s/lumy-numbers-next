import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import { LoadingStates, NotificationState, Notification } from "../../types";
import {
  createNotification as createNotificationMutation,
  deleteNotification as deleteNotificationMutation,
} from "../../src/graphql/mutations";
import { notificationsByBucket } from "../../src/graphql/queries";
import { onCreateTransaction } from "../../src/graphql/subscriptions";

const initialState: NotificationState = {
  items: [],
  status: LoadingStates.IDLE,
  error: null,
};

export const fetchAllNotifications = createAsyncThunk(
  "notifications/getAllNotifications",
  async (bucketID: string) => {
    const notifications = (await API.graphql(
      graphqlOperation(notificationsByBucket, {
        bucketID,
      })
    )) as any;
    return notifications.data.notificationsByBucket.items;
  }
);

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
      return id;
    } catch (error) {
      return rejectWithValue(error.errors[0].message);
    }
  }
);

// export const listenToNotifications = createAsyncThunk(
//   "notifications/listenToNotifications",
//   async (bucketID: string) => {
//     const notifications = (await API.graphql(
//       graphqlOperation(onCreateTransaction)).subscribe({
//         next: (eventData) => {
//           const { value } = eventData.value.data.onCreateTransaction;
//           const notification = {
//             id: value.id,
//             bucketID: value.bucketID,
//             message: value.message,
//             createdAt: value.createdAt,
//           };
//           toast.success(notification.message);
//           return notification;
//         },
//       })
//     ) as any;
//     return notifications.data.onCreateTransaction;
//     // return notifications.data.notificationsByBucket.items;
//   }
// );

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
      state.items = state.items.filter(
        (notification) => notification.id !== action.payload
      );
    },
    [deleteNotification.rejected.type]: (state, action) => {
      state.status = LoadingStates.FAILED;
      toast.error(action.payload);
      console.error(action.payload);
      state.error = action.payload;
    },
    [fetchAllNotifications.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [fetchAllNotifications.fulfilled.type]: (state, action) => {
      state.status = LoadingStates.SUCCEEDED;
      state.items = action.payload;
    },
    [fetchAllNotifications.rejected.type]: (state, action) => {
      state.status = LoadingStates.FAILED;
      toast.error(action.payload);
      console.error(action.payload);
      state.error = action.payload;
    },
    // [listenToNotifications.pending.type]: (state) => {
    //   state.status = LoadingStates.LOADING;
    // },
    // [listenToNotifications.fulfilled.type]: (state, action) => {
    //   state.status = LoadingStates.SUCCEEDED;
    //   state.items = action.payload;
    // },
  },
});
export const { addNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
