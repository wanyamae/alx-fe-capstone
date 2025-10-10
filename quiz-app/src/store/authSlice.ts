import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock user data
type User = {
  username: string;
};

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Mock async login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { username: string; password: string }) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (credentials.username === 'Wanyama' && credentials.password === 'Pio@1896') {
      return { username: credentials.username };
    } else {
      throw new Error('Invalid username or password');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAsGuest: (state) => {
      state.user = { username: 'Guest' };
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});
export const { loginAsGuest } = authSlice.actions;

export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
