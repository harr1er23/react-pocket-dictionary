import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export const fetchAchivements = createAsyncThunk<
  AchivementsProps[],
  Record<string, string>
>("achivements/fetchAchivements", async (params) => {
  const { token } = params;
  const { data } = await axios.get<AchivementsProps[]>(
    `https://9854dac21e0f0eee.mokky.dev/achivements`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return data;
});

export type AchivementsProps = {
  achivement_id: number;
  name: string;
  value: number;
  text: string;
  imgUrl: string;
  cost: number;
  type: "addWord" | "addTag" | "learnWord"
  rewardType: "coins" | "hints";
};

interface DictonaryWordsSliceState {
  achivements: [] | AchivementsProps[];
  status: "loading" | "success" | "error";
}

const initialState: DictonaryWordsSliceState = {
  achivements: [],
  status: "loading",
};

export const achivementsSlice = createSlice({
  name: "achivements",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAchivements.pending, (state) => {
      state.status = "loading";
      state.achivements = [];
    });
    builder.addCase(fetchAchivements.fulfilled, (state, action) => {
      state.status = "success";
      state.achivements = action.payload;
    });
    builder.addCase(fetchAchivements.rejected, (state, action) => {
      state.status = "error";
      state.achivements = [];
    });
  },
});

export const selectAchivements = (state: RootState) => state.achivementsSlice;

export default achivementsSlice.reducer;
