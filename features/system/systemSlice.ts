import { createSlice } from "@reduxjs/toolkit";
import { SystemState } from "../../types";

const initialState: SystemState = {
  isMenuCollapsed: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setMenuCollapsed: (state, action) => {
      state.isMenuCollapsed = action.payload;
    },
  },
});

export const { setMenuCollapsed } = systemSlice.actions;
export default systemSlice.reducer;
