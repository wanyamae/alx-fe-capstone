import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    quizzes: [
      { id: 1, name: 'React Basics', date: '2025-10-01', score: 85 },
      { id: 2, name: 'Redux Advanced', date: '2025-10-03', score: 92 },
    ],
  },
  reducers: {
    // Add reducers as needed
  },
});

export default userSlice.reducer;
