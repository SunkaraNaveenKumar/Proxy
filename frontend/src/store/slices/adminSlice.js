import { createSlice } from "@reduxjs/toolkit";
import { adminApi } from "../apis/adminApi";
const initialState = {
  adminLoginError: "",
  adminEmail: "",
  adminPassword: "",
  isLoggedIn: false,
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminLogin(state, { payload }) {
      state.isLoggedIn = payload;
    },
    setAdminEmail(state, { payload }) {
      state.adminEmail = payload;
    },
    setAdminPassword(state, { payload }) {
      state.adminPassword = payload;
    },
    adminLogout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      adminApi.endpoints.adminLogin.matchFulfilled,
      (state, { payload }) => {
        if (payload.errors) {
          state.adminLoginError = payload.errors;
        } else {
          const { token } = payload;
          state.isLoggedIn = true;
          state.adminEmail = "";
          state.adminPassword = "";
          state.adminLoginError = "";
          localStorage.setItem("token", token);
        }
      }
    );
  },
});
export const { setAdminEmail, setAdminPassword, setAdminLogin, adminLogout } =
  adminSlice.actions;
export default adminSlice.reducer;
