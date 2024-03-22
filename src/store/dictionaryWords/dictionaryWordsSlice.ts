import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { TagProps } from "../tags/tagsSlice";

type ParamsProps = {
  token: string;
  userId: number;
};

type DictionaryWordsProps = {
  id: number;
  user_id: number;
  word: string;
  transcription: string;
  translate: string[];
  selectTagArr: TagProps[];
  learnPercent: number;
  examples: string[];
};

// type DictonaryWordsDataProps = {
//   dictionaryWords: DictionaryWordsProps[];
// };

export const fetchDictionaryWords = createAsyncThunk<
  DictionaryWordsProps[],
  ParamsProps
>("dictionaryWords/fetchDictionaryWords", async (params) => {
  const { token, userId } = params;
  const { data } = await axios.get<DictionaryWordsProps[]>(
    `https://9854dac21e0f0eee.mokky.dev/dictionary?${
      userId ? `user_id=${userId}` : ""
    }`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return data;
});

interface DictonaryWordsSliceState {
  dictionaryWords: DictionaryWordsProps[] | [];
  status: "loading" | "success" | "error";
}

const initialState: DictonaryWordsSliceState = {
  dictionaryWords: [],
  status: "loading",
};

export const dictionaryWordsSlice = createSlice({
  name: "dictionaryWords",
  initialState,
  reducers: {
    addNewWord: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDictionaryWords.pending, (state) => {
      state.status = "loading";
      state.dictionaryWords = [];
    });
    builder.addCase(fetchDictionaryWords.fulfilled, (state, action) => {
      state.status = "success";
      state.dictionaryWords = action.payload;
    });
    builder.addCase(fetchDictionaryWords.rejected, (state, action) => {
      state.status = "error";
      state.dictionaryWords = [];
    });
  },
});

export const selectDictionaryWords = (state: RootState) => state.dictionaryWordsSlice;

export const { addNewWord } = dictionaryWordsSlice.actions;

export default dictionaryWordsSlice.reducer;
