import { createSelector } from "reselect";
import { ProjectsState, Bucket } from "../../types";
import { RootState } from "../../store/reducers";

const projectSelector = (state: RootState): ProjectsState => state.projects;
const BucketSelector = (state: RootState): Bucket => state.bucket.bucket;

export const getProjects = createSelector(
  projectSelector,
  (state: ProjectsState): ProjectsState["items"] => state.items
);

export const getCategoryID = createSelector(
  [projectSelector, BucketSelector],
  (state: ProjectsState, bucketState: Bucket): ProjectsState["categoryID"] =>
    state.categoryID || bucketState?.projectsCategoryID || null
);
