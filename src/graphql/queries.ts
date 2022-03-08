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
