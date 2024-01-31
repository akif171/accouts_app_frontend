import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  revenues: [],
  expenses: [],
};

const incomeSheet = createSlice({
  name: "income-sheet",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.revenues = action.payload.revenues;
      state.expenses = action.payload.expenses;
    },
  },
});

export const { setData } = incomeSheet.actions;

export default incomeSheet.reducer;
