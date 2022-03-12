import { createSelector } from "reselect";
import { ProjectsState } from "../../types";
import { RootState } from "../../store/reducers";

const bucketSelector = (state: RootState): ProjectsState => state.projects;

export const getProjects = createSelector(
  bucketSelector,
  (state: ProjectsState): ProjectsState["items"] => state.items
);
