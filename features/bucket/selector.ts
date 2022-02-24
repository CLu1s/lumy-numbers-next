import { createSelector } from "reselect";
import { BucketState } from "../../types";
import { RootState } from "../../store/reducers";

const bucketSelector = (state: RootState): BucketState => state.bucket;

export const getStatus = createSelector(
  [bucketSelector],
  (state: BucketState): BucketState["status"] => state.status
);

export const getBucket = createSelector(
  [bucketSelector],
  (state: BucketState): BucketState["bucket"] => state.bucket
);

export const getBucketID = createSelector(
  [bucketSelector],
  (state: BucketState): string => state.bucket?.id ?? ""
);

export const getNanoID = createSelector(
  [bucketSelector],
  (state: BucketState): string => state.bucket?.nanoid
);
