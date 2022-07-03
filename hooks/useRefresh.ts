import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLastFetched } from "../features/bucket/bucketSlice";
import { getBucketID, getLastFetched } from "../features/bucket/selector";
import { fetchCategories, fetchIncomes } from "../features/budget/budgetSlice";
import { fetchFixedCost } from "../features/fixedCost/fixedCostSlice";
import { fetchProjects } from "../features/project/projectsSlice";
import { getStatus } from "../features/wallet/selector";
import { fetchTransactions } from "../features/wallet/walletSlice";
import { LoadingStates } from "../types";

const useRefresh = (): [() => void, boolean, Date] => {
  const dispatch = useDispatch();
  const bucketID = useSelector(getBucketID);
  const status = useSelector(getStatus);
  const lastFetched = useSelector(getLastFetched);

  return [
    useCallback(() => {
      dispatch(fetchTransactions({ bucketID }));
      dispatch(setLastFetched(new Date()));
      dispatch(fetchIncomes({ bucketID, period: new Date() }));
      dispatch(fetchCategories(bucketID));
      dispatch(fetchFixedCost(bucketID));
      dispatch(fetchProjects(bucketID));
    }, [bucketID, dispatch]),
    status === LoadingStates.LOADING,
    lastFetched,
  ];
};
export default useRefresh;
