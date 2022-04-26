import { createSlice } from "@reduxjs/toolkit";

const TopicPhotoSlice = createSlice({
  name: "TopicPhoto",
  initialState: { nameTopic: '', KeyWord: '' },
  reducers: {
    setNameTopic: (state, action) => {
      state.nameTopic = action.payload;
    },
    setKeyWord: (state, action) => {
      state.KeyWord = action.payload;
    },
  },
});
//Actions
export const { setNameTopic, setKeyWord } = TopicPhotoSlice.actions;

//Selectors
export const selectNameTopic = (state) => state?.TopicPhoto.nameTopic;
export const selectKeyWord = (state) => state?.TopicPhoto.KeyWord;

//Reducer
export default TopicPhotoSlice.reducer;
