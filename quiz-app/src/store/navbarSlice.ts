import { createSlice } from '@reduxjs/toolkit';

const navbarSlice = createSlice({
    name: 'navbar',
    initialState: { open: false },
    reducers: {
        toggleNavbar: state => { state.open = !state.open; },
        closeNavbar: state => {  state.open = false; },
        openNavbar: state => { state.open = true; },
    },
});

export const { toggleNavbar, closeNavbar, openNavbar } = navbarSlice.actions;
export default navbarSlice.reducer;