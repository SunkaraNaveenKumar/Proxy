import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../apis/userApi";

const initialState = {
  userLoginInfo: {
    loginUserEmail: "",
    loginUserPassword: "",
    loginError: "",
  },
  userRegisterInfo: {
    registerUserName: "",
    registerUserEmail: "",
    registerUserPassword: "",
    registerError: "",
  },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserLogin(state, { payload }) {
      state.isLoggedIn = payload;
    },
    setLoginUserEmail(state, { payload }) {
      state.userLoginInfo.loginUserEmail = payload;
    },
    setLoginUserPassword(state, { payload }) {
      state.userLoginInfo.loginUserPassword = payload;
    },
    setRegisterUserName(state, { payload }) {
      state.userRegisterInfo.registerUserName = payload;
    },
    setRegisterUserEmail(state, { payload }) {
      state.userRegisterInfo.registerUserEmail = payload;
    },
    setRegisterUserPassword(state, { payload }) {
      state.userRegisterInfo.registerUserPassword = payload;
    },
    userLogout: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.login.matchFulfilled,
      (state, action) => {
        if (action.payload.errors) {
          state.userLoginInfo.loginError = action.payload.errors;
        } else {
          const { token } = action.payload;
          localStorage.setItem("token", token);
          state.userLoginInfo.loginUserEmail = "";
          state.userLoginInfo.loginUserPassword = "";
          state.userLoginInfo.loginError = "";
          state.isLoggedIn = true;
        }
      }
    );
    builder.addMatcher(
      userApi.endpoints.addUser.matchFulfilled,
      (state, { payload }) => {
        // console.log("payload",payload);
        if (payload.errors) {
          state.userRegisterInfo.registerError = payload.errors;
        } else {
          state.userRegisterInfo = { ...initialState.userRegisterInfo };
        }
      }
    );
  },
});
export const {
  setUserLogin,
  setLoginUserEmail,
  setLoginUserPassword,
  setRegisterUserName,
  setRegisterUserEmail,
  setRegisterUserPassword,
  userLogout,
} = userSlice.actions;
export default userSlice.reducer;
