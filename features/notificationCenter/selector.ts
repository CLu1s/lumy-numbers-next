import { createSelector } from "reselect";
import { createAsyncSelectorResults } from "async-selector-kit";
import { NotificationState } from "../../types";
import { RootState } from "../../store/reducers";
import { getBucketID } from "../bucket/selector";
import { notificationsByBucket } from "../../src/graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const notificationsSelector = (state: RootState): NotificationState =>
  state.notifications;

export const getNotificationsQuery = async (bucketID: string) => {
  const notifications = (await API.graphql(
    graphqlOperation(notificationsByBucket, {
      bucketID,
    })
  )) as any;
  return notifications.data.notificationsByBucket.items;
};

export const [getNotifications, isLoading, error, forceUpdate] =
  createAsyncSelectorResults(
    {
      async: getNotificationsQuery,
      id: "myFirstAsyncSelector",
      defaultValue: [],
    },
    [getBucketID]
  );
