import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
    isShrinkView: true,
    isDarkMode: true,
  }
  
  export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setIsShrinkView: (state, action) => {
        state.isShrinkView = action.payload;
      },
      setIsDarkMode: (state) => {
        state.isDarkMode = !state.isDarkMode
      }
    },
  })

  export const selectTheme = (state: RootState) => state.themeSlice;
  
  export const { setIsShrinkView, setIsDarkMode} = themeSlice.actions
  
  export default themeSlice.reducer