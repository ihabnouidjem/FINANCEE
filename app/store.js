import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "@/features/languageSlice";
import sessionReducer from "@/features/sessionSlice";
import popupReducer from "@/features/popupSlice";
import pageReducer from "@/features/pageSlice";
import profileReducer from "@/features/profileSlice";
import categoriesReducer from "@/features/categoriesSlice";
import projectReducer from "@/features/projectSlice";

const store = configureStore({
  reducer: {
    language: languageReducer,
    session: sessionReducer,
    popup: popupReducer,
    page: pageReducer,
    profile: profileReducer,
    categories: categoriesReducer,
    project: projectReducer,
  },
});

export default store;
