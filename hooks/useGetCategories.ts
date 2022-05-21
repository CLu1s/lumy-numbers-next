import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBucketID } from "../features/bucket/selector";
import { fetchCategories } from "../features/budget/budgetSlice";
import { getCategories, getStatus } from "../features/budget/selector";
import { LoadingStates } from "../types";

const useGetCategories = () => {
  const dispatch = useDispatch();
  const bucketID = useSelector(getBucketID);
  const categories = useSelector(getCategories);
  const { status } = useSelector(getStatus);

  useEffect(() => {
    if (!bucketID || status !== LoadingStates.IDLE || categories.length > 1)
      return;
    dispatch(fetchCategories(bucketID));
  }, [bucketID, dispatch, categories, status]);
  return { categories };
};
export default useGetCategories;
