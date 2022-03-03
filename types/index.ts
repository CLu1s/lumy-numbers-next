
export enum LoadingStates {
  IDLE = "idle",
  LOADING = "loading",
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
  bucketID: string;
  amount: number;
  categoryID: string;
  date: string;
  description: string;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
};

export type WalletState = {
  transactions: Transaction[];
  status: LoadingStates;
  error: string | null;
};

export type User = {
  id: string;
  userName: string;
  bucketID: string;
  createdAt: string;
  updatedAt: string;
};

export type Bucket = {
  id: string;
  name: string;
  bucketID: string;
  nanoid: string;
  listIncomes: Income[];
  collaborators: {
    items: User[];
    nextToken: string | null;
  };
};

export type BucketState = {
  userName: string | null;
  status: LoadingStatus;
  bucket: Bucket | null;
  error: string | null;
  lastFetched: Date | null;
};

export type Category = {
  id: string;
  name: string;
  color: string;
  icon: string;
  percentage: number;
  bucketID: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Income = {
  id: string;
  amount: number;
  date: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BudgetState = {
  incomes: Income[];
  categories: Category[];
  status: LoadingStates;
  error: null | string;
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
