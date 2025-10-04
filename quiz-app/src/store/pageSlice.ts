import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
  name: 'page',
  initialState: { name: 'Dashboard' },
  reducers: {
    setPage: (state, action) => { state.name = action.payload; },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
