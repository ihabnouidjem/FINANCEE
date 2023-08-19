import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    loading: true,
    categories: [],
  },
  reducers: {
    setCategories: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
  },
});

export default categoriesSlice.reducer;

export const { setCategories } = categoriesSlice.actions;
