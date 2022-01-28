import { createSelector } from "reselect";
import { WalletState, BalancedCategory, Category } from "../../types";
import { RootState } from "../../store/reducers";
import { getCategories, getIncome } from "../budget/selector";

const walletSelector = (state: RootState): WalletState => state.wallet;

export const getTransactions = createSelector(
  [walletSelector],
  (state: WalletState): WalletState["transactions"] => state.transactions
);

export const getTransactionsFormatted = createSelector(
  [getTransactions, getCategories],
  (
    transactions: WalletState["transactions"],
    categories: Category[]
  ): WalletState["transactions"] => {
    return transactions.map((transaction: WalletState["transactions"][0]) => {
      const category = categories.find(
        (category: Category) => category.id === transaction.categoryID
      );
      console.log(category);
      return {
        ...transaction,
        categoryName: category ? category.name : "",
        categoryColor: category ? category.color : ""
      };
    });
  }
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
      const budgetAmount = (category.percentage / 100) * income;
      const amountPercentage = (category.percentage * income) / 100;
      const balance =
        budgetAmount -
        transactionsByCategory.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );

      const progress = Math.round(100 - (balance * 100) / amountPercentage);
      return {
        ...category,
        balance,
        progress,
      };
    });
    return balanceByCategories;
  }
);
