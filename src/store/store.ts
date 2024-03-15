import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";

import userSlice from './user/userSlice';
import themeSlice from './theme/themeSlice';

export const store = configureStore({
  reducer: {
    userSlice,
    themeSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();