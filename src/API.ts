/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  userName: string,
  bucketID: string,
};

export type ModelUserConditionInput = {
  userName?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  userName: string,
  bucketID: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  userName?: string | null,
  bucketID?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateBucketInput = {
  id?: string | null,
  name: string,
  nanoid: string,
  fixedCostCategoryID?: string | null,
  projectsCategoryID?: string | null,
};

export type ModelBucketConditionInput = {
  name?: ModelStringInput | null,
  nanoid?: ModelStringInput | null,
  fixedCostCategoryID?: ModelIDInput | null,
  projectsCategoryID?: ModelIDInput | null,
  and?: Array< ModelBucketConditionInput | null > | null,
  or?: Array< ModelBucketConditionInput | null > | null,
  not?: ModelBucketConditionInput | null,
};

export type Bucket = {
  __typename: "Bucket",
  id: string,
  name: string,
  nanoid: string,
  collaborators?: ModelUserConnection | null,
  transactionsByDate?: ModelTransactionConnection | null,
  incomes?: ModelIncomeConnection | null,
  categories?: ModelCategoryConnection | null,
  fixedCostCategoryID?: string | null,
  fixedCost?: ModelFixedCostConnection | null,
  projectsCategoryID?: string | null,
  projects?: ModelProjectConnection | null,
  notifications?: ModelNotificationConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelTransactionConnection = {
  __typename: "ModelTransactionConnection",
  items:  Array<Transaction | null >,
  nextToken?: string | null,
};

export type Transaction = {
  __typename: "Transaction",
  id: string,
  bucketID: string,
  amount: number,
  categoryID?: string | null,
  categoryName?: string | null,
  categoryColor?: string | null,
  date: string,
  description?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelIncomeConnection = {
  __typename: "ModelIncomeConnection",
  items:  Array<Income | null >,
  nextToken?: string | null,
};

export type Income = {
  __typename: "Income",
  id: string,
  amount: number,
  date: string,
  description?: string | null,
  bucketID: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelCategoryConnection = {
  __typename: "ModelCategoryConnection",
  items:  Array<Category | null >,
  nextToken?: string | null,
};

export type Category = {
  __typename: "Category",
  id: string,
  icon: string,
  name: string,
  percentage: number,
  color: string,
  bucketID: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelFixedCostConnection = {
  __typename: "ModelFixedCostConnection",
  items:  Array<FixedCost | null >,
  nextToken?: string | null,
};

export type FixedCost = {
  __typename: "FixedCost",
  id: string,
  amount: number,
  type?: string | null,
  status?: string | null,
  description?: string | null,
  dueDay?: number | null,
  bucketID: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items:  Array<Project | null >,
  nextToken?: string | null,
};

export type Project = {
  __typename: "Project",
  id: string,
  name: string,
  description?: string | null,
  bucketID: string,
  status?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  amountGoal?: number | null,
  initAmount?: number | null,
  movements?: ModelMovementConnection | null,
  isActive?: boolean | null,
  includeInitialMonth?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelMovementConnection = {
  __typename: "ModelMovementConnection",
  items:  Array<Movement | null >,
  nextToken?: string | null,
};

export type Movement = {
  __typename: "Movement",
  id: string,
  projectID: string,
  amount: number,
  date: string,
  description?: string | null,
  type?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export type Notification = {
  __typename: "Notification",
  id: string,
  type: string,
  bucketID: string,
  message: string,
  userName: string,
  date: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateBucketInput = {
  id: string,
  name?: string | null,
  nanoid?: string | null,
  fixedCostCategoryID?: string | null,
  projectsCategoryID?: string | null,
};

export type DeleteBucketInput = {
  id: string,
};

export type CreateIncomeInput = {
  id?: string | null,
  amount: number,
  date: string,
  description?: string | null,
  bucketID: string,
};

export type ModelIncomeConditionInput = {
  amount?: ModelFloatInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  and?: Array< ModelIncomeConditionInput | null > | null,
  or?: Array< ModelIncomeConditionInput | null > | null,
  not?: ModelIncomeConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateIncomeInput = {
  id: string,
  amount?: number | null,
  date?: string | null,
  description?: string | null,
  bucketID?: string | null,
};

export type DeleteIncomeInput = {
  id: string,
};

export type CreateTransactionInput = {
  id?: string | null,
  bucketID: string,
  amount: number,
  categoryID?: string | null,
  categoryName?: string | null,
  categoryColor?: string | null,
  date: string,
  description?: string | null,
};

export type ModelTransactionConditionInput = {
  bucketID?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  categoryID?: ModelStringInput | null,
  categoryName?: ModelStringInput | null,
  categoryColor?: ModelStringInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTransactionConditionInput | null > | null,
  or?: Array< ModelTransactionConditionInput | null > | null,
  not?: ModelTransactionConditionInput | null,
};

export type UpdateTransactionInput = {
  id: string,
  bucketID?: string | null,
  amount?: number | null,
  categoryID?: string | null,
  categoryName?: string | null,
  categoryColor?: string | null,
  date?: string | null,
  description?: string | null,
};

export type DeleteTransactionInput = {
  id: string,
};

export type CreateCategoryInput = {
  id?: string | null,
  icon: string,
  name: string,
  percentage: number,
  color: string,
  bucketID: string,
};

export type ModelCategoryConditionInput = {
  icon?: ModelStringInput | null,
  name?: ModelStringInput | null,
  percentage?: ModelFloatInput | null,
  color?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  icon?: string | null,
  name?: string | null,
  percentage?: number | null,
  color?: string | null,
  bucketID?: string | null,
};

export type DeleteCategoryInput = {
  id: string,
};

export type CreateFixedCostInput = {
  id?: string | null,
  amount: number,
  type?: string | null,
  status?: string | null,
  description?: string | null,
  dueDay?: number | null,
  bucketID: string,
};

export type ModelFixedCostConditionInput = {
  amount?: ModelFloatInput | null,
  type?: ModelStringInput | null,
  status?: ModelStringInput | null,
  description?: ModelStringInput | null,
  dueDay?: ModelIntInput | null,
  bucketID?: ModelIDInput | null,
  and?: Array< ModelFixedCostConditionInput | null > | null,
  or?: Array< ModelFixedCostConditionInput | null > | null,
  not?: ModelFixedCostConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateFixedCostInput = {
  id: string,
  amount?: number | null,
  type?: string | null,
  status?: string | null,
  description?: string | null,
  dueDay?: number | null,
  bucketID?: string | null,
};

export type DeleteFixedCostInput = {
  id: string,
};

export type CreateProjectInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  bucketID: string,
  status?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  amountGoal?: number | null,
  initAmount?: number | null,
  isActive?: boolean | null,
  includeInitialMonth?: boolean | null,
};

export type ModelProjectConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  status?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  amountGoal?: ModelFloatInput | null,
  initAmount?: ModelFloatInput | null,
  isActive?: ModelBooleanInput | null,
  includeInitialMonth?: ModelBooleanInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateProjectInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  bucketID?: string | null,
  status?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  amountGoal?: number | null,
  initAmount?: number | null,
  isActive?: boolean | null,
  includeInitialMonth?: boolean | null,
};

export type DeleteProjectInput = {
  id: string,
};

export type CreateMovementInput = {
  id?: string | null,
  projectID: string,
  amount: number,
  date: string,
  description?: string | null,
  type?: string | null,
};

export type ModelMovementConditionInput = {
  projectID?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelMovementConditionInput | null > | null,
  or?: Array< ModelMovementConditionInput | null > | null,
  not?: ModelMovementConditionInput | null,
};

export type UpdateMovementInput = {
  id: string,
  projectID?: string | null,
  amount?: number | null,
  date?: string | null,
  description?: string | null,
  type?: string | null,
};

export type DeleteMovementInput = {
  id: string,
};

export type CreateNotificationInput = {
  id?: string | null,
  type: string,
  bucketID: string,
  message: string,
  userName: string,
  date: string,
};

export type ModelNotificationConditionInput = {
  type?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  message?: ModelStringInput | null,
  userName?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationInput = {
  id: string,
  type?: string | null,
  bucketID?: string | null,
  message?: string | null,
  userName?: string | null,
  date?: string | null,
};

export type DeleteNotificationInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  userName?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelBucketFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  nanoid?: ModelStringInput | null,
  fixedCostCategoryID?: ModelIDInput | null,
  projectsCategoryID?: ModelIDInput | null,
  and?: Array< ModelBucketFilterInput | null > | null,
  or?: Array< ModelBucketFilterInput | null > | null,
  not?: ModelBucketFilterInput | null,
};

export type ModelBucketConnection = {
  __typename: "ModelBucketConnection",
  items:  Array<Bucket | null >,
  nextToken?: string | null,
};

export type ModelIncomeFilterInput = {
  id?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  and?: Array< ModelIncomeFilterInput | null > | null,
  or?: Array< ModelIncomeFilterInput | null > | null,
  not?: ModelIncomeFilterInput | null,
};

export type ModelTransactionFilterInput = {
  id?: ModelIDInput | null,
  bucketID?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  categoryID?: ModelStringInput | null,
  categoryName?: ModelStringInput | null,
  categoryColor?: ModelStringInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  not?: ModelTransactionFilterInput | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  icon?: ModelStringInput | null,
  name?: ModelStringInput | null,
  percentage?: ModelFloatInput | null,
  color?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelFixedCostFilterInput = {
  id?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  type?: ModelStringInput | null,
  status?: ModelStringInput | null,
  description?: ModelStringInput | null,
  dueDay?: ModelIntInput | null,
  bucketID?: ModelIDInput | null,
  and?: Array< ModelFixedCostFilterInput | null > | null,
  or?: Array< ModelFixedCostFilterInput | null > | null,
  not?: ModelFixedCostFilterInput | null,
};

export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  status?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  amountGoal?: ModelFloatInput | null,
  initAmount?: ModelFloatInput | null,
  isActive?: ModelBooleanInput | null,
  includeInitialMonth?: ModelBooleanInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelMovementFilterInput = {
  id?: ModelIDInput | null,
  projectID?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  date?: ModelStringInput | null,
  description?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelMovementFilterInput | null > | null,
  or?: Array< ModelMovementFilterInput | null > | null,
  not?: ModelMovementFilterInput | null,
};

export type ModelNotificationFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  bucketID?: ModelIDInput | null,
  message?: ModelStringInput | null,
  userName?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateBucketMutationVariables = {
  input: CreateBucketInput,
  condition?: ModelBucketConditionInput | null,
};

export type CreateBucketMutation = {
  createBucket?:  {
    __typename: "Bucket",
    id: string,
    name: string,
    nanoid: string,
    collaborators?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        userName: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    transactionsByDate?:  {
      __typename: "ModelTransactionConnection",
      items:  Array< {
        __typename: "Transaction",
        id: string,
        bucketID: string,
        amount: number,
        categoryID?: string | null,
        categoryName?: string | null,
        categoryColor?: string | null,
        date: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    incomes?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        id: string,
        amount: number,
        date: string,
        description?: string | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        id: string,
        icon: string,
        name: string,
        percentage: number,
        color: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    fixedCostCategoryID?: string | null,
    fixedCost?:  {
      __typename: "ModelFixedCostConnection",
      items:  Array< {
        __typename: "FixedCost",
        id: string,
        amount: number,
        type?: string | null,
        status?: string | null,
        description?: string | null,
        dueDay?: number | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    projectsCategoryID?: string | null,
    projects?:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
        description?: string | null,
        bucketID: string,
        status?: string | null,
        startDate?: string | null,
        endDate?: string | null,
        amountGoal?: number | null,
        initAmount?: number | null,
        isActive?: boolean | null,
        includeInitialMonth?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        type: string,
        bucketID: string,
        message: string,
        userName: string,
        date: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBucketMutationVariables = {
  input: UpdateBucketInput,
  condition?: ModelBucketConditionInput | null,
};

export type UpdateBucketMutation = {
  updateBucket?:  {
    __typename: "Bucket",
    id: string,
    name: string,
    nanoid: string,
    collaborators?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        userName: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    transactionsByDate?:  {
      __typename: "ModelTransactionConnection",
      items:  Array< {
        __typename: "Transaction",
        id: string,
        bucketID: string,
        amount: number,
        categoryID?: string | null,
        categoryName?: string | null,
        categoryColor?: string | null,
        date: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    incomes?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        id: string,
        amount: number,
        date: string,
        description?: string | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        id: string,
        icon: string,
        name: string,
        percentage: number,
        color: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    fixedCostCategoryID?: string | null,
    fixedCost?:  {
      __typename: "ModelFixedCostConnection",
      items:  Array< {
        __typename: "FixedCost",
        id: string,
        amount: number,
        type?: string | null,
        status?: string | null,
        description?: string | null,
        dueDay?: number | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    projectsCategoryID?: string | null,
    projects?:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
        description?: string | null,
        bucketID: string,
        status?: string | null,
        startDate?: string | null,
        endDate?: string | null,
        amountGoal?: number | null,
        initAmount?: number | null,
        isActive?: boolean | null,
        includeInitialMonth?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        type: string,
        bucketID: string,
        message: string,
        userName: string,
        date: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBucketMutationVariables = {
  input: DeleteBucketInput,
  condition?: ModelBucketConditionInput | null,
};

export type DeleteBucketMutation = {
  deleteBucket?:  {
    __typename: "Bucket",
    id: string,
    name: string,
    nanoid: string,
    collaborators?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        userName: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    transactionsByDate?:  {
      __typename: "ModelTransactionConnection",
      items:  Array< {
        __typename: "Transaction",
        id: string,
        bucketID: string,
        amount: number,
        categoryID?: string | null,
        categoryName?: string | null,
        categoryColor?: string | null,
        date: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    incomes?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        id: string,
        amount: number,
        date: string,
        description?: string | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        id: string,
        icon: string,
        name: string,
        percentage: number,
        color: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    fixedCostCategoryID?: string | null,
    fixedCost?:  {
      __typename: "ModelFixedCostConnection",
      items:  Array< {
        __typename: "FixedCost",
        id: string,
        amount: number,
        type?: string | null,
        status?: string | null,
        description?: string | null,
        dueDay?: number | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    projectsCategoryID?: string | null,
    projects?:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
        description?: string | null,
        bucketID: string,
        status?: string | null,
        startDate?: string | null,
        endDate?: string | null,
        amountGoal?: number | null,
        initAmount?: number | null,
        isActive?: boolean | null,
        includeInitialMonth?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        type: string,
        bucketID: string,
        message: string,
        userName: string,
        date: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateIncomeMutationVariables = {
  input: CreateIncomeInput,
  condition?: ModelIncomeConditionInput | null,
};

export type CreateIncomeMutation = {
  createIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    date: string,
    description?: string | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateIncomeMutationVariables = {
  input: UpdateIncomeInput,
  condition?: ModelIncomeConditionInput | null,
};

export type UpdateIncomeMutation = {
  updateIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    date: string,
    description?: string | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteIncomeMutationVariables = {
  input: DeleteIncomeInput,
  condition?: ModelIncomeConditionInput | null,
};

export type DeleteIncomeMutation = {
  deleteIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    date: string,
    description?: string | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTransactionMutationVariables = {
  input: CreateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type CreateTransactionMutation = {
  createTransaction?:  {
    __typename: "Transaction",
    id: string,
    bucketID: string,
    amount: number,
    categoryID?: string | null,
    categoryName?: string | null,
    categoryColor?: string | null,
    date: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  input: UpdateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type UpdateTransactionMutation = {
  updateTransaction?:  {
    __typename: "Transaction",
    id: string,
    bucketID: string,
    amount: number,
    categoryID?: string | null,
    categoryName?: string | null,
    categoryColor?: string | null,
    date: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  input: DeleteTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type DeleteTransactionMutation = {
  deleteTransaction?:  {
    __typename: "Transaction",
    id: string,
    bucketID: string,
    amount: number,
    categoryID?: string | null,
    categoryName?: string | null,
    categoryColor?: string | null,
    date: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory?:  {
    __typename: "Category",
    id: string,
    icon: string,
    name: string,
    percentage: number,
    color: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory?:  {
    __typename: "Category",
    id: string,
    icon: string,
    name: string,
    percentage: number,
    color: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory?:  {
    __typename: "Category",
    id: string,
    icon: string,
    name: string,
    percentage: number,
    color: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateFixedCostMutationVariables = {
  input: CreateFixedCostInput,
  condition?: ModelFixedCostConditionInput | null,
};

export type CreateFixedCostMutation = {
  createFixedCost?:  {
    __typename: "FixedCost",
    id: string,
    amount: number,
    type?: string | null,
    status?: string | null,
    description?: string | null,
    dueDay?: number | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateFixedCostMutationVariables = {
  input: UpdateFixedCostInput,
  condition?: ModelFixedCostConditionInput | null,
};

export type UpdateFixedCostMutation = {
  updateFixedCost?:  {
    __typename: "FixedCost",
    id: string,
    amount: number,
    type?: string | null,
    status?: string | null,
    description?: string | null,
    dueDay?: number | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteFixedCostMutationVariables = {
  input: DeleteFixedCostInput,
  condition?: ModelFixedCostConditionInput | null,
};

export type DeleteFixedCostMutation = {
  deleteFixedCost?:  {
    __typename: "FixedCost",
    id: string,
    amount: number,
    type?: string | null,
    status?: string | null,
    description?: string | null,
    dueDay?: number | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    bucketID: string,
    status?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    amountGoal?: number | null,
    initAmount?: number | null,
    movements?:  {
      __typename: "ModelMovementConnection",
      items:  Array< {
        __typename: "Movement",
        id: string,
        projectID: string,
        amount: number,
        date: string,
        description?: string | null,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    includeInitialMonth?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    bucketID: string,
    status?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    amountGoal?: number | null,
    initAmount?: number | null,
    movements?:  {
      __typename: "ModelMovementConnection",
      items:  Array< {
        __typename: "Movement",
        id: string,
        projectID: string,
        amount: number,
        date: string,
        description?: string | null,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    includeInitialMonth?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    bucketID: string,
    status?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    amountGoal?: number | null,
    initAmount?: number | null,
    movements?:  {
      __typename: "ModelMovementConnection",
      items:  Array< {
        __typename: "Movement",
        id: string,
        projectID: string,
        amount: number,
        date: string,
        description?: string | null,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    includeInitialMonth?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMovementMutationVariables = {
  input: CreateMovementInput,
  condition?: ModelMovementConditionInput | null,
};

export type CreateMovementMutation = {
  createMovement?:  {
    __typename: "Movement",
    id: string,
    projectID: string,
    amount: number,
    date: string,
    description?: string | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMovementMutationVariables = {
  input: UpdateMovementInput,
  condition?: ModelMovementConditionInput | null,
};

export type UpdateMovementMutation = {
  updateMovement?:  {
    __typename: "Movement",
    id: string,
    projectID: string,
    amount: number,
    date: string,
    description?: string | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMovementMutationVariables = {
  input: DeleteMovementInput,
  condition?: ModelMovementConditionInput | null,
};

export type DeleteMovementMutation = {
  deleteMovement?:  {
    __typename: "Movement",
    id: string,
    projectID: string,
    amount: number,
    date: string,
    description?: string | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    bucketID: string,
    message: string,
    userName: string,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    bucketID: string,
    message: string,
    userName: string,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    bucketID: string,
    message: string,
    userName: string,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      userName: string,
      bucketID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBucketQueryVariables = {
  id: string,
};

export type GetBucketQuery = {
  getBucket?:  {
    __typename: "Bucket",
    id: string,
    name: string,
    nanoid: string,
    collaborators?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        userName: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    transactionsByDate?:  {
      __typename: "ModelTransactionConnection",
      items:  Array< {
        __typename: "Transaction",
        id: string,
        bucketID: string,
        amount: number,
        categoryID?: string | null,
        categoryName?: string | null,
        categoryColor?: string | null,
        date: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    incomes?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        id: string,
        amount: number,
        date: string,
        description?: string | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        id: string,
        icon: string,
        name: string,
        percentage: number,
        color: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    fixedCostCategoryID?: string | null,
    fixedCost?:  {
      __typename: "ModelFixedCostConnection",
      items:  Array< {
        __typename: "FixedCost",
        id: string,
        amount: number,
        type?: string | null,
        status?: string | null,
        description?: string | null,
        dueDay?: number | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    projectsCategoryID?: string | null,
    projects?:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
        description?: string | null,
        bucketID: string,
        status?: string | null,
        startDate?: string | null,
        endDate?: string | null,
        amountGoal?: number | null,
        initAmount?: number | null,
        isActive?: boolean | null,
        includeInitialMonth?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        type: string,
        bucketID: string,
        message: string,
        userName: string,
        date: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBucketsQueryVariables = {
  filter?: ModelBucketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBucketsQuery = {
  listBuckets?:  {
    __typename: "ModelBucketConnection",
    items:  Array< {
      __typename: "Bucket",
      id: string,
      name: string,
      nanoid: string,
      collaborators?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      transactionsByDate?:  {
        __typename: "ModelTransactionConnection",
        nextToken?: string | null,
      } | null,
      incomes?:  {
        __typename: "ModelIncomeConnection",
        nextToken?: string | null,
      } | null,
      categories?:  {
        __typename: "ModelCategoryConnection",
        nextToken?: string | null,
      } | null,
      fixedCostCategoryID?: string | null,
      fixedCost?:  {
        __typename: "ModelFixedCostConnection",
        nextToken?: string | null,
      } | null,
      projectsCategoryID?: string | null,
      projects?:  {
        __typename: "ModelProjectConnection",
        nextToken?: string | null,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetIncomeQueryVariables = {
  id: string,
};

export type GetIncomeQuery = {
  getIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    date: string,
    description?: string | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListIncomesQueryVariables = {
  filter?: ModelIncomeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListIncomesQuery = {
  listIncomes?:  {
    __typename: "ModelIncomeConnection",
    items:  Array< {
      __typename: "Income",
      id: string,
      amount: number,
      date: string,
      description?: string | null,
      bucketID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTransactionQueryVariables = {
  id: string,
};

export type GetTransactionQuery = {
  getTransaction?:  {
    __typename: "Transaction",
    id: string,
    bucketID: string,
    amount: number,
    categoryID?: string | null,
    categoryName?: string | null,
    categoryColor?: string | null,
    date: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTransactionsQueryVariables = {
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTransactionsQuery = {
  listTransactions?:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      id: string,
      bucketID: string,
      amount: number,
      categoryID?: string | null,
      categoryName?: string | null,
      categoryColor?: string | null,
      date: string,
      description?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory?:  {
    __typename: "Category",
    id: string,
    icon: string,
    name: string,
    percentage: number,
    color: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      icon: string,
      name: string,
      percentage: number,
      color: string,
      bucketID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFixedCostQueryVariables = {
  id: string,
};

export type GetFixedCostQuery = {
  getFixedCost?:  {
    __typename: "FixedCost",
    id: string,
    amount: number,
    type?: string | null,
    status?: string | null,
    description?: string | null,
    dueDay?: number | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListFixedCostsQueryVariables = {
  filter?: ModelFixedCostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFixedCostsQuery = {
  listFixedCosts?:  {
    __typename: "ModelFixedCostConnection",
    items:  Array< {
      __typename: "FixedCost",
      id: string,
      amount: number,
      type?: string | null,
      status?: string | null,
      description?: string | null,
      dueDay?: number | null,
      bucketID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    bucketID: string,
    status?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    amountGoal?: number | null,
    initAmount?: number | null,
    movements?:  {
      __typename: "ModelMovementConnection",
      items:  Array< {
        __typename: "Movement",
        id: string,
        projectID: string,
        amount: number,
        date: string,
        description?: string | null,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    includeInitialMonth?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      description?: string | null,
      bucketID: string,
      status?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      amountGoal?: number | null,
      initAmount?: number | null,
      movements?:  {
        __typename: "ModelMovementConnection",
        nextToken?: string | null,
      } | null,
      isActive?: boolean | null,
      includeInitialMonth?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMovementQueryVariables = {
  id: string,
};

export type GetMovementQuery = {
  getMovement?:  {
    __typename: "Movement",
    id: string,
    projectID: string,
    amount: number,
    date: string,
    description?: string | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMovementsQueryVariables = {
  filter?: ModelMovementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMovementsQuery = {
  listMovements?:  {
    __typename: "ModelMovementConnection",
    items:  Array< {
      __typename: "Movement",
      id: string,
      projectID: string,
      amount: number,
      date: string,
      description?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    bucketID: string,
    message: string,
    userName: string,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      type: string,
      bucketID: string,
      message: string,
      userName: string,
      date: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserByUserNameQueryVariables = {
  userName: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByUserNameQuery = {
  userByUserName?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      userName: string,
      bucketID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BucketByNameQueryVariables = {
  name: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBucketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BucketByNameQuery = {
  bucketByName?:  {
    __typename: "ModelBucketConnection",
    items:  Array< {
      __typename: "Bucket",
      id: string,
      name: string,
      nanoid: string,
      collaborators?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      transactionsByDate?:  {
        __typename: "ModelTransactionConnection",
        nextToken?: string | null,
      } | null,
      incomes?:  {
        __typename: "ModelIncomeConnection",
        nextToken?: string | null,
      } | null,
      categories?:  {
        __typename: "ModelCategoryConnection",
        nextToken?: string | null,
      } | null,
      fixedCostCategoryID?: string | null,
      fixedCost?:  {
        __typename: "ModelFixedCostConnection",
        nextToken?: string | null,
      } | null,
      projectsCategoryID?: string | null,
      projects?:  {
        __typename: "ModelProjectConnection",
        nextToken?: string | null,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type BucketByNanoidQueryVariables = {
  nanoid: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelBucketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type BucketByNanoidQuery = {
  bucketByNanoid?:  {
    __typename: "ModelBucketConnection",
    items:  Array< {
      __typename: "Bucket",
      id: string,
      name: string,
      nanoid: string,
      collaborators?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      transactionsByDate?:  {
        __typename: "ModelTransactionConnection",
        nextToken?: string | null,
      } | null,
      incomes?:  {
        __typename: "ModelIncomeConnection",
        nextToken?: string | null,
      } | null,
      categories?:  {
        __typename: "ModelCategoryConnection",
        nextToken?: string | null,
      } | null,
      fixedCostCategoryID?: string | null,
      fixedCost?:  {
        __typename: "ModelFixedCostConnection",
        nextToken?: string | null,
      } | null,
      projectsCategoryID?: string | null,
      projects?:  {
        __typename: "ModelProjectConnection",
        nextToken?: string | null,
      } | null,
      notifications?:  {
        __typename: "ModelNotificationConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FixedCostByBucketQueryVariables = {
  bucketID: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFixedCostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FixedCostByBucketQuery = {
  fixedCostByBucket?:  {
    __typename: "ModelFixedCostConnection",
    items:  Array< {
      __typename: "FixedCost",
      id: string,
      amount: number,
      type?: string | null,
      status?: string | null,
      description?: string | null,
      dueDay?: number | null,
      bucketID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProjectByNameQueryVariables = {
  name: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProjectByNameQuery = {
  projectByName?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      description?: string | null,
      bucketID: string,
      status?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      amountGoal?: number | null,
      initAmount?: number | null,
      movements?:  {
        __typename: "ModelMovementConnection",
        nextToken?: string | null,
      } | null,
      isActive?: boolean | null,
      includeInitialMonth?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ProjectsByBucketQueryVariables = {
  bucketID: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ProjectsByBucketQuery = {
  ProjectsByBucket?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      description?: string | null,
      bucketID: string,
      status?: string | null,
      startDate?: string | null,
      endDate?: string | null,
      amountGoal?: number | null,
      initAmount?: number | null,
      movements?:  {
        __typename: "ModelMovementConnection",
        nextToken?: string | null,
      } | null,
      isActive?: boolean | null,
      includeInitialMonth?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type MovementsByProjectQueryVariables = {
  projectID: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelMovementFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type MovementsByProjectQuery = {
  movementsByProject?:  {
    __typename: "ModelMovementConnection",
    items:  Array< {
      __typename: "Movement",
      id: string,
      projectID: string,
      amount: number,
      date: string,
      description?: string | null,
      type?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type NotificationsByBucketQueryVariables = {
  bucketID: string,
  id?: ModelIDKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type NotificationsByBucketQuery = {
  notificationsByBucket?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      id: string,
      type: string,
      bucketID: string,
      message: string,
      userName: string,
      date: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    userName: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateBucketSubscription = {
  onCreateBucket?:  {
    __typename: "Bucket",
    id: string,
    name: string,
    nanoid: string,
    collaborators?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        userName: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    transactionsByDate?:  {
      __typename: "ModelTransactionConnection",
      items:  Array< {
        __typename: "Transaction",
        id: string,
        bucketID: string,
        amount: number,
        categoryID?: string | null,
        categoryName?: string | null,
        categoryColor?: string | null,
        date: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    incomes?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        id: string,
        amount: number,
        date: string,
        description?: string | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        id: string,
        icon: string,
        name: string,
        percentage: number,
        color: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    fixedCostCategoryID?: string | null,
    fixedCost?:  {
      __typename: "ModelFixedCostConnection",
      items:  Array< {
        __typename: "FixedCost",
        id: string,
        amount: number,
        type?: string | null,
        status?: string | null,
        description?: string | null,
        dueDay?: number | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    projectsCategoryID?: string | null,
    projects?:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
        description?: string | null,
        bucketID: string,
        status?: string | null,
        startDate?: string | null,
        endDate?: string | null,
        amountGoal?: number | null,
        initAmount?: number | null,
        isActive?: boolean | null,
        includeInitialMonth?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        type: string,
        bucketID: string,
        message: string,
        userName: string,
        date: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBucketSubscription = {
  onUpdateBucket?:  {
    __typename: "Bucket",
    id: string,
    name: string,
    nanoid: string,
    collaborators?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        userName: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    transactionsByDate?:  {
      __typename: "ModelTransactionConnection",
      items:  Array< {
        __typename: "Transaction",
        id: string,
        bucketID: string,
        amount: number,
        categoryID?: string | null,
        categoryName?: string | null,
        categoryColor?: string | null,
        date: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    incomes?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        id: string,
        amount: number,
        date: string,
        description?: string | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        id: string,
        icon: string,
        name: string,
        percentage: number,
        color: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    fixedCostCategoryID?: string | null,
    fixedCost?:  {
      __typename: "ModelFixedCostConnection",
      items:  Array< {
        __typename: "FixedCost",
        id: string,
        amount: number,
        type?: string | null,
        status?: string | null,
        description?: string | null,
        dueDay?: number | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    projectsCategoryID?: string | null,
    projects?:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
        description?: string | null,
        bucketID: string,
        status?: string | null,
        startDate?: string | null,
        endDate?: string | null,
        amountGoal?: number | null,
        initAmount?: number | null,
        isActive?: boolean | null,
        includeInitialMonth?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        type: string,
        bucketID: string,
        message: string,
        userName: string,
        date: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBucketSubscription = {
  onDeleteBucket?:  {
    __typename: "Bucket",
    id: string,
    name: string,
    nanoid: string,
    collaborators?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        userName: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    transactionsByDate?:  {
      __typename: "ModelTransactionConnection",
      items:  Array< {
        __typename: "Transaction",
        id: string,
        bucketID: string,
        amount: number,
        categoryID?: string | null,
        categoryName?: string | null,
        categoryColor?: string | null,
        date: string,
        description?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    incomes?:  {
      __typename: "ModelIncomeConnection",
      items:  Array< {
        __typename: "Income",
        id: string,
        amount: number,
        date: string,
        description?: string | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    categories?:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        id: string,
        icon: string,
        name: string,
        percentage: number,
        color: string,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    fixedCostCategoryID?: string | null,
    fixedCost?:  {
      __typename: "ModelFixedCostConnection",
      items:  Array< {
        __typename: "FixedCost",
        id: string,
        amount: number,
        type?: string | null,
        status?: string | null,
        description?: string | null,
        dueDay?: number | null,
        bucketID: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    projectsCategoryID?: string | null,
    projects?:  {
      __typename: "ModelProjectConnection",
      items:  Array< {
        __typename: "Project",
        id: string,
        name: string,
        description?: string | null,
        bucketID: string,
        status?: string | null,
        startDate?: string | null,
        endDate?: string | null,
        amountGoal?: number | null,
        initAmount?: number | null,
        isActive?: boolean | null,
        includeInitialMonth?: boolean | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    notifications?:  {
      __typename: "ModelNotificationConnection",
      items:  Array< {
        __typename: "Notification",
        id: string,
        type: string,
        bucketID: string,
        message: string,
        userName: string,
        date: string,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateIncomeSubscription = {
  onCreateIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    date: string,
    description?: string | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateIncomeSubscription = {
  onUpdateIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    date: string,
    description?: string | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteIncomeSubscription = {
  onDeleteIncome?:  {
    __typename: "Income",
    id: string,
    amount: number,
    date: string,
    description?: string | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction?:  {
    __typename: "Transaction",
    id: string,
    bucketID: string,
    amount: number,
    categoryID?: string | null,
    categoryName?: string | null,
    categoryColor?: string | null,
    date: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction?:  {
    __typename: "Transaction",
    id: string,
    bucketID: string,
    amount: number,
    categoryID?: string | null,
    categoryName?: string | null,
    categoryColor?: string | null,
    date: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction?:  {
    __typename: "Transaction",
    id: string,
    bucketID: string,
    amount: number,
    categoryID?: string | null,
    categoryName?: string | null,
    categoryColor?: string | null,
    date: string,
    description?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory?:  {
    __typename: "Category",
    id: string,
    icon: string,
    name: string,
    percentage: number,
    color: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory?:  {
    __typename: "Category",
    id: string,
    icon: string,
    name: string,
    percentage: number,
    color: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory?:  {
    __typename: "Category",
    id: string,
    icon: string,
    name: string,
    percentage: number,
    color: string,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateFixedCostSubscription = {
  onCreateFixedCost?:  {
    __typename: "FixedCost",
    id: string,
    amount: number,
    type?: string | null,
    status?: string | null,
    description?: string | null,
    dueDay?: number | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateFixedCostSubscription = {
  onUpdateFixedCost?:  {
    __typename: "FixedCost",
    id: string,
    amount: number,
    type?: string | null,
    status?: string | null,
    description?: string | null,
    dueDay?: number | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteFixedCostSubscription = {
  onDeleteFixedCost?:  {
    __typename: "FixedCost",
    id: string,
    amount: number,
    type?: string | null,
    status?: string | null,
    description?: string | null,
    dueDay?: number | null,
    bucketID: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    bucketID: string,
    status?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    amountGoal?: number | null,
    initAmount?: number | null,
    movements?:  {
      __typename: "ModelMovementConnection",
      items:  Array< {
        __typename: "Movement",
        id: string,
        projectID: string,
        amount: number,
        date: string,
        description?: string | null,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    includeInitialMonth?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    bucketID: string,
    status?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    amountGoal?: number | null,
    initAmount?: number | null,
    movements?:  {
      __typename: "ModelMovementConnection",
      items:  Array< {
        __typename: "Movement",
        id: string,
        projectID: string,
        amount: number,
        date: string,
        description?: string | null,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    includeInitialMonth?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    description?: string | null,
    bucketID: string,
    status?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    amountGoal?: number | null,
    initAmount?: number | null,
    movements?:  {
      __typename: "ModelMovementConnection",
      items:  Array< {
        __typename: "Movement",
        id: string,
        projectID: string,
        amount: number,
        date: string,
        description?: string | null,
        type?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    includeInitialMonth?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMovementSubscription = {
  onCreateMovement?:  {
    __typename: "Movement",
    id: string,
    projectID: string,
    amount: number,
    date: string,
    description?: string | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMovementSubscription = {
  onUpdateMovement?:  {
    __typename: "Movement",
    id: string,
    projectID: string,
    amount: number,
    date: string,
    description?: string | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMovementSubscription = {
  onDeleteMovement?:  {
    __typename: "Movement",
    id: string,
    projectID: string,
    amount: number,
    date: string,
    description?: string | null,
    type?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    bucketID: string,
    message: string,
    userName: string,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    bucketID: string,
    message: string,
    userName: string,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    id: string,
    type: string,
    bucketID: string,
    message: string,
    userName: string,
    date: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
