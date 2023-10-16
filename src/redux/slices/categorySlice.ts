import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { AxiosResponse } from "axios";
import { CategoryResponseType } from "../../types/category";
import request from "../../server";

interface StateType {
  loading: boolean;
  categories: CategoryResponseType[];
}

const initialState: StateType = {
  loading: false,
  categories: [],
};

export const getCategories = createAsyncThunk("category/fetching", async () => {
  const { data } = await request.get("category");
  return data;
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCategories.fulfilled,
      (state, { payload }: PayloadAction<CategoryResponseType[]>) => {
        state.loading = false;
        state.categories = payload;
      }
    );
    builder.addCase(getCategories.rejected, (state) => {
      state.loading = false;
    });
  },
});
