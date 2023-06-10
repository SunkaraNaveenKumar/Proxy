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
          <Link className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg" to="/">Home</Link>
          {/* <div>
            <Link to="/user/contacts">Contacts</Link>
          </div> */}
          {/* <div>
          <Link to="/user/resetpassword/hebfwhfbewjf">Link</Link>
        </div> */}
          {adminLoggedIn && (
            <>
              <Link className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg" to="/admin/allusers">Users</Link>
              <div className="relative group">
                <Link className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg">Courses</Link>
                <div className="w-52 absolute hidden group-hover:block text-white rounded-md">
                  <div className="h-3 bg-transparent"></div>
                  <div className="bg-gray-700">
                    <Link className="flex  hover:bg-gray-600 py-2 px-4" to={`/mycourses/${role}`}>My Courses</Link>
                    <Link className="flex  hover:bg-gray-600 py-2 px-4" to="admin/addcourse">Add Course</Link>
                  </div>

                </div>
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
                <Link to={`/mycourses/${role}`}>My Courses</Link>
              </div>
            </>
          )}
          {(userLoggedIn || adminLoggedIn) && (
            <>

              {/* <div>
                <Link to={`/courses/${role}`}>Courses</Link>
              </div> */}
              <div className="relative group">
                <Link className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg">Profile</Link>
                <div className="w-52 absolute  hidden group-hover:block text-white right-0">
                  <div className="bg-transparent h-3"></div>
                  <div className="bg-gray-700">
                    <Link className="flex hover:bg-gray-600 py-2 px-4" to={`/${role}/account`}>Account</Link>
                    <Link className="flex  hover:bg-gray-600 py-2 px-4" to={`/logout/${role}`}>logout</Link>
                  </div>
                </div>
              </div>


            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
