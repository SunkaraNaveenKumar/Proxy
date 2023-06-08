import React, { useEffect, useState } from "react";
import useAuth from "../custom hooks/useAuth";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "../../store/apis/adminApi";
import loadingIcon from "../../assets/loading.svg";
import {
  useAllCoursesQuery,
  useGetUserAllCoursesQuery,
} from "../../store/apis/userApi";
import { useNavigate } from "react-router-dom";
import { normalToaster } from "../../utils/helpers";
import Toaster from "./Toaster";
import SearchBar from "./SearchBar";
import Logout from "../authentication/Logout";
const Courses = () => {
  const navigate = useNavigate();
  const { role } = useAuth();
  ///////////////////////////////// react states
  ////////////////////////////////// redux apis and slices
  // const getAllCoursesQuery = useGetAllCoursesQuery();
  // const getAllCourses = useAllCoursesQuery();
  const { data: courses, isLoading, error } = useAllCoursesQuery();
  const [
    deleteCourse,
    { isLoading: deleteCourseLoading, data: deleteCourseData },
  ] = useDeleteCourseMutation();
  ///////////////////////////////////
  // console.log("data", courses);

  /////////////////////////////////////useEffects
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (deleteCourseData) {
      if (Object.keys(deleteCourseData)?.length) {
        normalToaster("Course record deleted  successfully");
        window.scrollTo(0, scrollPosition); // Restore scroll position
      }
    }
  }, [deleteCourseData, scrollPosition]);
  //////////////////////////////////////  event handlers
  const handleDeleteCourse = (courseId) => {
    deleteCourse(courseId);
    setScrollPosition(window?.pageYOffset);
  };
  /////////////////////////////
  console.log("courses", courses);
  console.log("error", error);
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Toaster />
      <SearchBar />
      {isLoading || deleteCourseLoading ? (
        <>
          <div className=" flex w-full h-screen justify-center items-center">
            {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
            <img src={loadingIcon} alt="loading"></img>
          </div>
        </>
      ) : (
        <>
          {error?.status == 401 ? (
            <>
              <Logout error={error} />
            </>
          ) : (
            <>
              <div className=" py-10 mt-16 flex flex-row flex-wrap gap-10 justify-center items-center">
                {courses?.map((course) => {
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
                        <p className="text-bold text-red-300 text-xl">
                          {title}
                        </p>
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
                              navigate(`/admin/course/${_id}/lectures`);
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Courses;
