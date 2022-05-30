import { createSelector } from "reselect";
import { BucketState, User } from "../../types";
import { RootState } from "../../store/reducers";

export const bucketSelector = (state: RootState): BucketState => state.bucket;

export const getStatus = createSelector(
  [bucketSelector],
  (state: BucketState): BucketState["status"] => state.status
);

export const getBucket = createSelector(
  [bucketSelector],
  (state: BucketState): BucketState["bucket"] => state.bucket
);

export const getCollaborators = createSelector(
  [bucketSelector],
  (state: BucketState): User[] => state.bucket?.collaborators.items ?? []
);

export const getBucketID = createSelector(
  [bucketSelector],
  (state: BucketState): string => state.bucket?.id ?? ""
);

export const getNanoID = createSelector(
  [bucketSelector],
  (state: BucketState): string => state.bucket?.nanoid
);

export const getUserName = createSelector(
  [bucketSelector],
  (state: BucketState): string => state.userName ?? ""
);

export const getLastFetched = createSelector(
  [bucketSelector],
  (state: BucketState): Date | null => state.lastFetched
);
