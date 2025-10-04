import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface QuizState {
  currentQuiz: {
    title: string;
    questions: QuizQuestion[];
  };
  current: number;
  selected: string | null;
  showResult: boolean;
  score: number;
  timer: number;
}

const initialState: QuizState = {
  currentQuiz: {
    title: 'Sample Quiz',
    questions: [],
  },
  current: 0,
  selected: null,
  showResult: false,
  score: 0,
  timer: 60,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuiz(state, action: PayloadAction<{ title: string; questions: QuizQuestion[] }>) {
      state.currentQuiz = action.payload;
      state.current = 0;
      state.selected = null;
      state.showResult = false;
      state.score = 0;
      state.timer = 60;
    },
    selectAnswer(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
    nextQuestion(state) {
      if (state.selected === state.currentQuiz.questions[state.current].answer) {
        state.score += 1;
      }
      state.selected = null;
      if (state.current < state.currentQuiz.questions.length - 1) {
        state.current += 1;
      } else {
        state.showResult = true;
      }
    },
    restartQuiz(state) {
      state.current = 0;
      state.selected = null;
      state.showResult = false;
      state.score = 0;
      state.timer = 60;
    },
    finishQuiz(state) {
      state.showResult = true;
    },
    tick(state) {
      if (state.timer > 0) {
        state.timer -= 1;
      }
    },
  },
});

export const { setCurrentQuiz, selectAnswer, nextQuestion, restartQuiz, finishQuiz, tick } = quizSlice.actions;
export default quizSlice.reducer;
