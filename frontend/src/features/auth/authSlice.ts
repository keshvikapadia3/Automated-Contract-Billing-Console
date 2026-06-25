import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{ username: string; token: string }>
    ) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.token;

      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("token", action.payload.token);
    },

    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.token = null;

      localStorage.removeItem("username");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;