/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      userName
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      userName
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      userName
      bucketID
      createdAt
      updatedAt
    }
  }
`;
export const onCreateBucket = /* GraphQL */ `
  subscription OnCreateBucket {
    onCreateBucket {
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
          includeInitialMonth
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
export const onUpdateBucket = /* GraphQL */ `
  subscription OnUpdateBucket {
    onUpdateBucket {
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
          includeInitialMonth
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
export const onDeleteBucket = /* GraphQL */ `
  subscription OnDeleteBucket {
    onDeleteBucket {
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
          includeInitialMonth
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
export const onCreateIncome = /* GraphQL */ `
  subscription OnCreateIncome {
    onCreateIncome {
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
export const onUpdateIncome = /* GraphQL */ `
  subscription OnUpdateIncome {
    onUpdateIncome {
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
export const onDeleteIncome = /* GraphQL */ `
  subscription OnDeleteIncome {
    onDeleteIncome {
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction {
    onCreateTransaction {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction {
    onUpdateTransaction {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction {
    onDeleteTransaction {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateFixedCost = /* GraphQL */ `
  subscription OnCreateFixedCost {
    onCreateFixedCost {
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
export const onUpdateFixedCost = /* GraphQL */ `
  subscription OnUpdateFixedCost {
    onUpdateFixedCost {
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
export const onDeleteFixedCost = /* GraphQL */ `
  subscription OnDeleteFixedCost {
    onDeleteFixedCost {
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
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
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
      includeInitialMonth
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
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
      includeInitialMonth
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
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
      includeInitialMonth
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMovement = /* GraphQL */ `
  subscription OnCreateMovement {
    onCreateMovement {
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
export const onUpdateMovement = /* GraphQL */ `
  subscription OnUpdateMovement {
    onUpdateMovement {
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
export const onDeleteMovement = /* GraphQL */ `
  subscription OnDeleteMovement {
    onDeleteMovement {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
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
