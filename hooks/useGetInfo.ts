import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getStatus as getBucketStatus,
  getBucketID,
  getLastFetched,
} from "../features/bucket/selector";
import { fetchBucket, setLastFetched } from "../features/bucket/bucketSlice";

const useGetInfo = (userName?: string) => {
  const bucketID = useSelector(getBucketID);
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();

  const bucketStatus = useSelector(getBucketStatus);

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

  return { bucketID, bucketStatus };
};
export default useGetInfo;
