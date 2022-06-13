import { createSelector } from '@reduxjs/toolkit'
import { BudgetState, Category, Income } from "../../types";
import { RootState } from "../../store/reducers";
import _sortBy from "lodash/sortBy";
const budgetSelector = (state: RootState): BudgetState => state.budget;

const sanitizer = (state: Category[]): Category[] => {
  return state.reduce((acc, cur) => {
    if (cur.id !== "rest") {
      return [...acc, cur];
    }
    return acc;
  }, []);
};

export const getCategories = createSelector(
  [budgetSelector],
  (state: BudgetState): Category[] => {
    const categories = sanitizer(state.categories);
    const globalPercentageSum = categories.reduce(
      (acc, item) => acc + item.percentage,
      0
    );
    if (globalPercentageSum > 1) {
      return categories;
    }
    if (globalPercentageSum < 1) {
      const index = categories.findIndex((item) => item.id === "rest");

      if (index !== -1) {
        categories[index].percentage = 1 - globalPercentageSum;
      } else {
        categories.push({
          id: "rest",
          name: "Resto",
          percentage: 1 - globalPercentageSum,
          color: "yellow.500",
          icon: "AiOutlineWarning",
          bucketID: "rest",
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toDateString(),
        });
      }
    }
    return categories;
  }
);

export const getIncome = createSelector(
  [budgetSelector],
  (state: BudgetState): number =>
    state.incomes.reduce((acc, curr) => acc + curr.amount, 0)
);

export const getIncomesList = createSelector(
  [budgetSelector],
  (state: BudgetState): Income[] => state.incomes
);

export const getListOfIncomes = createSelector(
  [budgetSelector],
  (state: BudgetState): BudgetState["incomes"] =>
    _sortBy(state.incomes, ["description"])
);

export const getRest = createSelector(
  [budgetSelector],
  (state: BudgetState): number => {
    const categories = sanitizer(state.categories);
    const rest = categories.reduce((acc, item) => {
      return acc + item.percentage;
    }, 0);
    return Number((1 % rest).toFixed(5)) === 0.0 ? 1 : rest;
  }
);

export const getStatus = createSelector(
  [budgetSelector],
  (
    state: BudgetState
  ): { status: BudgetState["status"]; error: BudgetState["error"] } => ({
    status: state.status,
    error: state.error,
  })
);
