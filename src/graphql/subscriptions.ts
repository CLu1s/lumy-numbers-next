/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
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
export const onUpdateBucket = /* GraphQL */ `
  subscription OnUpdateBucket {
    onUpdateBucket {
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
export const onDeleteBucket = /* GraphQL */ `
  subscription OnDeleteBucket {
    onDeleteBucket {
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
export const onCreateIncome = /* GraphQL */ `
  subscription OnCreateIncome {
    onCreateIncome {
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
export const onUpdateIncome = /* GraphQL */ `
  subscription OnUpdateIncome {
    onUpdateIncome {
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
export const onDeleteIncome = /* GraphQL */ `
  subscription OnDeleteIncome {
    onDeleteIncome {
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
