import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type ParamsProps = {
  userId: number;
  tag: string;
};

export const fetchTags = createAsyncThunk<TagProps[], ParamsProps>(
  "tags/fetchTags",
  async (params) => {
    const { userId, tag } = params;
    const { data } = await axios.get<TagProps[]>(
      `https://9854dac21e0f0eee.mokky.dev/tags?user_id=${userId}${
        tag ? `&value=*${tag}*` : ""
      }`
    );
    return data;
  }
);

export type TagProps = {
  user_id: number;
  id: number;
  value: string;
};

interface DictonaryWordsSliceState {
  tags: TagProps[] | [];
  status: "loading" | "success" | "error";
}

const initialState: DictonaryWordsSliceState = {
  tags: [],
  status: "success",
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addNewUserTag: (state, action) => {
      const findTag = state.tags.find((obj) => obj.id === action.payload.id);

      if(findTag){
        return;
      }

      state.tags = [
        ...state.tags,
        {
          id: action.payload.id,
          user_id: action.payload.user_id,
          value: action.payload.value,
        }
      ];
    },
    removeUserTag: (state, action) => {
      const newUserTagsArr = state.tags.filter(
        (obj) => obj.id !== action.payload
      );
      if (!newUserTagsArr) {
        return;
      }

      state.tags = newUserTagsArr;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTags.pending, (state) => {
      state.status = "loading";
      state.tags = [];
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.status = "success";
      state.tags = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.status = "error";
      state.tags = [];
    });
  },
});

export const selectTags = (state: RootState) => state.tagsSlice;

export const { addNewUserTag, removeUserTag } = tagsSlice.actions;

export default tagsSlice.reducer;
