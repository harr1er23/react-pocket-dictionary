import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WordProps } from "../editWord/editWordSlice";
import { RootState } from "../store";
import { TagProps } from "../tags/tagsSlice";

type ParamsProps = {
  userId: number;
  pagination: number;
  limit?: number;
  search?: string;
  wordsPercent?: string;
  firstShow?: string;
  day?: number;
  tags?: TagProps[];
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
  currentData: number;
  hearing: number;
  correctSpelling: number;
  correctRecognition: number;
  rememberPercent: number;
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
  const {
    userId,
    pagination,
    search,
    limit,
    wordsPercent,
    firstShow,
    day,
    tags,
  } = params;

  let tagsQuery = "";

  if (tags && tags.length > 0) {
    tagsQuery = tags.map((obj) => `&tags.id[]=${obj.id}`).join("");
  }

  // Формирование базового URL
  let url = `https://9854dac21e0f0eee.mokky.dev/dictionary?`;

  // Добавление параметра user_id, если он есть
  if (userId) {
    url += `user_id=${userId}`;
  }

  // Добавление параметров пагинации
  if (pagination) {
    url += `&page=${pagination}&limit=${limit ? limit : 20}`;
  }

  // Добавление параметра поиска
  if (search) {
    url += `&word=*${search}*`;
  }

  // Добавление параметров процента изучения слов
  if (wordsPercent) {
    if (wordsPercent === "unlearned") {
      url += `&learnPercent=1`;
    } else {
      let fromPercent, toPercent;
      if (wordsPercent === "averageLearned") {
        fromPercent = "3";
        toPercent = "50";
      } else if (wordsPercent === "almostLearned") {
        fromPercent = "51";
        toPercent = "99";
      }
      url += `&learnPercent[from]=${fromPercent}&learnPercent[to]=${toPercent}`;
    }
  }

  // Добавление параметров первого показа
  if (firstShow) {
    if (firstShow === "addedLong") {
      url += `&currentData[to]=${day}`;
    } else if (firstShow === "addedRecently") {
      url += `&currentData[from]=${day}`;
    } else if (firstShow === "averageLearned") {
      url += `&sortBy=learnPercent`;
    } else if (firstShow === "almostLearned") {
      url += `&sortBy=-learnPercent`;
    }
  }

  // Добавление параметров тегов (если есть)
  url += tagsQuery;

  // Отправка запроса
  const { data } = await axios.get<DictionaryWordsProps>(url);
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
    deleteWord: (state, action) => {
      const findWord = state.dictionaryWords.filter(
        (obj) => obj.id !== action.payload
      );

      state.dictionaryWords = findWord;
    },
    updateWord: (state, action) => {
      const {
        id,
        word,
        transcription,
        translates,
        tags,
        learnPercent,
        hearing,
        correctSpelling,
        correctRecognition,
        rememberPercent,
        currentData
      } = action.payload;

      state.dictionaryWords = state.dictionaryWords.map((wordObj) => {
        if (wordObj.id !== id) {
          return wordObj;
        }

        return {
          ...wordObj,
          currentData,
          word,
          transcription,
          translates,
          tags,
          learnPercent,
          hearing,
          correctSpelling,
          correctRecognition,
          rememberPercent,
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

export const { deleteWord, updateWord } = dictionaryWordsSlice.actions;

export default dictionaryWordsSlice.reducer;
