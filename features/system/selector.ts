import { createSelector } from "async-selector-kit";
import { SystemState } from "../../types";
import { RootState } from "../../store/reducers";

export const systemSelector = (state: RootState): SystemState => state.system;

export const getIsMenuCollapsed = createSelector(
  [systemSelector],
  (state: SystemState): boolean => state.isMenuCollapsed
);
