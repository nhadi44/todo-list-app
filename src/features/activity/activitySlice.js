import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  activity: [],
  loading: false,
  title: "",
  body: {
    title: "New Activity",
    email: "hadi@mail.com",
    _comment:
      "email digunakan untuk membedakan list data yang digunakan antar aplikasi",
  },
};

export const getActivity = createAsyncThunk(
  "activity/getActivity",
  async () => {
    const response = await axios({
      method: "GET",
      url: "https://todo.api.devcode.gethired.id/activity-groups?email=hadi@mail.com",
    });
    return response.data;
  }
);

export const addActivity = createAsyncThunk(
  "activity/addActivity",
  async () => {
    const response = await axios({
      method: "POST",
      url: "https://todo.api.devcode.gethired.id/activity-groups",
      data: initialState.body,
    })
      .then((res) => {})
      .catch((err) => {});
    return response.data;
  }
);

export const getActivityById = createAsyncThunk(
  "activity/getActivityById",
  async (id) => {
    const response = await axios({
      method: "GET",
      url: `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
    });
    return response.data;
  }
);

export const updateActivity = createAsyncThunk(
  "activity/updateActivity",
  async (id, body) => {
    const response = await axios({
      method: "PATCH",
      url: `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
      data: body,
    });
    return response.data;
  }
);

export const deleteActivity = createAsyncThunk(
  "activity/deleteActivity",
  async (id) => {
    await axios({
      method: "DELETE",
      url: `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
    });
    // return response.data;
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivity.fulfilled, (state, action) => {
        state.activity = action.payload.data;
        state.loading = false;
      });
    builder
      .addCase(addActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(addActivity.fulfilled, (state, action) => {
        state.activity = action.payload.data;
        state.loading = false;
      });
    builder
      .addCase(getActivityById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivityById.fulfilled, (state, action) => {
        state.title = action.payload.title;
        state.loading = false;
      });
    builder
      .addCase(updateActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.title = action.payload.title;
        state.loading = false;
      });
  },
});

// export const { action here } = activitySlice.actions;
export const selectActivity = (state) => state.activity.activity;
export const isLoading = (state) => state.activity.loading;
export const selectTitle = (state) => state.activity.title;

export default activitySlice.reducer;
