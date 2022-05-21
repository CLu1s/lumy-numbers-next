import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBucketID } from "../features/bucket/selector";
import { fetchFixedCost } from "../features/fixedCost/fixedCostSlice";
import { getItems, getStatus } from "../features/fixedCost/selector";
import { LoadingStates } from "../types";

const useGetFixedCosts = () => {
  const bucketID = useSelector(getBucketID);
  const dispatch = useDispatch();
  const status = useSelector(getStatus);

  const fixedCostList = useSelector(getItems);

  useEffect(() => {
    if (!bucketID || status !== LoadingStates.IDLE || fixedCostList.length > 0)
      return;
    dispatch(fetchFixedCost(bucketID));
  }, [bucketID, dispatch, fixedCostList, status]);

  return { fixedCostList };
};
export default useGetFixedCosts;
