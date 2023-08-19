import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "language",
  initialState: { language: "francais" },
  reducers: {
    changeLng: (state, action) => {
      state.language = action.payload;
    },
  },
});

export default languageSlice.reducer;

export const { changeLng } = languageSlice.actions;
