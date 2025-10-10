import { createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch quizzes for a category
export const fetchQuizzesByCategory = createAsyncThunk(
  'quiz/fetchQuizzesByCategory',
  async (category: { id: number; name: string }, { getState, rejectWithValue }) => {
    // Check cache first
    const state = getState() as { quiz: QuizState };
    const cached = state.quiz.quizCache?.[category.id];
    if (cached && cached.length > 0) {
      return { quizzes: cached, categoryId: category.id };
    }
    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=10&category=${category.id}&type=multiple`);
      if (!res.ok) {
        if (res.status === 429) return rejectWithValue('You are being rate limited by OpenTDB. Please wait and try again.');
        return rejectWithValue('Failed to fetch quizzes.');
      }
      const data = await res.json();
      if (data.response_code !== 0) return rejectWithValue('No quizzes found for this category.');
      const quizzes = [{
        id: 'opentdb-' + category.id,
        title: category.name,
        questions: data.results.map((q: unknown, idx: number) => {
          const questionObj = q as { question: string; correct_answer: string; incorrect_answers: string[] };
          return {
            id: idx,
            question: questionObj.question,
            options: shuffle([questionObj.correct_answer, ...questionObj.incorrect_answers]),
            answer: questionObj.correct_answer,
          };
        }),
      }];
      return { quizzes, categoryId: category.id };
    } catch {
      return rejectWithValue('Network error.');
    }
  }
);

function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
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
  username: string;
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
  quizCache: { [categoryId: string]: Quiz[] };
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
  quizCache: {},
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
      username: string;
    }>) {
      state.completedQuizzes.push(action.payload);
    },
    addAttemptedQuiz(state, action: PayloadAction<QuizAttempt>) {
      // Only add if not already attempted (by id, username, and date)
      const exists = state.attemptedQuizzes.some(
        (q: QuizAttempt) => q.id === action.payload.id && q.username === action.payload.username && q.date === action.payload.date
      );
      if (!exists) {
        state.attemptedQuizzes.push(action.payload);
      }
    },
    incrementScore(state) {
      state.score += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzesByCategory.pending, (state) => {
        state.allQuizzes = [];
      })
      .addCase(fetchQuizzesByCategory.fulfilled, (state, action) => {
        state.allQuizzes = action.payload.quizzes;
        state.quizCache[action.payload.categoryId] = action.payload.quizzes;
      })
      .addCase(fetchQuizzesByCategory.rejected, (state) => {
        state.allQuizzes = [];
        // Optionally, you could add an error field to state and set it here
      });
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
