import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type ParamsProps = {
    token: string;
    userId: number;
}

export const fetchTags = createAsyncThunk<TagProps[], ParamsProps>(
  "tags/fetchTags",
  async (params) => {
    const {
      token,
      userId
    } = params;
    const { data } = await axios.get<TagProps[]>(
      `https://9854dac21e0f0eee.mokky.dev/tags?${userId ? `user_id${userId}` : ""}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  }
);

export type TagProps = {
    user_id: number;
    id: number;
    value: string;
}

interface DictonaryWordsSliceState {
  tags: TagProps[] | [];
  status: "loading" | "success" | "error";
}

const initialState: DictonaryWordsSliceState = {
  tags: [],
  status: "loading",
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    addNewTag: (state, action) => {

    }
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

export const selectAllDrafts = (state: RootState) => state.tagsSlice;

export const { addNewTag } = tagsSlice.actions;

export default tagsSlice.reducer;
