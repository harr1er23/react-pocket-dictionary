import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
    searchValue: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const selectSearch = (state: RootState) => state.searchSlice;

export const { setSearch } = searchSlice.actions;

export default searchSlice.reducer;
