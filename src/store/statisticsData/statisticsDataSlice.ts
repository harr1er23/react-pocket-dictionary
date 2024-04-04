import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type ParamsProps = {
  userId: number;
  currentDay?: number;
  forDay?: number;
};

export const fetchStatisticsData = createAsyncThunk<
  StatisticsDataProps[],
  ParamsProps
>("statisticsData/fetchStatisticsData", async (params) => {
  const { userId, currentDay, forDay } = params;
  const { data } = await axios.get<StatisticsDataProps[]>(
    `https://9854dac21e0f0eee.mokky.dev/wordsDate?user_id=${userId}${currentDay && forDay && `&data[from]=${forDay}&data[to]=${currentDay}` }`
  );
  return data;
});

export type StatisticsDataProps = {
  id: number;
  user_id: number;
  data: number;
  words: [];
};

interface DictonaryWordsSliceState {
  statisticsData: [] | StatisticsDataProps[];
  status: "loading" | "success" | "error";
}

const initialState: DictonaryWordsSliceState = {
  statisticsData: [],
  status: "loading",
};

export const statisticsDataSlice = createSlice({
  name: "statisticsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStatisticsData.pending, (state) => {
      state.status = "loading";
      state.statisticsData = [];
    });
    builder.addCase(fetchStatisticsData.fulfilled, (state, action) => {
      state.status = "success";
      state.statisticsData = action.payload;
    });
    builder.addCase(fetchStatisticsData.rejected, (state, action) => {
      state.status = "error";
      state.statisticsData = [];
    });
  },
});

export const selectStatisticsData = (state: RootState) =>
  state.statisticsDataSlice;

export default statisticsDataSlice.reducer;
