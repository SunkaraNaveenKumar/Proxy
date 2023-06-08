import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../custom hooks/useAuth";

const Logout = () => {
  console.log("logout");
  const {role}=useAuth()
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    // dispatch(userLogout());
    // dispatch(adminLogout());
    window.location.reload();
  }, [dispatch]);
  return <Navigate to={role === "admin" ?"/admin/login":"/user/login"}></Navigate>;
};

export default Logout;
