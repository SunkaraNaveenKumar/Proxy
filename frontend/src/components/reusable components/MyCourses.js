import React, { useEffect, useState } from "react";
import useAuth from "../custom hooks/useAuth";
import {
  useDeleteCourseMutation,
  useGetAdminCoursesQuery,
} from "../../store/apis/adminApi";
import loadingIcon from "../../assets/loading.svg";
import { useNavigate } from "react-router-dom";
import { filterCoursesFunc, normalToaster } from "../../utils/helpers";
// import Logout from "../authentication/Logout";
import Toaster from "./Toaster";
import SearchBar from "./SearchBar";
import { useGetUserMyCoursesQuery } from "../../store/apis/userApi";
const MyCourses = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  //////////////////////////////// rtk query
  const getAdminCourses = useGetAdminCoursesQuery();
  const getUserCourses = useGetUserMyCoursesQuery();

  const getMyCourses = role === "admin" ? getAdminCourses : getUserCourses;
  const {
    data: myCourses,
    // error: myCoursesError,
    isLoading: getMyCoursesLoading,
  } = getMyCourses;
  console.log("mycourses", myCourses);
  const [
    deleteCourse,
    { isLoading: deleteCourseLoading, data: deleteCourseData },
  ] = useDeleteCourseMutation();
  //////////////////////////////// stated
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchText, setSearchText] = useState("");
  const filteredCourses = filterCoursesFunc(myCourses, searchText);
  //////////////////////////////// useEffect

  useEffect(() => {
    if (deleteCourseData) {
      if (Object.keys(deleteCourseData)?.length) {
        normalToaster("Course record deleted  successfully");
        window.scrollTo(0, scrollPosition); // Restore scroll position
      }
    }
  }, [deleteCourseData, scrollPosition]);
  //////////////////////////////// event handlers
  const handleDeleteCourse = (courseId) => {
    deleteCourse(courseId);
    setScrollPosition(window?.pageYOffset);
  };
  //////////////////////////////// rtk query
  // console.log(role, myCourses);
  console.log("mycourses", myCourses);
  if (getMyCoursesLoading || deleteCourseLoading) {
    return (
      <div className=" flex w-full h-screen justify-center items-center">
        {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Toaster />
      <SearchBar
        searchText={searchText}
        handleSearch={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {/* {
        myCoursesError?.status === 401 ? (
          <>
            <Logout error={myCoursesError} />
          </>
        ) : (
          <> */}
      {myCourses.length > 0 ? (
        <>
          {filteredCourses.length > 0 ? (
            <div className=" py-10 flex flex-row flex-wrap gap-10 justify-center items-center">
              {filteredCourses?.map((course) => {
                const { title, description, price, imageUrl, _id } = course;
                return (
                  <div
                    key={_id}
                    className="w-80 bg-white flex flex-col gap-1 shadow-lg border border-black border-solid rounded-lg overflow-hidden"
                  >
                    <img
                      src={imageUrl}
                      alt={imageUrl}
                      className=" w-full h-48"
                    ></img>
                    <div className="p-2 flex flex-col gap-y-2">
                      <p className="text-bold text-red-300 text-xl">{title}</p>
                      <p className="text-base text-bold">{description}</p>
                      <p className="text-xl text-bold text-blue-400">
                        Price:{price}/RS
                      </p>
                      <div className="flex flex-row justify-center items-center w-full flex-wrap gap-2">
                        {role === "admin" && (
                          <>
                            <button className="shawdow-lg self-stretch w-20 rounded-lg bg-red-300 border border-black border-solid">
                              Enroll
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteCourse(_id);
                              }}
                              className="shawdow-lg self-stretch w-20 rounded-lg bg-red-300 border border-black border-solid"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => {
                                navigate(`/admin/course/${_id}/lecture`);
                              }}
                              className="shawdow-lg self-stretch w-20 rounded-lg bg-red-300 border border-black border-solid"
                            >
                              add lecture
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => {
                            navigate(`/${role}/course/${_id}/lectures`);
                          }}
                          className="shawdow-lg self-stretch w-20 rounded-lg bg-blue-300 border border-black border-solid"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex w-full h-screen justify-center items-center">
              <p className="bg-red-100 p-5 rounded-lg shadow-lg text-base font-bold">
                No Search Result found please Type some other course name
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex w-full h-screen justify-center items-center">
          <p className="bg-red-100 p-5 rounded-lg shadow-lg text-base font-bold">
            yet no courses are added to you , please contact admin to add course
          </p>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
