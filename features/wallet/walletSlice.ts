import { createSlice, PayloadAction,createAsyncThunk  } from "@reduxjs/toolkit";
import { API, graphqlOperation } from 'aws-amplify';  
import { createTransaction } from "../../src/graphql/mutations";
import { WalletState } from "../../types";
const initialState: WalletState = {
  transactions: [
    {
      id: "1",
      amount: 5000,
      categoryID: "1",
      date: "2020-01-01",
      description: "Salary",
    },
    {
      id: "2",
      amount: 3300,
      categoryID: "2",
      date: "2020-01-02",
      description: "Rent",
    },
    {
      id: "3",
      amount: 1200,
      categoryID: "3",
      date: "2020-01-03",
      description: "Food",
    },
  ],
};

const exampleThunkFunction = (dispatch, getState) => {
  const stateBefore = getState()
  console.log(`Counter before: ${stateBefore.counter}`)
  dispatch(addTransaction({
    amount: '5000',
    categoryID: "1",
    description: "zooo",
  },))
  const stateAfter = getState()
  console.log(`Counter after: ${stateAfter.counter}`)
}

export const fetchPosts = createAsyncThunk('wallet/fetchPokemon', async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const json = await response.json();
  return json.name;
})

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    addTransaction: (
      state,
      action: PayloadAction<{
        amount: string;
        description: string;
        categoryID: string;
      }>
    ) => {
      const { amount, description, categoryID } = action.payload;
      state.transactions.push({
        id: (Math.random() * 1000).toString(),
        amount: parseFloat(amount) ,
        description,
        categoryID: categoryID,
        date: new Date().toISOString(),
      });
    },
  },
});

export const { addTransaction } = walletSlice.actions;
export default walletSlice.reducer;
