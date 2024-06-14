import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DictionaryWordProps } from "../dictionaryWords/dictionaryWordsSlice";
import { RootState } from "../store";
import { TagProps } from "../tags/tagsSlice";

export const fetchPresets = createAsyncThunk<
  PresetsProps[],
  Record<string, string>
>("presets/fetchPresets", async (params) => {
  const { token } = params;
  const { data } = await axios.get<PresetsProps[]>(
    "https://9854dac21e0f0eee.mokky.dev/presets",
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return data;
});

export type PresetWordsProps = {
  word: string;
  transcription: string;
  translates: string;
  tags: string[];
}

export type PresetsProps = {
  id: number;
  presetName: string;
  words: PresetWordsProps[];
};

interface PresetsSliceProps {
  presets: [] | PresetsProps[];
  status: "loading" | "error" | "success";
}

const initialState: PresetsSliceProps = {
  presets: [],
  status: "loading",
};

export const presetsSlice = createSlice({
  name: "presets",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPresets.pending, (state) => {
      state.presets = [];
      state.status = "loading";
    });
    builder.addCase(fetchPresets.fulfilled, (state, action) => {
      state.presets = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchPresets.rejected, (state) => {
      state.presets = [];
      state.status = "error";
    });
  },
});

// export const { } = presetsSlice.actions;

export const selectPresets = (state: RootState) => state.presetsSlice;

export default presetsSlice.reducer;
