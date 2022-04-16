import isBefore from "date-fns/isBefore";
import isSameMonth from "date-fns/isSameMonth";
import { createSelector } from "reselect";
import { ProjectsState, Bucket } from "../../types";
import { RootState } from "../../store/reducers";
import { compareDates } from "../../utils";

const projectSelector = (state: RootState): ProjectsState => state.projects;
const BucketSelector = (state: RootState): Bucket => state.bucket.bucket;

const sortProjetcs = (projects: ProjectsState["items"]) => {
  const temp = [...projects];
  return temp.sort((a, b) => {
    return compareDates(new Date(a.endDate), new Date(b.endDate));
  });
};

export const getAllProjects = createSelector(
  projectSelector,
  (state: ProjectsState): ProjectsState["items"] => sortProjetcs(state.items)
);

export const getProjects = createSelector(
  projectSelector,
  (state: ProjectsState): ProjectsState["items"] => {
    const temp = [...state.items];
    const projects = temp.filter((item) => {
      const today = new Date();
      return (
        isSameMonth(new Date(item.endDate), today) ||
        isBefore(new Date(), new Date(item.endDate))
      );
    });
    return sortProjetcs(projects);
  }
);

export const getStatus = createSelector(
  projectSelector,
  (state: ProjectsState): ProjectsState["status"] => state.status
);

export const getCategoryID = createSelector(
  [projectSelector, BucketSelector],
  (state: ProjectsState, bucketState: Bucket): ProjectsState["categoryID"] =>
    state.categoryID || bucketState?.projectsCategoryID || null
);
