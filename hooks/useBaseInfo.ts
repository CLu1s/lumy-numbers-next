import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStatus as getBucketStatus,
  getBucket,
} from "../features/bucket/selector";
import { fetchBucket } from "../features/bucket/bucketSlice";
import { fetchTransactions } from "../features/wallet/walletSlice";
import { getStatus as getBudgetStatus } from "../features/budget/selector";
import { fetchIncomes, fetchCategories } from "../features/budget/budgetSlice";

const useBaseInfo = (userName?: string) => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();
  const bucketStatus = useSelector(getBucketStatus);
  const bucket = useSelector(getBucket);
  const budgetStatus = useSelector(getBudgetStatus);

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
    if (budgetStatus.status === "idle" && bucket?.bucketID) {
      dispatch(fetchTransactions(bucket.bucketID));
      dispatch(fetchIncomes(bucket.bucketID));
      dispatch(fetchCategories(bucket.bucketID));
    }
  }, [dispatch, budgetStatus, bucket]);

  return;
};
export default useBaseInfo;
