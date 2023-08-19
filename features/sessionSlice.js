import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: { session: {} },
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    removeSession: (state) => {
      state.session = {};
    },
  },
});

export default sessionSlice.reducer;

export const { setSession, removeSession } = sessionSlice.actions;
