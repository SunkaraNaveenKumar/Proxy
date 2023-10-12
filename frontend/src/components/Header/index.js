import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../custom hooks/useAuth";
import { useSelector } from "react-redux";
import navushhIcon from "../../assets/navushh.svg";
import { AboutUs } from "../reusable components/AboutUs";

const Header = () => {
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  // const adminLoggedIn  = useSelector((state) => state.admin.isLoggedIn);

  const { role } = useAuth();
  console.log("header");
  return (
    <div className="fixed z-10 w-full top-0 left-0 bg-gradient-to-b from-blue-600 to-rose-100">
      <div className=" w-full flex flex-row font-bold justify-between items-center px-10 h-16">
        <div className="">
          <img
            className="h-14 rounded-xl"
            src={navushhIcon}
            alt="navushh"
          ></img>
        </div>
        <div className="flex flex-row gap-x-10 items-center ">
          <Link
            className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg"
            to="/"
          >
            HOME
          </Link>
          {/* <div>
            <Link to="/user/contacts">Contacts</Link>
          </div> */}
          {/* <div>
          <Link to="/user/resetpassword/hebfwhfbewjf">Link</Link>
        </div> */}
          {adminLoggedIn && (
            <>
              <Link
                className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg"
                to="/admin/allusers"
              >
                USERS
              </Link>
            </>
          )}

          {!userLoggedIn && !adminLoggedIn && (
            <>
              <div>
                <Link to="/user/login" className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg">LOGIN</Link>
              </div>
              <div>
                <Link to="/user/register" className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg">REGISTER</Link>
              </div>
              <div>
                <Link to="/admin/login" className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg">ADMIN</Link>
              </div>
              <AboutUs />
              <div>
                <Link
                  to="/contact"
                  className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg"
                >
                  CONTACT US
                </Link>
              </div>
            </>
          )}

          {(userLoggedIn || adminLoggedIn) && (
            <>
              {/* <div>
                <Link to={`/courses/${role}`}>Courses</Link>
              </div> */}
              <AboutUs />
              <div>
                <Link
                  to="/contact"
                  className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg"
                >
                  CONTACT US
                </Link>
              </div>
              <div className="relative group">
                <Link className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg">
                  COURSES
                </Link>
                <div className="w-52 absolute hidden group-hover:block text-white rounded-md">
                  <div className="h-5 bg-transparent"></div>

                  <div className="bg-gray-700 rounded-b-xl">
                    <Link
                      className="flex hover:bg-gray-600 py-2 px-4"
                      to={`/allcourses/${role}`}
                    >
                      All Courses
                    </Link>
                    {role === "admin" && (
                      <>
                        <Link
                          className="flex hover:bg-gray-600 py-2 px-4"
                          to={`/mycourses/${role}`}
                        >
                          My Courses
                        </Link>
                        <Link
                          className="flex hover:bg-gray-600 py-2 px-4 rounded-b-xl"
                          to="admin/addcourse"
                        >
                          Add Course
                        </Link>
                      </>
                    )}
                    {role === "user" && (
                      <>
                        <Link
                          className="flex hover:bg-gray-600 py-2 px-4 rounded-b-xl"
                          to={`/mycourses/${role}`}
                        >
                          My Courses
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="relative group">
                <Link className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg">
                  PROFILE
                </Link>
                <div className="w-52 absolute hidden group-hover:block text-white right-0">
                  <div className="bg-transparent h-5"></div>
                  <div className="bg-gray-700 rounded-b-xl">
                    <Link
                      className="flex hover:bg-gray-600 py-2 px-4"
                      to={`/${role}/account`}
                    >
                      Account
                    </Link>
                    <Link
                      className="flex  hover:bg-gray-600 py-2 px-4 rounded-b-xl"
                      to={`/logout/${role}`}
                    >
                      Logout
                    </Link>
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
