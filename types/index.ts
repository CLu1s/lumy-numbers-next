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
  date: string;

};

export type WalletState = {
  transactions: Transaction[];
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
