import { toast } from "react-toastify";

export const convertFilesToArr = (files) => {
  const newConvertedArr = [];
  for (let file of files) {
    newConvertedArr.push(file);
  }
  return newConvertedArr;
};
export const normalToaster = (displayText) => {
  toast.success(displayText, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const filteredUsersFunc = (users, value) => {
  const filteredData = users?.filter((user) => {
    return (
      user.username.toLowerCase().includes(value.toLowerCase()) ||
      user.email.split("@")[0].toLowerCase().includes(value.toLowerCase())
    );
  });
  return filteredData;
};

export const filterCoursesFunc = (courses, value) => {
  const filteredData = courses?.filter((course) => {
    return course.title?.toLowerCase().includes(value.toLowerCase());
  });
  return filteredData;
};
 export const getFilteredLectures =(lectures,folderName)=>{
  const getLecturesByfolderTitle = lectures.filter((folder) => {
    return folder.folderTitle === folderName;
  });
  return getLecturesByfolderTitle
 }