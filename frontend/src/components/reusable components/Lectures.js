import { useGetAdminLecturesQuery } from "../../store/apis/adminApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import LectureList from "./LectureList";
import loadingIcon from "../../assets/loading.svg";
import { useState } from "react";
import useAuth from "../custom hooks/useAuth";
import { useGetUserLecturesQuery } from "../../store/apis/userApi";
const Lectures = () => {
  ////////////////////////////////////states
  const [lecture, setLecture] = useState({});
  const { role } = useAuth();
  /////////////////////////////
  const { courseId } = useParams();
  const navigate = useNavigate();
  const getAdminLectures = useGetAdminLecturesQuery(courseId);
  const getUserLectures = useGetUserLecturesQuery(courseId);
  const { data: lectures, isLoading } =
    role === "admin" ? getAdminLectures : getUserLectures;
  console.log("lectures", lectures);
  ////////////////////////////////// useEffect
  ////////////////////////////////// helpers
  const getFolderNames = () => {
    return Array.from(new Set(lectures?.map((ele) => ele.folderTitle)));
  };
  console.log(getFolderNames());
  ///////////////////////////////////event handlers
  const handleLecture = (lecture) => {
    setLecture(lecture);
  };
  // console.log(lecture.assetUrl);
  //////////////////////////////////
  if (isLoading) {
    return (
      <div className=" flex w-full h-screen justify-center items-center">
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-5 mt-20 px-10">
      {lectures.length > 0 && (
        <button
          onClick={() => {
            navigate(`/admin/course/${courseId}/lecture`);
          }}
          className="flex w-40 justify-center h-10 items-center bg-blue-200 rounded-lg shadow-lg py-1 px-2"
        >
          Add Lecture
        </button>
      )}

      <div className="flex flex-row ">
        {lectures?.length > 0 ? (
          <div className="border flex flex-col border border-black  w-96 min-h-screen rounded-lg shadow-lg overflow-hidden">
            {getFolderNames()?.map((folder) => {
              return (
                <LectureList
                  key={folder}
                  folderName={folder}
                  lectures={lectures}
                  lecture={lecture}
                  handleLecture={handleLecture}
                  courseId={courseId}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen w-full">
            <p className="bg-red-200 p-10 rounded-lg shadow-lg">
              {role === "admin" ? (
                <>
                  No Lectures found for this course please add it{" "}
                  <Link
                    to={`/admin/course/${courseId}/lecture`}
                    className="text-blue-400"
                  >
                    CLick here to add lecture
                  </Link>
                </>
              ) : (
                "No Lectures or added to this course, ask admin to add the new lectures"
              )}
            </p>
          </div>
        )}
        {lecture.assetUrl && (
          <div className=" p-5 grow">
            <video controls className="w-full h-96">
              <source src={lecture.assetUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lectures;
