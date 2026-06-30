import { createSlice } from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from '../../App/store';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  registeredAt: string;
}

interface AuthState {
  user: UserInfo | null;
}

const initialState: AuthState = {
  user: (() => {
    const data = localStorage.getItem('pixema_current_user');
    if (!data) return null;
    try {
      return JSON.parse(data) as UserInfo;
    } catch {
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      localStorage.setItem('pixema_current_user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('pixema_current_user');
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;