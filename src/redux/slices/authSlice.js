import { createSlice } from "@reduxjs/toolkit";

const getSavedUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const savedToken = localStorage.getItem("accessToken") || null;
const savedUser = getSavedUser();

const initialState = {
  user: savedUser,
  accessToken: savedToken,
  loading: false,
  isAuthLoading: false,
  isAuthenticated: !!savedToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      try {
        if (action.payload) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("user");
        }
      } catch (e) {
        console.warn("Could not save user to localStorage", e);
      }
    },

    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      if (action.payload) {
        localStorage.setItem("accessToken", action.payload);
      } else {
        localStorage.removeItem("accessToken");
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("lovopet_vet_token");
    },
  },
});

export const {
  setUser,
  clearUser,
  setAccessToken,
  setAuthLoading,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
