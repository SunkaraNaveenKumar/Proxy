import React, { useEffect } from "react";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Page404 from "./reusable components/Page404";
import Home from "./reusable components/Home";
import ProtectedRoutes from "./reusable components/ProtectedRoutes";
import UserAccount from "./users/UserAccount.js";
import Logout from "./authentication/Logout";
import useAuth from "./custom hooks/useAuth";
import { useDispatch } from "react-redux";
import { setUserLogin } from "../store/slices/userSlice";
import { setAdminLogin } from "../store/slices/adminSlice";
import ForgetPassword from "./authentication/ForgetPassword";
import ChangePassword from "./authentication/ChangePassword";

const Navigation = () => {
  const dispatch = useDispatch();
  console.log("navigation");
  const { role, isLoggedIn } = useAuth();
  useEffect(() => {
    if (isLoggedIn) {
      if (role === "admin") {
        dispatch(setAdminLogin(isLoggedIn));
      } else if (role === "user") {
        dispatch(setUserLogin(isLoggedIn));
      }
    }
  }, []);
  return (
    <div>
      <Header />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />}></Route>
        <Route path="user">
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="forgot-password" element={<ForgetPassword />}></Route>
          <Route
            path="resetpassword/:token"
            element={<ChangePassword />}
          ></Route>
        </Route>
        <Route path="admin/login" element={<Login />}></Route>
        <Route path="*" element={<Page404 />}></Route>
        {/* private Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["user", "admin"]} />}>
          <Route path="user/account" element={<UserAccount />}></Route>
        </Route>
        <Route element={<ProtectedRoutes allowedRoles={["user", "admin"]} />}>
          <Route path="logout">
            <Route path="user" element={<Logout />}></Route>
            <Route path="admin" element={<Logout />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Navigation;
