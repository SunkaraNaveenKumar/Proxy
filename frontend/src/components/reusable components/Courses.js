import loadingIcon from "../../assets/loading.svg";
import {
  useAllCoursesQuery,
} from "../../store/apis/userApi";
import SearchBar from "./SearchBar";
import CourseList from "./CourseList";
import ErrorHandling from "../HOC/ErrorHandling";
const Courses = () => {

  ///////////////////////////////// react states
  ////////////////////////////////// redux apis and slices
  // const getAllCoursesQuery = useGetAllCoursesQuery();
  // const getAllCourses = useAllCoursesQuery();
  const { data: courses, isLoading } = useAllCoursesQuery();

  ///////////////////////////////////
  // console.log("data", courses);

  /////////////////////////////////////useEffects


  //////////////////////////////////////  event handlers

  /////////////////////////////
  // console.log("courses", courses);
  // console.log("error", error);
  return (
    <div className="flex mt-20 flex-col justify-center items-center gap-2">
      <SearchBar />
      {isLoading ? (
        <>
          <div className=" flex w-full h-screen justify-center items-center">
            <img src={loadingIcon} alt="loading"></img>
          </div>
        </>
      ) : (
        <>
        <CourseList courses={courses} />
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

export default ErrorHandling(Courses) ;
