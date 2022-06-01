import { useSelector, useDispatch } from "react-redux";
import { addNewTransaction } from "../../wallet/walletSlice";
import { getBucketID } from "../../bucket/selector";
import { getCategoryID } from "../selector";

export const usePayFixedCost = () => {
  const bucketID = useSelector(getBucketID);
  const categoryID = useSelector(getCategoryID);

  const dispatch = useDispatch();
  const managePaid = (data: any) => {
    const { createdAt, updatedAt, ...input } = data;
    const { type, status, id, dueDay, ...trans } = input;
    trans.description = `Costo Fijo: ${trans.description}`;
    dispatch(
      addNewTransaction({
        ...trans,
        bucketID,
        categoryID,
        date: new Date().toISOString(),
      })
    );
  };
  return managePaid;
};

export default usePayFixedCost;
