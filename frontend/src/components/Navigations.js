import React, { useEffect } from "react";
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
import UserContacts from "./users/UserContacts";
import Courses from "./reusable components/Courses";
import AllUsers from "./admin/AllUsers";
import AddLecture from "./admin/AddLecture";
import AddCourse from "./admin/AddCourse";
import Lectures from "./reusable components/Lectures";
import MyCourses from "./reusable components/MyCourses";
import EnrolledCourses from "./admin/EnrolledCourses";
import PublicRoutes from "./reusable components/PublicRoutes";
import AboutUsWhoWeAre from "./reusable components/about us/AboutUsWhoWeAre";
import ContactUs from "./reusable components/ContactUs";
import AboutUsBoardOfDirectors from "./reusable components/about us/AboutUsBoardOfDirectors";
import AboutUsMileStone from "./reusable components/about us/AboutUsMailStone";
import AboutUsPartnerships from "./reusable components/about us/AboutUsPartnerships";

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
  }, [dispatch, isLoggedIn, role]);
  return (
    <div className="mt-16">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/about/who-we-are"
          element={<AboutUsWhoWeAre />}
        ></Route>
        <Route
          path="/about/board-of-directors"
          element={<AboutUsBoardOfDirectors />}
        ></Route>
        <Route
          path="/about/mile-stone"
          element={<AboutUsMileStone />}
        ></Route>
        <Route
          path="/about/partnerships"
          element={<AboutUsPartnerships />}
        ></Route>
        <Route path="/contact" element={<ContactUs />}></Route>
        <Route path="*" element={<Page404 />}></Route>
        {/* public routes */}
        <Route element={<PublicRoutes />}>
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
          <Route path="user/contacts" element={<UserContacts />}></Route>
        </Route>
        {/* private Routes */}
        <Route element={<ProtectedRoutes allowedRoles={["user", "admin"]} />}>
          <Route path="mycourses">
            <Route path="user" element={<MyCourses />}></Route>
            <Route path="admin" element={<MyCourses />}></Route>
          </Route>
          <Route
            path="admin/course/:courseId/lectures"
            element={<Lectures />}
          ></Route>
          <Route
            path="user/course/:courseId/lectures"
            element={<Lectures />}
          ></Route>
          <Route path="user/account" element={<UserAccount />}></Route>
          <Route path="allcourses">
            <Route path="user" element={<Courses />}></Route>
            <Route path="admin" element={<Courses />}></Route>
          </Route>
          <Route path="logout">
            <Route path="user" element={<Logout />}></Route>
            <Route path="admin" element={<Logout />}></Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route path="admin/allusers" element={<AllUsers />}></Route>
          <Route
            path="admin/user/:userId/courses"
            element={<EnrolledCourses />}
          ></Route>
          <Route path="admin/addcourse" element={<AddCourse />}></Route>

          <Route
            path="admin/course/:courseId/lecture"
            element={<AddLecture />}
          ></Route>
        </Route>
      </Routes>

    </div>
  );
};

export default Navigation;
