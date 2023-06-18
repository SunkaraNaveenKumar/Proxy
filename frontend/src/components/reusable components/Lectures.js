import { useGetAdminLecturesQuery } from "../../store/apis/adminApi";
import { Link, useParams } from "react-router-dom";
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
  const getAdminLectures = useGetAdminLecturesQuery(courseId);
  const getUserLectures = useGetUserLecturesQuery(courseId);
  const { data: lectures, isLoading } =
    role === "admin" ? getAdminLectures : getUserLectures;
  console.log("lectures", lectures);
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
    <div className="flex flex-row mt-16">
      {lectures?.length > 0 ? (
        <div className="border flex flex-col border border-black  w-96 h-screen rounded-lg shadow-lg overflow-hidden">
          {getFolderNames()?.map((folder) => {
            return (
              <LectureList
                key={folder}
                folderName={folder}
                lectures={lectures}
                lecture={lecture}
                handleLecture={handleLecture}
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
        <div className="flex justify-center items-center">
          <video controls>
            <source src={lecture.assetUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default Lectures;
