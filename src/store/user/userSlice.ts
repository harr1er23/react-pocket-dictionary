import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type UserProps = {
  token: string,
  data: {
    id: number,
    fullName: string,
    email: string
  }
}

interface UserSliceState{
  user: null | UserProps
}

const initialState: UserSliceState = {
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const selectUser = (state: RootState) => state.userSlice;

export const { setUser} = userSlice.actions;

export default userSlice.reducer;
