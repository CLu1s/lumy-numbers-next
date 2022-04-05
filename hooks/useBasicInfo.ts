import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import isSameMonth from "date-fns/isSameMonth";
import {
  getStatus as getBucketStatus,
  getBucketID,
} from "../features/bucket/selector";
import { fetchTransactions } from "../features/wallet/walletSlice";
import { getStatus as getBudgetStatus } from "../features/budget/selector";
import { fetchIncomes } from "../features/budget/budgetSlice";
import { LoadingStates } from "../types";

const useBasicInfo = () => {
  const [currentPeriod, setCurrentPeriod] = useState(new Date());
  const dispatch = useDispatch();
  const bucketStatus = useSelector(getBucketStatus);
  const bucketID = useSelector(getBucketID);
  const budgetStatus = useSelector(getBudgetStatus);

  const fetch = (newPeriod: Date) => {
    if (
      (bucketStatus.status === LoadingStates.LOADING ||
        budgetStatus.status === LoadingStates.LOADING) &&
      !isSameMonth(newPeriod, currentPeriod)
    ) {
      return;
    }
    dispatch(fetchTransactions({ bucketID, period: newPeriod }));
    dispatch(fetchIncomes({ bucketID, period: newPeriod }));
    setCurrentPeriod(newPeriod);
  };

  const unmount = () => {
    dispatch(fetchTransactions({ bucketID, period: new Date() }));
    dispatch(fetchIncomes({ bucketID, period: new Date() }));
    setCurrentPeriod(new Date());
  };
  return { fetch, unmount };
};
export default useBasicInfo;
