import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WordProps } from "../editWord/editWordSlice";
import { RootState } from "../store";
import { TagProps } from "../tags/tagsSlice";

type ParamsProps = {
  token: string;
  userId: number;
  pagination: number;
  search?: string;
};

export type DictionaryWordProps = {
  id: number;
  user_id: number;
  word: string;
  transcription: string;
  translates: string[];
  tags: TagProps[];
  learnPercent: number;
  examples: string[];
};

export type DictionaryWordsProps = {
  meta: {
    total_items: 5;
    total_pages: 3;
    current_page: 1;
    per_page: 2;
    remaining_count: 3;
  };
  items: DictionaryWordProps[];
};

// type DictonaryWordsDataProps = {
//   dictionaryWords: DictionaryWordsProps[];
// };

export const fetchDictionaryWords = createAsyncThunk<
  DictionaryWordsProps,
  ParamsProps
>("dictionaryWords/fetchDictionaryWords", async (params) => {
  const { token, userId, pagination, search } = params;
  const { data } = await axios.get<DictionaryWordsProps>(
    `https://9854dac21e0f0eee.mokky.dev/dictionary?${
      userId ? `user_id=${userId}` : ""
    }${pagination ? `&page=${pagination}&limit=20` : ""}${
      search ? `&word=*${search}*` : ""
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
  dictionaryWords: DictionaryWordProps[] | [];
  total_items: number;
  total_pages: number;
  current_page: number;
  status: "loading" | "success" | "error";
}

const initialState: DictonaryWordsSliceState = {
  dictionaryWords: [],
  total_items: 1,
  total_pages: 1,
  current_page: 1,
  status: "loading",
};

export const dictionaryWordsSlice = createSlice({
  name: "dictionaryWords",
  initialState,
  reducers: {
    addNewWord: (state, action) => {
      state.dictionaryWords = [
        ...state.dictionaryWords,
        {
          id: action.payload.id,
          user_id: action.payload.user_id,
          word: action.payload.word,
          transcription: action.payload.transcription,
          translates: action.payload.translates,
          tags: action.payload.tags,
          learnPercent: action.payload.learnPercent,
          examples: action.payload.examples,
        },
      ];
    },
    deleteWord: (state, action) => {
      const findWord = state.dictionaryWords.filter(
        (obj) => obj.id !== action.payload
      );

      state.dictionaryWords = findWord;
    },
    updateWord: (state, action) => {
      const { id, word, transcription, translates, tags, learnPercent } =
        action.payload;

      state.dictionaryWords = state.dictionaryWords.map((wordObj) => {
        if (wordObj.id !== id) {
          return wordObj;
        }

        return {
          ...wordObj,
          word,
          transcription,
          translates,
          tags,
          learnPercent,
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDictionaryWords.pending, (state) => {
      state.status = "loading";
      state.dictionaryWords = [];
    });
    builder.addCase(fetchDictionaryWords.fulfilled, (state, action) => {
      state.status = "success";
      state.dictionaryWords = action.payload.items;
      state.current_page = action.payload.meta.current_page;
      state.total_items = action.payload.meta.total_items;
      state.total_pages = action.payload.meta.total_pages;
    });
    builder.addCase(fetchDictionaryWords.rejected, (state, action) => {
      state.status = "error";
      state.dictionaryWords = [];
    });
  },
});

export const selectDictionaryWords = (state: RootState) =>
  state.dictionaryWordsSlice;

export const { addNewWord, deleteWord, updateWord } =
  dictionaryWordsSlice.actions;

export default dictionaryWordsSlice.reducer;
