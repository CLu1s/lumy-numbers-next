import { createSelector } from "reselect";
import { FixedCostState, Bucket } from "../../types";
import { RootState } from "../../store/reducers";
import _orderBy from "lodash/orderBy";

const FixedCostSelector = (state: RootState): FixedCostState => state.fixedCost;
const BucketSelector = (state: RootState): Bucket => state.bucket.bucket;

export const getItems = createSelector(
  [FixedCostSelector],
  (state: FixedCostState): FixedCostState["items"] =>
    _orderBy(state.items, ["status"], ["desc"])
);
export const getPendingItems = createSelector(
  [FixedCostSelector],
  (state: FixedCostState): FixedCostState["items"] =>
    state.items.filter((item) => item.status !== "paid")
);

export const getStatus = createSelector(
  [FixedCostSelector],
  (state: FixedCostState): FixedCostState["status"] => state.status
);

export const getCategoryID = createSelector(
  [FixedCostSelector, BucketSelector],
  (state: FixedCostState, bucketState: Bucket): FixedCostState["categoryID"] =>
    state.categoryID || bucketState?.fixedCostCategoryID || null
);
