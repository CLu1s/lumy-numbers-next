/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      userName
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userName
        bucketID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBucket = /* GraphQL */ `
  query GetBucket($id: ID!) {
    getBucket(id: $id) {
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
export const listBuckets = /* GraphQL */ `
  query ListBuckets(
    $filter: ModelBucketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBuckets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        nanoid
        collaborators {
          nextToken
        }
        transactionsByDate {
          nextToken
        }
        incomes {
          nextToken
        }
        categories {
          nextToken
        }
        fixedCostCategoryID
        fixedCost {
          nextToken
        }
        projectsCategoryID
        projects {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getIncome = /* GraphQL */ `
  query GetIncome($id: ID!) {
    getIncome(id: $id) {
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
export const listIncomes = /* GraphQL */ `
  query ListIncomes(
    $filter: ModelIncomeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIncomes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
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
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getFixedCost = /* GraphQL */ `
  query GetFixedCost($id: ID!) {
    getFixedCost(id: $id) {
      id
      amount
      type
      status
      description
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const listFixedCosts = /* GraphQL */ `
  query ListFixedCosts(
    $filter: ModelFixedCostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFixedCosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        amount
        type
        status
        description
        bucketID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        movements {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMovement = /* GraphQL */ `
  query GetMovement($id: ID!) {
    getMovement(id: $id) {
      id
      projectID
      amount
      date
      description
      createdAt
      updatedAt
    }
  }
`;
export const listMovements = /* GraphQL */ `
  query ListMovements(
    $filter: ModelMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        projectID
        amount
        date
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByUserName = /* GraphQL */ `
  query UserByUserName(
    $userName: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByUserName(
      userName: $userName
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userName
        bucketID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bucketByName = /* GraphQL */ `
  query BucketByName(
    $name: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBucketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bucketByName(
      name: $name
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        nanoid
        collaborators {
          nextToken
        }
        transactionsByDate {
          nextToken
        }
        incomes {
          nextToken
        }
        categories {
          nextToken
        }
        fixedCostCategoryID
        fixedCost {
          nextToken
        }
        projectsCategoryID
        projects {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const bucketByNanoid = /* GraphQL */ `
  query BucketByNanoid(
    $nanoid: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelBucketFilterInput
    $limit: Int
    $nextToken: String
  ) {
    bucketByNanoid(
      nanoid: $nanoid
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        nanoid
        collaborators {
          nextToken
        }
        transactionsByDate {
          nextToken
        }
        incomes {
          nextToken
        }
        categories {
          nextToken
        }
        fixedCostCategoryID
        fixedCost {
          nextToken
        }
        projectsCategoryID
        projects {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const fixedCostByBucket = /* GraphQL */ `
  query FixedCostByBucket(
    $bucketID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFixedCostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    fixedCostByBucket(
      bucketID: $bucketID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        amount
        type
        status
        description
        bucketID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const projectByName = /* GraphQL */ `
  query ProjectByName(
    $name: String!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    projectByName(
      name: $name
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        movements {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const projectsByBucket = /* GraphQL */ `
  query ProjectsByBucket(
    $bucketID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ProjectsByBucket(
      bucketID: $bucketID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        movements {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const movementsByProject = /* GraphQL */ `
  query MovementsByProject(
    $projectID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMovementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    movementsByProject(
      projectID: $projectID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        projectID
        amount
        date
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
