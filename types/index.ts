export enum LoadingStates {
  IDLE = "idle",
  Loading = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}

export type LoadingStatus = {
  status: LoadingStates;
  error: string | null;
};

export type SingleTransaction = {
  id: string;
  amount: number;
  bucketID: string;
  categoryID: string;
  categoryName?: string;
  categoryColor?: string;
  status: string;
  description: string;
  date: string;
};

export type Transaction = {
  id: string;
  amount: number;
  categoryID: string;
  categoryName?: string;
  categoryColor?: string;
  date: string;
  description: string;
};

export type WalletState = {
  transactions: Transaction[];
  status: LoadingStates;
  error: string | null;
  pokemon: string | null;
};

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
  percentage: number;
};

export type BudgetState = {
  income: number;
  categories: Category[];
};

export type BalancedCategory = {
  id: string;
  name: string;
  color: string;
  icon: string;
  percentage: number;
  balance: number;
  progress: number;
};

export type FixedCost = {
  id: string;
  name: string;
  type: string;
  amount: number;
  description?: string;
};

export type FixedCostState = {
  items: FixedCost[];
};
