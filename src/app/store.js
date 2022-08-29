import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import activityReducer from "../features/activity/activitySlice";
import itemsReducer from "../features/items/itemSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    activity: activityReducer,
    items: itemsReducer,
  },
});
