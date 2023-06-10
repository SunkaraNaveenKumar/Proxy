import loadingIcon from "../../assets/loading.svg";
import {
  useAllCoursesQuery,
} from "../../store/apis/userApi";
import SearchBar from "./SearchBar";
import Logout from "../authentication/Logout";
import CourseList from "./CourseList";
const Courses = () => {

  ///////////////////////////////// react states
  ////////////////////////////////// redux apis and slices
  // const getAllCoursesQuery = useGetAllCoursesQuery();
  // const getAllCourses = useAllCoursesQuery();
  const { data: courses, isLoading, error } = useAllCoursesQuery();

  ///////////////////////////////////
  // console.log("data", courses);

  /////////////////////////////////////useEffects


  //////////////////////////////////////  event handlers

  /////////////////////////////
  console.log("courses", courses);
  console.log("error", error);
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <SearchBar />
      {isLoading  ? (
        <>
          <div className=" flex w-full h-screen justify-center items-center">
            {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
            <img src={loadingIcon} alt="loading"></img>
          </div>
        </>
      ) : (
        <>
          {error?.status === 401 ? (
            <>
              <Logout error={error} />
            </>
          ) : (
            <>
              <CourseList courses={courses}/>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Courses;
