import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type ParamsProps = {
  token: string;
  id: number;
};

export const fetchUserInfo = createAsyncThunk<UserInfoPorops[], ParamsProps>(
  "userInfo/fetchUserInfo",
  async (params) => {
    const { token, id } = params;
    const { data } = await axios.get<UserInfoPorops[]>(
      `https://9854dac21e0f0eee.mokky.dev/userInfo?user_id=${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  }
);

type UserAchivementsProps = {
  achivement_id: number;
  cost: number;
  accepted: boolean;
  rewardType: "coins" | "hints";
};

type UserInfoPorops = {
  id: number,
  user_id: number;
  experience: number;
  achivements: [] | UserAchivementsProps[];
  level: number;
  money: number;
  hintsMoney: number;
  learnedWords: number;
};

interface DictonaryWordsSliceState {
  userInfo: null | UserInfoPorops[];
  status: "loading" | "success" | "error";
}

const initialState: DictonaryWordsSliceState = {
  userInfo: null,
  status: "loading",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUserCoins: (state, action) => {
      if (state.userInfo === null) {
        return;
      }

      state.userInfo[0].money = state.userInfo[0].money + action.payload;
    },
    updateUserHintsMoney: (state, action) => {
      if (state.userInfo === null) {
        return;
      }

      state.userInfo[0].hintsMoney = state.userInfo[0].hintsMoney + action.payload;
    },
    updateUserAchivements: (state, action) => {
      if(state.userInfo === null){
        return;
      }

      const newAchivements = state.userInfo[0].achivements.map((obj) => {
        if (obj.achivement_id === action.payload) {
          return {
            ...obj,
            accepted: true,
          };
        } else {
          return obj;
        }
      });

      state.userInfo[0].achivements = newAchivements;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.status = "loading";
      state.userInfo = null;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.status = "success";
      state.userInfo = action.payload;
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.status = "error";
      state.userInfo = null;
    });
  },
});

export const selectUserInfo = (state: RootState) => state.userInfoSlice;

export const { updateUserCoins, updateUserHintsMoney, updateUserAchivements } = userInfoSlice.actions;

export default userInfoSlice.reducer;
