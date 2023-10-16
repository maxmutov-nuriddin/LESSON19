import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { AxiosResponse } from "axios";
import { ProductResponseType } from "../../types/product";
import request from "../../server";

interface StateType {
  loading: boolean;
  product: ProductResponseType[];
}

const initialState: StateType = {
  loading: false,
  product: [],
}

export const getProduct = createAsyncThunk("product/fetching", async (id) => {
  if (id === undefined) {
    return [];
  }

  const { data } = await request.get(`/category/${id}/product`);
  return data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getProduct.fulfilled,
      (state, { payload }: PayloadAction<ProductResponseType[]>) => {
        state.loading = false;
        state.product = payload;
      }
    );
    builder.addCase(getProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});
