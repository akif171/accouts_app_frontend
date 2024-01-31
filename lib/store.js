import { configureStore } from "@reduxjs/toolkit";
import incomeSheetReducer from "../lib/features/income-sheet/incomeSheetSlice";

export const store = configureStore({
    reducer: {
      incomeSheet: incomeSheetReducer,
    },
  });

