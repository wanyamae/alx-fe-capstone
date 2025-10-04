

import { configureStore } from '@reduxjs/toolkit';
import navbarReducer from './navbarSlice';
import themeReducer from './themeSlice';
import pageReducer from './pageSlice';
import userReducer from './userSlice';
import quizReducer from './quizSlice';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    theme: themeReducer,
    page: pageReducer,
    user: userReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;