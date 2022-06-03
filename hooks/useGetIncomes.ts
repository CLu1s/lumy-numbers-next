import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBucketID } from "../features/bucket/selector";
import { fetchIncomes } from "../features/budget/budgetSlice";
import { getIncomesList, getStatus } from "../features/budget/selector";
import { LoadingStates } from "../types";

const useGetIncomes = () => {
  const bucketID = useSelector(getBucketID);
  const dispatch = useDispatch();
  const { status } = useSelector(getStatus);
  const incomesList = useSelector(getIncomesList);

  useEffect(() => {
    if (!bucketID || status === LoadingStates.LOADING || incomesList.length > 0)
      return;
    dispatch(fetchIncomes({ bucketID }));
  }, [bucketID, dispatch, status, incomesList.length]);

  return { bucketID };
};
export default useGetIncomes;
