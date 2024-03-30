import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TagProps } from "../tags/tagsSlice";

export type WordProps = {
  id: number | null,
  user_id: number | null,
  word: string;
  transcription: string;
  tags: TagProps[] | [];
  translates: string[] | [];
  examples: [];
  learnPercent: number;
};

export type EditTagProps = {
  id: number;
  value: string;
};

const initialState: WordProps = {
  id: null,
  user_id: null,
  word: "",
  transcription: "",
  tags: [] ,
  translates: [],
  examples: [],
  learnPercent: 1,
};

export const editWordSlice = createSlice({
  name: "editWord",
  initialState,
  reducers: {
    setEditInformation: (state, action) => {
      state.id = action.payload.id;
      state.user_id = action.payload.user_id;
      state.word = action.payload.word;
      state.transcription = action.payload.transcription;
      state.tags = action.payload.tags;
      state.translates = action.payload.translates;
      state.examples = action.payload.examples;
      state.learnPercent = action.payload.learnPercent;
    },
    setEditId: (state, action) => {
      state.id = action.payload;
    },
    setEditWord: (state, action) => {
      state.word = action.payload;
    },
    setEditTranscriptions: (state, action) => {
      state.transcription = action.payload;
    },
    setEditTags: (state, action) => {
      state.tags = action.payload;
    },
    setEditTranslates: (state, action) => {
      state.translates = action.payload;
    },
    setEditExamples: (state, action) => {
      state.examples = action.payload;
    },
  },
});

export const selectEditWord = (state: RootState) => state.editWordSlice;

export const {
  setEditWord,
  setEditTranscriptions,
  setEditTags,
  setEditTranslates,
  setEditExamples,
  setEditId,
  setEditInformation
} = editWordSlice.actions;

export default editWordSlice.reducer;
