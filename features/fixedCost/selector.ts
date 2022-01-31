import { createSelector } from "reselect";
import { FixedCostState } from "../../types";
import { RootState } from "../../store/reducers";

const FixedCostSelector = (state: RootState): FixedCostState => state.fixedCost;

export const getItems = createSelector(
  [FixedCostSelector],
  (state: FixedCostState): FixedCostState["items"] => state.items
);