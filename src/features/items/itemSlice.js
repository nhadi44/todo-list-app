import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
};

export const getItems = createAsyncThunk("items/getItems", async (id) => {
  const response = await axios({
    method: "GET",
    url: `https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`,
  });
  return response.data;
});

export const addItem = createAsyncThunk("items/addItem", async (body) => {
  const response = await axios({
    method: "POST",
    url: "https://todo.api.devcode.gethired.id/todo-items",
    data: body,
  });

  return response.data;
});

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.loading = false;
      });
    builder
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.loading = false;
      });
  },
});

export const selectItems = (state) => state.items.items;
export const isLoading = (state) => state.items.loading;

export default itemSlice.reducer;
