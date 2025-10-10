

import { configureStore } from '@reduxjs/toolkit';

import navbarReducer from './navbarSlice';
import themeReducer from './themeSlice';
import pageReducer from './pageSlice';
import userReducer from './userSlice';
import quizReducer from './quizSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    theme: themeReducer,
    page: pageReducer,
    user: userReducer,
    quiz: quizReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;