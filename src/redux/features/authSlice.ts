import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  mfaRequired: boolean;
  /** Partial login email — kept only while MFA step is pending */
  pendingEmail: string | null;
}

const getInitial = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      mfaRequired: false,
      pendingEmail: null,
    };
  }
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return {
    accessToken,
    refreshToken,
    isAuthenticated: !!accessToken,
    mfaRequired: false,
    pendingEmail: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitial(),
  reducers: {
    setTokens(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>,
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.mfaRequired = false;
      state.pendingEmail = null;
      if (typeof window !== "undefined") {
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    },
    setMfaRequired(state, action: PayloadAction<string>) {
      state.mfaRequired = true;
      state.pendingEmail = action.payload;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.mfaRequired = false;
      state.pendingEmail = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },
  },
});

export const { setTokens, setMfaRequired, logout } = authSlice.actions;
export default authSlice.reducer;
