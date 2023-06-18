import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserEnrolledCoursesQuery } from "../../store/apis/adminApi";
import loadingIcon from "../../assets/loading.svg";
// import Logout from "../authentication/Logout";
import CourseList from "../reusable components/CourseList";
import SearchBar from "../reusable components/SearchBar";
import { filterCoursesFunc } from "../../utils/helpers";
const EnrolledCourses = () => {

  const { userId } = useParams();
    //////////////////////////////// rtk query

  const {
    data: enrolledCourses,
    isLoading: isEnrolledCoursesLoading,
    // error: enrolledCoursesError,
  } = useGetUserEnrolledCoursesQuery(userId);
  // console.log("enrolledCourses", enrolledCourses);
  //   console.log("enrolledCoursesError", enrolledCoursesError);
  //////////////////////////////// react state
  const [searchText,setSearchText]=useState("")

  return (
    // <>
    //     {enrolledCoursesError?.status === 401 ? (
    //         <>
    //         <Logout/>
    //         </>
    //     ) : (
    //         <>
    <div className="flex flex-col justify-center items-center gap-5 mt-20">
      <SearchBar searchText={searchText} handleSearch={(e)=>{setSearchText(e.target.value)}}/>
      {isEnrolledCoursesLoading ? (
        <div className=" flex w-full h-screen justify-center items-center">
          <img src={loadingIcon} alt="loading"></img>
        </div>
      ) : (
        <CourseList
          courses={filterCoursesFunc(enrolledCourses,searchText)}
          type="enrolledCourses"
          userId={userId}
        />
      )}
    </div>

    //     </>
    // )}
    // </>
  );
};

export default EnrolledCourses;
