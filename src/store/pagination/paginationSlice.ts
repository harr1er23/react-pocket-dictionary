import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  paginationValue: 1,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.paginationValue = action.payload;
    },
  },
});

export const selectPagination = (state: RootState) => state.paginationSlice;

export const { setPagination } = paginationSlice.actions;

export default paginationSlice.reducer;
