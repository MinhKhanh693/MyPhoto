import { configureStore } from "@reduxjs/toolkit";
import TopicPhotoSlice from "../features/TopicPhoto/TopicPhotoSlice";

export const store = configureStore({
  reducer: {
    TopicPhoto: TopicPhotoSlice,
  },
});
