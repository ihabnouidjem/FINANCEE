import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    projects: [],
    transactions: [],
    status: "",
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload.profile;
      state.projects = action.payload.projects;
      state.transactions = action.payload.transactions;
      state.status = action.payload.status;
    },
  },
});

export default profileSlice.reducer;
export const { setProfile } = profileSlice.actions;
