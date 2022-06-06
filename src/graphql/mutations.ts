/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      nanoid
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
      transactionsByDate {
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
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      categories {
        items {
          id
          icon
          name
          percentage
          color
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      fixedCostCategoryID
      fixedCost {
        items {
          id
          amount
          type
          status
          description
          dueDay
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      projectsCategoryID
      projects {
        items {
          id
          name
          description
          bucketID
          status
          startDate
          endDate
          amountGoal
          initAmount
          isActive
          createdAt
          updatedAt
        }
        nextToken
      }
      notifications {
        items {
          id
          type
          bucketID
          message
          userName
          date
          createdAt
          updatedAt
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
      nanoid
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
      transactionsByDate {
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
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      categories {
        items {
          id
          icon
          name
          percentage
          color
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      fixedCostCategoryID
      fixedCost {
        items {
          id
          amount
          type
          status
          description
          dueDay
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      projectsCategoryID
      projects {
        items {
          id
          name
          description
          bucketID
          status
          startDate
          endDate
          amountGoal
          initAmount
          isActive
          createdAt
          updatedAt
        }
        nextToken
      }
      notifications {
        items {
          id
          type
          bucketID
          message
          userName
          date
          createdAt
          updatedAt
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
      nanoid
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
      transactionsByDate {
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
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      categories {
        items {
          id
          icon
          name
          percentage
          color
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      fixedCostCategoryID
      fixedCost {
        items {
          id
          amount
          type
          status
          description
          dueDay
          bucketID
          createdAt
          updatedAt
        }
        nextToken
      }
      projectsCategoryID
      projects {
        items {
          id
          name
          description
          bucketID
          status
          startDate
          endDate
          amountGoal
          initAmount
          isActive
          createdAt
          updatedAt
        }
        nextToken
      }
      notifications {
        items {
          id
          type
          bucketID
          message
          userName
          date
          createdAt
          updatedAt
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
      bucketID
      createdAt
      updatedAt
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
      bucketID
      createdAt
      updatedAt
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
      bucketID
      createdAt
      updatedAt
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      id
      icon
      name
      percentage
      color
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      id
      icon
      name
      percentage
      color
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      id
      icon
      name
      percentage
      color
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const createFixedCost = /* GraphQL */ `
  mutation CreateFixedCost(
    $input: CreateFixedCostInput!
    $condition: ModelFixedCostConditionInput
  ) {
    createFixedCost(input: $input, condition: $condition) {
      id
      amount
      type
      status
      description
      dueDay
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const updateFixedCost = /* GraphQL */ `
  mutation UpdateFixedCost(
    $input: UpdateFixedCostInput!
    $condition: ModelFixedCostConditionInput
  ) {
    updateFixedCost(input: $input, condition: $condition) {
      id
      amount
      type
      status
      description
      dueDay
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const deleteFixedCost = /* GraphQL */ `
  mutation DeleteFixedCost(
    $input: DeleteFixedCostInput!
    $condition: ModelFixedCostConditionInput
  ) {
    deleteFixedCost(input: $input, condition: $condition) {
      id
      amount
      type
      status
      description
      dueDay
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      name
      description
      bucketID
      status
      startDate
      endDate
      amountGoal
      initAmount
      movements {
        items {
          id
          projectID
          amount
          date
          description
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      name
      description
      bucketID
      status
      startDate
      endDate
      amountGoal
      initAmount
      movements {
        items {
          id
          projectID
          amount
          date
          description
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      name
      description
      bucketID
      status
      startDate
      endDate
      amountGoal
      initAmount
      movements {
        items {
          id
          projectID
          amount
          date
          description
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      isActive
      createdAt
      updatedAt
    }
  }
`;
export const createMovement = /* GraphQL */ `
  mutation CreateMovement(
    $input: CreateMovementInput!
    $condition: ModelMovementConditionInput
  ) {
    createMovement(input: $input, condition: $condition) {
      id
      projectID
      amount
      date
      description
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateMovement = /* GraphQL */ `
  mutation UpdateMovement(
    $input: UpdateMovementInput!
    $condition: ModelMovementConditionInput
  ) {
    updateMovement(input: $input, condition: $condition) {
      id
      projectID
      amount
      date
      description
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteMovement = /* GraphQL */ `
  mutation DeleteMovement(
    $input: DeleteMovementInput!
    $condition: ModelMovementConditionInput
  ) {
    deleteMovement(input: $input, condition: $condition) {
      id
      projectID
      amount
      date
      description
      type
      createdAt
      updatedAt
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      type
      bucketID
      message
      userName
      date
      createdAt
      updatedAt
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      type
      bucketID
      message
      userName
      date
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      type
      bucketID
      message
      userName
      date
      createdAt
      updatedAt
    }
  }
`;
