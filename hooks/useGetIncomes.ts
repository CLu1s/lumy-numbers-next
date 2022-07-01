import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBucketID } from "../features/bucket/selector";
import { fetchIncomes } from "../features/budget/budgetSlice";
import {
  getIncomesList,
  getStatus,
  getIncomesLoadingStatus,
} from "../features/budget/selector";
import { LoadingStates } from "../types";

const useGetIncomes = () => {
  const bucketID = useSelector(getBucketID);
  const dispatch = useDispatch();
  const { status } = useSelector(getStatus);
  const incomesList = useSelector(getIncomesList);
  const loadingIncomesStatus = useSelector(getIncomesLoadingStatus);

  useEffect(() => {
    if (
      !bucketID ||
      status === LoadingStates.LOADING ||
      loadingIncomesStatus === LoadingStates.LOADING ||
      incomesList.length > 0
    )
      return;
    dispatch(fetchIncomes({ bucketID }));
  }, [bucketID, dispatch, status, incomesList.length, loadingIncomesStatus]);

  return { bucketID };
};
export default useGetIncomes;
