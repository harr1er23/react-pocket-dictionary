import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type ParamsProps = {
  userId: number;
};

export const fetchOptions = createAsyncThunk<OptionsProps[], ParamsProps>(
  "options/fetchOptions",
  async (params) => {
    const { userId } = params;
    const { data } = await axios.get<OptionsProps[]>(
      `https://9854dac21e0f0eee.mokky.dev/settings?user_id=${userId}`
    );
    return data;
  }
);

export type OptionsProps = {
  id: number;
  user_id: number;
  appOptions: SettingsProps;
  exercisesOptions: ExercisesProps;
};

export type SettingsProps = {
  showTransciption: boolean;
  nativeLanguage: "English" | "Russian";
  learnedLanguage: "English" | "Russian";
  voiceActing:
    | "Google US English"
    | "Google UK English Female"
    | "Google UK English Male";
  automaticallySwitchExercise: boolean;
};

export type ExercisesProps = {
  maxWords: 0 | 10 | 20 | 30 | 40 | 50 | 100;
  wordsPercent:
    | { type: "unlearned"; name: "Unlearned" }
    | { type: "averageLearned"; name: "Average Learned" }
    | { type: "almostLearned"; name: "Almost Learned" };
  firstShow:
    | { type: "random"; name: "Random" }
    | {
        type: "addedLong";
        name: "Added long ago";
      }
    | {
        type: "addedRecently";
        name: "Recently Added";
      }
    | {
        type: "averageLearned";
        name: "Average Learned";
      }
    | {
        type: "almostLearned";
        name: "Almost Learned";
      };
};

interface OptionsSliceState {
  id: number | null;
  user_id: number | null;
  appOptions: null | SettingsProps;
  exercisesOptions: null | ExercisesProps;
  status: "loading" | "success" | "error";
}

const initialState: OptionsSliceState = {
  id: null,
  user_id: null,
  appOptions: null,
  exercisesOptions: null,
  status: "loading",
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    changeAppSwitchLevelMode: (state) => {
      if (state.appOptions === null) {
        return;
      }
      state.appOptions.automaticallySwitchExercise =
        !state.appOptions.automaticallySwitchExercise;
    },
    changeAppShowTranscription: (state) => {
      if (state.appOptions === null) {
        return;
      }
      state.appOptions.showTransciption = !state.appOptions.showTransciption;
    },
    changeVoiceName: (state, action) => {
      if (state.appOptions === null) {
        return;
      }
      state.appOptions.voiceActing = action.payload;
    },
    changeLearnedLanguage: (state, action) => {
      if (state.appOptions === null) {
        return;
      }
      state.appOptions.learnedLanguage = action.payload;
    },
    changeNativeLanguage: (state, action) => {
      if (state.appOptions === null) {
        return;
      }
      state.appOptions.nativeLanguage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOptions.pending, (state) => {
      state.status = "loading";
      state.appOptions = null;
      state.exercisesOptions = null;
      state.id = null;
      state.user_id = null;
    });
    builder.addCase(fetchOptions.fulfilled, (state, action) => {
      state.status = "success";
      state.id = action.payload[0].id;
      state.user_id = action.payload[0].user_id;
      state.appOptions = action.payload[0].appOptions;
      state.exercisesOptions = action.payload[0].exercisesOptions;
    });
    builder.addCase(fetchOptions.rejected, (state, action) => {
      state.status = "error";
      state.appOptions = null;
      state.exercisesOptions = null;
      state.id = null;
      state.user_id = null;
    });
  },
});

export const selectOptions = (state: RootState) => state.optionsSlice;

export const {
  changeAppSwitchLevelMode,
  changeAppShowTranscription,
  changeVoiceName,
  changeLearnedLanguage,
  changeNativeLanguage,
} = optionsSlice.actions;

export default optionsSlice.reducer;
