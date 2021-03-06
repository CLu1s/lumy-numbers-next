import { createSelector } from "@reduxjs/toolkit";
import { WalletState, BalancedCategory, Category } from "../../types";
import { RootState } from "../../store/reducers";
import { getCategories, getIncome } from "../budget/selector";
import _orderBy from "lodash/orderBy";
import { compareDates } from "../../utils/dates";
import { createAsyncSelectorResults } from "async-selector-kit";

const walletSelector = (state: RootState): WalletState => state.wallet;

export const getTransactions = createSelector(
  [walletSelector],
  (state: WalletState): WalletState["transactions"] => state.transactions
);

export const getStatus = createSelector(
  [walletSelector],
  (state: WalletState): WalletState["status"] => state.status
);

const formatTransactions = (
  transactions: WalletState["transactions"],
  categories: Category[]
) => {
  return transactions.map((transaction: WalletState["transactions"][0]) => {
    const category = categories.find(
      (category: Category) => category.id === transaction.categoryID
    );
    return {
      ...transaction,
      category: category,
    };
  });
};

const compareTransactions = (transactions: WalletState["transactions"]) => {
  const transactionsClone = [...transactions];
  return transactionsClone.sort((a, b) => {
    return compareDates(new Date(a.date), new Date(b.date));
  });
};

export const getLastTransactions = createSelector(
  [getTransactions, getCategories],
  (
    transactions: WalletState["transactions"],
    categories: Category[]
  ): WalletState["transactions"] => {
    const t = compareTransactions(transactions);
    return formatTransactions(t.reverse().slice(0, 6), categories);
  }
);

export const getTransactionsFormatted = createSelector(
  [getTransactions, getCategories],
  (
    transactions: WalletState["transactions"],
    categories: Category[]
  ): WalletState["transactions"] =>
    formatTransactions(compareTransactions(transactions), categories)
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
      const budgetAmount = category.percentage * income;
      const amountPercentage = category.percentage * income;
      const spent = transactionsByCategory.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      );
      const balance = budgetAmount - spent;
      const progress = Math.round(balance / amountPercentage);
      return {
        ...category,
        balance,
        progress,
        spent,
      };
    });
    return balanceByCategories;
  }
);

export const getTotalSpent = createSelector(
  [getTransactions],
  (transactions: WalletState["transactions"]): number => {
    return transactions.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  }
);

export const getPeriod = createSelector(
  [walletSelector],
  (state: WalletState): WalletState["period"] => state.period
);
