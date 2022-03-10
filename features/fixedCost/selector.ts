import { createSelector } from "reselect";
import { FixedCostState, Bucket, WalletState } from "../../types";
import { RootState } from "../../store/reducers";
import _orderBy from "lodash/orderBy";

const FixedCostSelector = (state: RootState): FixedCostState => state.fixedCost;
const BucketSelector = (state: RootState): Bucket => state.bucket.bucket;
const walletSelector = (state: RootState): WalletState => state.wallet;

const orderItems = (
  items: FixedCostState["items"],
  transactions: WalletState["transactions"],
  fixedCostCategoryID: string
) =>
  items.map((item: FixedCostState["items"][0]) => {
    const transaction = transactions.findIndex(
      (transaction: WalletState["transactions"][0]) =>
        transaction.description === item.description &&
        transaction.categoryID === fixedCostCategoryID
    );
    return {
      ...item,
      status: transaction > -1 ? "paid" : "unpaid",
    };
  });

export const getItems = createSelector(
  [FixedCostSelector, walletSelector, BucketSelector],
  (
    state: FixedCostState,
    walletState: WalletState,
    bucketState: Bucket
  ): FixedCostState["items"] => {
    const transactions = walletState.transactions;
    const items = orderItems(
      state.items,
      transactions,
      bucketState?.fixedCostCategoryID
    );
    return _orderBy(items, ["status"], ["desc"]);
  }
);
export const getPendingItems = createSelector(
  [FixedCostSelector, walletSelector, BucketSelector],
  (
    state: FixedCostState,
    walletState: WalletState,
    bucketState: Bucket
  ): FixedCostState["items"] => {
    const transactions = walletState.transactions;
    const items = orderItems(
      state.items,
      transactions,
      bucketState?.fixedCostCategoryID
    );
    return items.filter((item) => item.status !== "paid");
  }
);

export const getPendingAmount = createSelector(
  [FixedCostSelector],
  (state: FixedCostState): number =>
    state.items
      .filter((i) => i.status !== "paid")
      .reduce((acc, item) => acc + item.amount, 0)
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
