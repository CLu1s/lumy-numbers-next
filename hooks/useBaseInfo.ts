import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStatus as getBucketStatus,
  getBucketID,
  getLastFetched,
} from "../features/bucket/selector";
import { fetchProjects } from "../features/project/projectsSlice";
import { fetchBucket, setLastFetched } from "../features/bucket/bucketSlice";
import { fetchTransactions } from "../features/wallet/walletSlice";
import { getPeriod } from "../features/wallet/selector";
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
  const period = useSelector(getPeriod);

  const fetchAll = useCallback(() => {
    dispatch(fetchTransactions({ bucketID, period }));
    dispatch(fetchIncomes({ bucketID, period }));
    dispatch(fetchFixedCost(bucketID));
    dispatch(fetchCategories(bucketID));
    dispatch(fetchProjects(bucketID));
    dispatch(setLastFetched(new Date()));
  }, [dispatch, bucketID, period]);

  // useEffect(() => {
  //   fetchAll();
  // }, [dispatch, bucketID, period, fetchAll]);

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
