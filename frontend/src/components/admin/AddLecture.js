import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "../reusable components/Form";
import { useAddLectureMutation } from "../../store/apis/adminApi";
import loadingIcon from "../../assets/loading.svg";
import { normalToaster } from "../../utils/helpers";
import Toaster from "../reusable components/Toaster";
const initialLectureState = {
  title: {
    value: "",
    name: "lectureTitle",
    placeholder: "Enter Lecture Title",
    type: "text",
  },
  assetType: {
    value: "",
    name: "lectureAssetType",
    selectData: ["video", "pdf"],
    placeholder: "Enter Leture asset type",
    type: "select",
  },
  assetUrl: {
    value: "",
    name: "lectureAssetUrl",
    placeholder: "Enter Lecture Asset Url",
    type: "text",
  },
  folderTitle: {
    value: "",
    name: "folderTitle",
    placeholder: "Enter Folder Title",
    type: "text",
  },
};
const AddLecture = () => {
  const { courseId } = useParams();
  const [lecture, setLecture] = useState(initialLectureState);
  console.log(courseId);
  /////////////////////////////// rtk query api
  const [addLecture, { data: addLectureData, isLoading, error }] =
    useAddLectureMutation();
  //   console.log("addLectureStatus", addLectureData);
  console.log("addLecture error", error);
  //////////////////////////////////// useEffetcs

  useEffect(() => {
    if (addLectureData) {
      if (Object.keys(addLectureData)?.length > 0) {
        // console.log("addLectureData", addLectureData);
        normalToaster("Successfully lecture got added");
      }
    }
  }, [addLectureData]);
  ///////////////////////////////event handlers
  const handleLectureChange = (e) => {
    const { name, value } = e.target;
    if (name === "lectureTitle") {
      setLecture({ ...lecture, title: { ...lecture.title, value } });
    }
    if (name === "lectureAssetType") {
      setLecture({ ...lecture, assetType: { ...lecture.assetType, value } });
    }
    if (name === "lectureAssetUrl") {
      setLecture({ ...lecture, assetUrl: { ...lecture.assetUrl, value } });
    }
    if (name === "folderTitle") {
      setLecture({
        ...lecture,
        folderTitle: { ...lecture.folderTitle, value },
      });
    }
  };
  const handleLectureSubmit = (e) => {
    e.preventDefault();
    const { title, assetType, assetUrl, folderTitle } = lecture;
    const formData = {
      title: title.value,
      assetType: assetType.value,
      assetUrl: assetUrl.value,
      folderTitle: folderTitle.value,
    };
    console.log("formData", formData);
    addLecture({ formData, courseId });
  };
  const handleCancel = () => {
    setLecture(initialLectureState);
  };
  if (isLoading) {
    return (
      <div className=" flex w-full h-screen justify-center items-center">
        {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center flex-col w-full h-screen">
      <Toaster />
      <div className="w-96">
        <Form
          data={lecture}
          handleChange={handleLectureChange}
          handleSubmit={handleLectureSubmit}
          submitValue="Add Lecture"
          handleCancel={handleCancel}
          errors={error}
        ></Form>
      </div>
    </div>
  );
};

export default AddLecture;
