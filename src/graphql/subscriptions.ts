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
