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
  period: Date;
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
  fixedCostCategoryID: string;
  projectsCategoryID: string;
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
  spent: number;
  progress: number;
};

export type FixedCost = {
  id: string;
  status: string;
  type: string;
  amount: number;
  dueDay: number;
  bucketID: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type FixedCostState = {
  items: FixedCost[];
  category: Category;
  categoryID: string;
  status: LoadingStates;
  error: string | null;
};

export type Project = {
  id: string;
  bucketID: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  amountGoal: number;
  initAmount?: number;
  createdAt?: string;
  updatedAt?: string;
  movements: Movement[];
  loadingState?: LoadingStates;
};

export type Movement = {
  id: string;
  projectID: string;
  amount: number;
  date: string;
  type: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectsState = {
  items: Project[];
  status: LoadingStates;
  categoryID: string;
  error?: string;
};

export enum NotificationTypes {
  TRANSACTION = "gasto",
  PROJECT = "project",
  FIXED_COST = "fixedCost",
  BUDGET = "budget",
}

export type Notification = {
  id: string;
  message: string;
  date: string;
  type: NotificationTypes;
  bucketID: string;
  userName: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NotificationState = {
  items: Notification[];
  status: LoadingStates;
  error?: string;
};

export type DatesHandler = {
  current: Date;
  previous: Date;
  next: Date;
  showNext: boolean;
};
