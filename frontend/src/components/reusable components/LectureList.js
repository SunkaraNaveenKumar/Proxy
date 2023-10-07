import React, { useEffect, useState } from "react";
import upArrowIcon from "../../assets/upArrow.svg";
import downArrowIcon from "../../assets/downArrow.svg";
import clsx from "clsx";
import {
  useDeleteLectureFolderMutation,
  useDeleteLectureMutation,
} from "../../store/apis/adminApi";
import loadingIcon from "../../assets/loading.svg";
import { getFilteredLectures, normalToaster } from "../../utils/helpers";
import Toaster from "./Toaster";
const LectureList = ({
  folderName,
  lectures,
  handleLecture,
  lecture,
  courseId,
}) => {
  const [list, setList] = useState([]);
  // const [folderName,setFolderName]=useState("")
  const [toggle, setToggle] = useState(false);
  /////////////////////////////////////////////////   rtk query
  const [deleteLecture, { data: deletedLecture, isLoading }] =
    useDeleteLectureMutation();
  const [
    deleteLectureFolder,
    { data: deletedLectureFolder, isLoading: isdeletingLectureFolder },
  ] = useDeleteLectureFolderMutation();
  // console.log("deletedLectureFolder123", deletedLectureFolder);
  // console.log("error", error);
  ///////////////////////////////////////////////////// event handlers
  const handleLectureEdit = (e) => {
    e.stopPropagation();
  };

  // console.log("deletedLecture", deletedLecture);
  const handleLectureDelete = (e, lectureId) => {
    e.stopPropagation();
    deleteLecture({ courseId, lectureId });
  };
  const handleGetLectures = (folderName) => {
    setToggle(!toggle);
    if (!toggle) {
      setList(getFilteredLectures(lectures, folderName));
    }
  };
  const handleDeleteLecturesFolder = (e) => {
    e.stopPropagation();
    deleteLectureFolder({ courseId, folderName });
  };
  /////////////////////////////////////////////////  useEffect
  useEffect(() => {
    if (deletedLecture) {
      if (Object.keys(deletedLecture)?.length > 0) {
        console.log("deletedLecture", deletedLecture);
        setList(getFilteredLectures(lectures, folderName));
        normalToaster("Lecture has been successfully deleted");
      }
    } else if (deletedLectureFolder) {
      if (Object.keys(deletedLectureFolder)?.length > 0) {
        normalToaster("Lecture Folder Successfully deleted");
      }
    }
  }, [deletedLectureFolder,deletedLecture]);

  if (isLoading || isdeletingLectureFolder) {
    return (
      <div className=" flex w-full h-screen justify-center items-center">
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Toaster />
      <div
        onClick={() => {
          handleGetLectures(folderName);
        }}
        key={folderName}
        className="w-full h-10 flex justify-between items-center border border-black px-2"
      >
        <p>{folderName}</p>{" "}
        <div className="flex flex-row gap-3">
          <button
            onClick={handleDeleteLecturesFolder}
            className="flex justify-center h-7 items-center bg-red-200 rounded-lg shadow-lg py-1 px-2"
          >
            Delete
          </button>
          {toggle ? (
            <img src={upArrowIcon} alt="up arrow "></img>
          ) : (
            <img src={downArrowIcon} alt="down arrow"></img>
          )}
        </div>
      </div>
      <div className="">
        {toggle && (
          <>
            {list?.map((Item, index) => {
              const { _id, title } = Item;
              return (
                <div
                  key={_id}
                  onClick={() => {
                    handleLecture(Item);
                  }}
                  className={clsx(
                    "w-full text-black min-h-10 gap-5 px-5 py-1 bg-blue-200 flex flex-wrap justify-between rounded-lg shadow-lg items-center border border-black",
                    { "bg-gray-200": lecture._id === _id }
                  )}
                >
                  <div className="flex flex-row flex-wrap gap-10">
                    <p>{index + 1}</p>
                    <p>{title}</p>
                  </div>

                  <div className="flex flex-row grow justify-end items-center  gap-5">
                    <button
                      onClick={handleLectureEdit}
                      className="flex justify-center h-7 items-center bg-red-200 rounded-lg shadow-lg py-1 px-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleLectureDelete(e, _id);
                      }}
                      className="flex justify-center h-7 items-center bg-red-200 rounded-lg shadow-lg py-1 px-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default LectureList;
