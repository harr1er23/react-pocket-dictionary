import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import userSlice from "./user/userSlice";
import themeSlice from "./theme/themeSlice";
import tagsSlice from "./tags/tagsSlice";
import dictionaryWordsSlice from "./dictionaryWords/dictionaryWordsSlice";
import userInfoSlice from "./userInfo/userInfoSlice";
import achivementsSlice from "./achivements/achivementsSlice";
import editWordSlice from "./editWord/editWordSlice";
import paginationSlice from "./pagination/paginationSlice";
import searchSlice from "./search/searchSlice";
import statisticsDataSlice from "./statisticsData/statisticsDataSlice";
import optionsSlice from "./options/optionsSlice";
import presetsSlice from "./presets/presetsSlice";

export const store = configureStore({
  reducer: {
    userSlice,
    themeSlice,
    tagsSlice,
    dictionaryWordsSlice,
    userInfoSlice,
    achivementsSlice,
    editWordSlice,
    paginationSlice,
    searchSlice,
    statisticsDataSlice,
    optionsSlice,
    presetsSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
