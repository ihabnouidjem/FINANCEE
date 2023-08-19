import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    scrollY: 0,
  },
  reducers: {
    scrollPage: (state, action) => {
      state.scrollY = action.payload;
    },
  },
});

export default pageSlice.reducer;
export const { scrollPage } = pageSlice.actions;
