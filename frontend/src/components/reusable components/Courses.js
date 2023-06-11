import loadingIcon from "../../assets/loading.svg";
import { useAllCoursesQuery } from "../../store/apis/userApi";
import SearchBar from "./SearchBar";
import CourseList from "./CourseList";
import ErrorHandling from "../HOC/ErrorHandling";
import { useState } from "react";
import { filterCoursesFunc } from "../../utils/helpers";
const Courses = () => {
  ///////////////////////////////// react states
  const [searchText, setSearchText] = useState("");
  ////////////////////////////////// redux apis and slices
  const { data: courses, isLoading } = useAllCoursesQuery();
  ///////////////////////////////////
  console.log("data", courses);
  /////////////////////////////////////useEffects
  /////////////////////////////////////helpers

  //////////////////////////////////////  event handlers
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };
  /////////////////////////////
  // console.log("courses", courses);
  // console.log("error", error);
  return (
    <div className="flex mt-20 flex-col justify-center items-center gap-2">
      <SearchBar searchText={searchText} handleSearch={handleSearch} />
      {isLoading ? (
        <>
          <div className=" flex w-full h-screen justify-center items-center">
            <img src={loadingIcon} alt="loading"></img>
          </div>
        </>
      ) : (
        <>
          <CourseList courses={filterCoursesFunc(courses, searchText)} />
          {/* {error?.status === 401 ? (
            <>
              <Logout error={error} />
            </>
          ) : (
            <>
              <CourseList courses={courses} />
            </>
          )} */}
        </>
      )}
    </div>
  );
};

export default ErrorHandling(Courses);
