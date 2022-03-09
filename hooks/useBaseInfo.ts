import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStatus as getBucketStatus,
  getBucketID,
  getLastFetched,
} from "../features/bucket/selector";
import { fetchBucket, setLastFetched } from "../features/bucket/bucketSlice";
import { fetchTransactions } from "../features/wallet/walletSlice";
import { getStatus as getBudgetStatus } from "../features/budget/selector";
import { fetchIncomes, fetchCategories } from "../features/budget/budgetSlice";
import { fetchFixedCost } from "../features/fixedCost/fixedCostSlice";
import differenceInMinutes from "date-fns/differenceInMinutes";

const useBaseInfo = (userName?: string) => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();
  const bucketStatus = useSelector(getBucketStatus);
  const bucketID = useSelector(getBucketID);
  const budgetStatus = useSelector(getBudgetStatus);
  const lastFetched = useSelector(getLastFetched);

  const fetchAll = useCallback(() => {
    dispatch(fetchTransactions(bucketID));
    dispatch(fetchFixedCost(bucketID));
    dispatch(fetchIncomes(bucketID));
    dispatch(fetchCategories(bucketID));
    dispatch(setLastFetched(new Date()));
  }, [dispatch, bucketID]);
  useEffect(() => {
    if (
      bucketStatus.status === "succeeded" &&
      differenceInMinutes(new Date(), lastFetched) > 5
    ) {
      fetchAll();
    }
  });

  useEffect(() => {
    if (name === "" && userName !== "") {
      setName(userName);
    }
  }, [name, userName]);

  useEffect(() => {
    if (bucketStatus.status === "idle" && name) {
      dispatch(fetchBucket(name));
    }
  }, [dispatch, bucketStatus, name]);

  useEffect(() => {
    if (budgetStatus.status === "idle" && bucketID) {
      fetchAll();
    }
  }, [dispatch, budgetStatus, bucketID, fetchAll]);

  return;
};
export default useBaseInfo;
