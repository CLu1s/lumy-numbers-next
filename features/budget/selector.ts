import { createSelector } from "reselect";
import { BudgetState, Category } from "../../types";
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
    if (globalPercentageSum > 100) {
      return categories;
    }
    if (globalPercentageSum < 100) {
      const index = categories.findIndex((item) => item.id === "rest");

      if (index !== -1) {
        categories[index].percentage = 100 - globalPercentageSum;
      } else {
        categories.push({
          id: "rest",
          name: "Resto",
          percentage: 100 - globalPercentageSum,
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

export const getListOfIncomes = createSelector(
  [budgetSelector],
  (state: BudgetState): BudgetState["incomes"] =>
    _sortBy(state.incomes, ["description"])
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
