import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBucketID } from "../features/bucket/selector";
import { fetchProjects } from "../features/project/projectsSlice";
import { getAllProjects, getStatus } from "../features/project/selector";
import { LoadingStates } from "../types";

const useGetProjects = () => {
  const bucketID = useSelector(getBucketID);
  const dispatch = useDispatch();
  const status = useSelector(getStatus);

  const projects = useSelector(getAllProjects);

  useEffect(() => {
    if (!bucketID || status !== LoadingStates.IDLE || projects.length > 0)
      return;
    dispatch(fetchProjects(bucketID));
  }, [bucketID, dispatch, projects, status]);

  return { bucketID };
};
export default useGetProjects;
