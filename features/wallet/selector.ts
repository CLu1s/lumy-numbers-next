import { createSelector } from "reselect";
import { WalletState, BalancedCategory, Category } from "../../types";
import { RootState } from "../../store/reducers";
import { getCategories, getIncome } from "../budget/selector";

const walletSelector = (state: RootState): WalletState => state.wallet;

export const getTransactions = createSelector(
  [walletSelector],
  (state: WalletState): WalletState["transactions"] => state.transactions
);

export const getBalance = createSelector(
  [getIncome, getTransactions],
  (income: number, transactions: WalletState["transactions"]): number => {
    return (
      income -
      transactions.reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0)
    );
  }
);

export const getBalanceByCategories = createSelector(
  [getCategories, getTransactions, getIncome],
  (
    categories: Category[],
    transactions: WalletState["transactions"],
    income: number
  ): BalancedCategory[] => {
    const balanceByCategories = categories.map((category) => {
      const transactionsByCategory = transactions.filter(
        (transaction) => transaction.categoryID === category.id
      );
      const balance = transactionsByCategory.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      );
      const amountPercentage = (category.percentage * income) / 100;

      const progress = Math.round(100-(balance * 100) / amountPercentage);
      return {
        ...category,
        balance,
        progress,
      };
    });
    return balanceByCategories;
  }
);
