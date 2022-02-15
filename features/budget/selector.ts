import { createSelector } from "reselect";
import { BudgetState, Category } from "../../types";
import { RootState } from "../../store/reducers";

const budgetSelector = (state: RootState): BudgetState => state.budget;

export const getCategories = createSelector(
  [budgetSelector],
  (state: BudgetState): Category[] => state.categories
);

export const getIncome = createSelector(
  [budgetSelector],
  (state: BudgetState): number => state.incomes.reduce((acc, curr) => acc + curr.amount, 0)
);
