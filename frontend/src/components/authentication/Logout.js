import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLogout } from "../../store/slices/userSlice";
import { adminLogout } from "../../store/slices/adminSlice";

const Logout = () => {
  console.log("logout");
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(userLogout());
    dispatch(adminLogout());
  }, [dispatch]);
  return <Navigate to="/user/login"></Navigate>;
};

export default Logout;
