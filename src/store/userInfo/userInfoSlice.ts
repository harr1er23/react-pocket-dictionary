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

type MultipliersProps = {
  name: string;
  percent: number;
  type: number;
  cost: number;
}

type HintsProps = {
  hintName: string;
  value: number;
  type: number;
  cost: number;
}

type UserInfoPorops = {
  id: number,
  user_id: number;
  experience: number;
  achivements: [] | UserAchivementsProps[];
  level: number;
  money: number;
  hintsMoney: number;
  learnedWords: number;
  tagsAdded: number;
  wordsAdded: number;
  hints: HintsProps[];
  multipliers: MultipliersProps[];
  daysStreak: number;
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
    addUserCoins: (state, action) => {
      if (state.userInfo === null) {
        return;
      }

      state.userInfo[0].money = state.userInfo[0].money + action.payload;
    },
    reduceUserCoins: (state, action) => {
      if (state.userInfo === null) {
        return;
      }

      state.userInfo[0].money = state.userInfo[0].money - action.payload;
    },
    addUserLevel: (state, action) => {
      if (state.userInfo === null) {
        return;
      }

      state.userInfo[0].level = state.userInfo[0].level + action.payload;
    },
    addUserHintsCoins: (state, action) => {
      if (state.userInfo === null) {
        return;
      }

      state.userInfo[0].hintsMoney = state.userInfo[0].hintsMoney + action.payload;
    },
    reduceUserHintsCoins: (state, action) => {
      if (state.userInfo === null) {
        return;
      }

      state.userInfo[0].hintsMoney = state.userInfo[0].hintsMoney - action.payload;
    },
    addUserAchivements: (state, action) => {
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
    },
    updateMultipliers: (state, action) => {
      if (state.userInfo === null) {
        return;
      }

      state.userInfo[0].multipliers = action.payload;
    },
    updateHints: (state, action) => {
      if (state.userInfo === null) {
        return;
      }

      state.userInfo[0].hints = action.payload;
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

export const { addUserCoins, reduceUserCoins, addUserLevel, addUserHintsCoins, reduceUserHintsCoins, addUserAchivements, updateMultipliers, updateHints } = userInfoSlice.actions;

export default userInfoSlice.reducer;
