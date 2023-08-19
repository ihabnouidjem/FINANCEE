const { createSlice } = require("@reduxjs/toolkit");

const projectSlice = createSlice({
  name: "project",
  initialState: { project: {} },
  reducers: {
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});

export default projectSlice.reducer;

export const { setProject } = projectSlice.actions;
