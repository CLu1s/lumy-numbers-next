/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      userName
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      userName
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      userName
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const createBucket = /* GraphQL */ `
  mutation CreateBucket(
    $input: CreateBucketInput!
    $condition: ModelBucketConditionInput
  ) {
    createBucket(input: $input, condition: $condition) {
      id
      name
      collaborators {
        items {
          id
          userName
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      ordersByDate {
        items {
          id
          bucketID
          amount
          categoryID
          categoryName
          categoryColor
          date
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      incomes {
        items {
          id
          amount
          date
          description
          createdAt
          updatedAt
          bucketIncomesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateBucket = /* GraphQL */ `
  mutation UpdateBucket(
    $input: UpdateBucketInput!
    $condition: ModelBucketConditionInput
  ) {
    updateBucket(input: $input, condition: $condition) {
      id
      name
      collaborators {
        items {
          id
          userName
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      ordersByDate {
        items {
          id
          bucketID
          amount
          categoryID
          categoryName
          categoryColor
          date
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      incomes {
        items {
          id
          amount
          date
          description
          createdAt
          updatedAt
          bucketIncomesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteBucket = /* GraphQL */ `
  mutation DeleteBucket(
    $input: DeleteBucketInput!
    $condition: ModelBucketConditionInput
  ) {
    deleteBucket(input: $input, condition: $condition) {
      id
      name
      collaborators {
        items {
          id
          userName
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      ordersByDate {
        items {
          id
          bucketID
          amount
          categoryID
          categoryName
          categoryColor
          date
          description
          createdAt
          updatedAt
        }
        nextToken
      }
      incomes {
        items {
          id
          amount
          date
          description
          createdAt
          updatedAt
          bucketIncomesId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createIncome = /* GraphQL */ `
  mutation CreateIncome(
    $input: CreateIncomeInput!
    $condition: ModelIncomeConditionInput
  ) {
    createIncome(input: $input, condition: $condition) {
      id
      amount
      date
      description
      createdAt
      updatedAt
      bucketIncomesId
    }
  }
`;
export const updateIncome = /* GraphQL */ `
  mutation UpdateIncome(
    $input: UpdateIncomeInput!
    $condition: ModelIncomeConditionInput
  ) {
    updateIncome(input: $input, condition: $condition) {
      id
      amount
      date
      description
      createdAt
      updatedAt
      bucketIncomesId
    }
  }
`;
export const deleteIncome = /* GraphQL */ `
  mutation DeleteIncome(
    $input: DeleteIncomeInput!
    $condition: ModelIncomeConditionInput
  ) {
    deleteIncome(input: $input, condition: $condition) {
      id
      amount
      date
      description
      createdAt
      updatedAt
      bucketIncomesId
    }
  }
`;
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
      bucketID
      amount
      categoryID
      categoryName
      categoryColor
      date
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
      id
      bucketID
      amount
      categoryID
      categoryName
      categoryColor
      date
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
      id
      bucketID
      amount
      categoryID
      categoryName
      categoryColor
      date
      description
      createdAt
      updatedAt
    }
  }
`;
