import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../custom hooks/useAuth";
import { useSelector } from "react-redux";
import navushhIcon from "../../assets/navushh.svg";
const Header = () => {
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  // const adminLoggedIn  = useSelector((state) => state.admin.isLoggedIn);

  const { role } = useAuth();
  console.log("header");
  return (
    <div className="fixed w-full top-0 left-0">
      <div className=" w-full flex flex-row  justify-between items-center bg-red-200 px-10 h-16">
        <div className="">
          <img
            className="h-16 rounded-lg"
            src={navushhIcon}
            alt="navushh"
          ></img>
        </div>
        <div className="flex flex-row gap-x-10 items-center ">
          <div>
            <Link to="/">Home</Link>
          </div>
          {/* <div>
            <Link to="/user/contacts">Contacts</Link>
          </div> */}
          {/* <div>
          <Link to="/user/resetpassword/hebfwhfbewjf">Link</Link>
        </div> */}
          {adminLoggedIn && (
            <>
              <div>
                <Link to="/admin/allusers">Users</Link>
              </div>
              <div>
                <Link to="admin/addcourse">Add Course</Link>
              </div>
            </>
          )}

          {!userLoggedIn && !adminLoggedIn && (
            <>
              <div>
                <Link to="/user/login">Login</Link>
              </div>
              <div>
                <Link to="/user/register">register</Link>
              </div>
              <div>
                <Link to="/admin/login">Admin</Link>
              </div>
            </>
          )}
          {userLoggedIn && (
            <>
              <div>
                <Link to="/user/mycourses">My Courses</Link>
              </div>
            </>
          )}
          {(userLoggedIn || adminLoggedIn) && (
            <>
              <div>
                <Link to={`/${role}/account`}>Account</Link>
              </div>
              {/* <div>
                <Link to={`/courses/${role}`}>Courses</Link>
              </div> */}
              <div>
                <Link to={`/logout/${role}`}>logout</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
