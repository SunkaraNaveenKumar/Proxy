import React, { useEffect, useState } from "react";
import Form from "../reusable components/Form";
import loadingIcon from "../../assets/loading.svg";
import { useAddCourseMutation } from "../../store/apis/adminApi";
import { normalToaster } from "../../utils/helpers";
import Toaster from "../reusable components/Toaster";

const initialCourseState = {
  title: {
    value: "",
    name: "courseTitle",
    placeholder: "Enter Course Title",
    type: "text",
  },
  description: {
    value: "",
    name: "courseDescription",
    placeholder: "Enter Course Description",
    type: "textarea",
  },
  imageUrl: {
    value: "",
    name: "courseImage",
    placeholder: "Enter Course Image Url",
    type: "text",
  },
  price: {
    value: "",
    name: "coursePrice",
    placeholder: "Enter Course Price",
    type: "number",
  },
};

const AddCourse = () => {
  //////////////////////////////// state
  const [course, setCourse] = useState(initialCourseState);
  //////////////////////////////////// rtk query
  const [
    addCourse,
    { data: courseData, error: addCourseError, isLoading: addCourseLoading },
  ] = useAddCourseMutation();
  ////////////////////////////////
  console.log("courseData", courseData);
  ////////////////////////////////// useEffect
  useEffect(() => {
    console.log("useEffcect");
    if (courseData) {
      // console.log("kwhfbkwefbwekfe", Object.keys(courseData));
      if (Object.keys(courseData)?.length) {
        normalToaster("Successfully New Course got added");
        setCourse(initialCourseState);
      }
    }
  }, [courseData]);
  ///////////////////////////////// event handlers
  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    if (name === "courseTitle") {
      setCourse({ ...course, title: { ...course.title, value } });
    }
    if (name === "courseDescription") {
      setCourse({ ...course, description: { ...course.description, value } });
    }
    if (name === "courseImage") {
      setCourse({ ...course, imageUrl: { ...course.imageUrl, value } });
    }
    if (name === "coursePrice") {
      setCourse({ ...course, price: { ...course.price, value } });
    }
  };
  const handleCourseSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: course.title.value,
      description: course.description.value,
      imageUrl: course.imageUrl.value,
      price: course.price.value,
    };
    console.log("formData", formData);
    addCourse(formData);
    // .unwrap()
    // .then((res) => {
    //   console.log("res",res);
    // })
    // .catch((err) => {
    //   console.log("err",err);
    // });
  };
  const handleCancel = () => {
    setCourse(initialCourseState);
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <Toaster />
      <div className="w-96">
        {addCourseLoading ? (
          <div className=" flex w-full h-screen justify-center items-center">
            {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
            <img src={loadingIcon} alt="loading"></img>
          </div>
        ) : (
          <Form
            data={course}
            handleChange={handleCourseChange}
            handleSubmit={handleCourseSubmit}
            submitValue="Add Course"
            handleCancel={handleCancel}
            errors={addCourseError}
          />
        )}
      </div>
    </div>
  );
};

export default AddCourse;
