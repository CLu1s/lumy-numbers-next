import { useEffect } from "react";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { useSelector, useDispatch } from "react-redux";
import { getBucketID, getLastFetched } from "../features/bucket/selector";
import { setLastFetched } from "../features/bucket/bucketSlice";
import { fetchTransactions } from "../features/wallet/walletSlice";
import { getLastTransactions, getStatus } from "../features/wallet/selector";
import { LoadingStates } from "../types";

const useGetTransactions = () => {
  const dispatch = useDispatch();
  const bucketID = useSelector(getBucketID);
  const status = useSelector(getStatus);
  const lastFetched = useSelector(getLastFetched);

  const transactions = useSelector(getLastTransactions);

  useEffect(() => {
    if (!bucketID || status !== LoadingStates.IDLE || transactions.length > 0)
      return;
    dispatch(fetchTransactions({ bucketID }));
    dispatch(setLastFetched(new Date()));
  }, [bucketID, dispatch, status, transactions]);

  useEffect(() => {
    if (
      status === "succeeded" &&
      differenceInMinutes(new Date(), lastFetched) > 5
    ) {
      dispatch(fetchTransactions({ bucketID }));
      dispatch(setLastFetched(new Date()));
    }
  });

  return { bucketID };
};
export default useGetTransactions;
