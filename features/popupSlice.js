import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: { language: false, popups: [] },
  reducers: {
    pushPop: (state, action) => {
      if (action.payload?.type === "language") {
        state.language = true;
      }
      state.popups = [...state.popups, action.payload];
    },
    removePop: (state, action) => {
      if (action.payload.type === "language") {
        state.language = false;
      }
      state.popups = [action.payload.data];
    },
  },
});

export default popupSlice.reducer;
export const { pushPop, removePop } = popupSlice.actions;
