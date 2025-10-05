import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';



export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}


export interface QuizAttempt {
  id: string;
  title: string;
  score: number;
  date: string;
}

export interface QuizState {
  currentQuiz: Quiz;
  current: number;
  selected: string | null;
  showResult: boolean;
  score: number;
  timer: number;
  answered: { [key: number]: string };
  allQuizzes: Quiz[];
  completedQuizzes: QuizAttempt[];
  attemptedQuizzes: QuizAttempt[];
}

const initialState: QuizState = {
  currentQuiz: {
    id: '',
    title: '',
    questions: [],
  },
  current: 0,
  selected: null,
  showResult: false,
  score: 0,
  timer: 120,
  answered: {},
  allQuizzes: [],
  completedQuizzes: [],
  attemptedQuizzes: [],
};


const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrent(state, action: PayloadAction<number>) {
      state.current = action.payload;
    },
    answerQuestion(state, action: PayloadAction<{ index: number; answer: string }>) {
      state.answered[action.payload.index] = action.payload.answer;
    },
    setCurrentQuiz(state, action: PayloadAction<Quiz>) {
      state.currentQuiz = action.payload;
      state.current = 0;
      state.selected = null;
      state.showResult = false;
      state.score = 0;
      state.timer = 120;
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
    setAllQuizzes(state, action: PayloadAction<Quiz[]>) {
      state.allQuizzes = action.payload;
    },
    addCompletedQuiz(state, action: PayloadAction<{
      id: string;
      title: string;
      score: number;
      date: string;
    }>) {
      state.completedQuizzes.push(action.payload);
    },
    addAttemptedQuiz(state, action: PayloadAction<QuizAttempt>) {
      // Only add if not already attempted (by id and score/date)
      const exists = state.attemptedQuizzes.some(
        (q: QuizAttempt) => q.id === action.payload.id && q.date === action.payload.date
      );
      if (!exists) {
        state.attemptedQuizzes.push(action.payload);
      }
    },
    incrementScore(state) {
      state.score += 1;
    },
  },
});

export const { 
  setCurrentQuiz, 
  selectAnswer, 
  nextQuestion, 
  restartQuiz,
  finishQuiz,
  tick,
  setCurrent,
  setAllQuizzes,
  addCompletedQuiz,
  incrementScore,
  addAttemptedQuiz
} = quizSlice.actions;
export default quizSlice.reducer;
