import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: { dark: false },
  reducers: {
    toggleDark: state => { state.dark = !state.dark; },
    setDark: (state, action) => { state.dark = action.payload; },
  },
});

export const { toggleDark, setDark } = themeSlice.actions;
export default themeSlice.reducer;