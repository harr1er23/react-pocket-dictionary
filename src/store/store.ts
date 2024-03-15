import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";

import userSlice from './user/userSlice';

export const store = configureStore({
  reducer: {
    userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();