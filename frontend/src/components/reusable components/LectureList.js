import React, { useState } from "react";
import upArrowIcon from "../../assets/upArrow.svg";
import downArrowIcon from "../../assets/downArrow.svg";
import clsx from "clsx";
const LectureList = ({ folderName, lectures, handleLecture, lecture }) => {
  const [list, setList] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleGetLectures = (folderName) => {
    setToggle(!toggle);
    if (!toggle) {
      const getLecturesByfolderTitle = lectures.filter((folder) => {
        return folder.folderTitle === folderName;
      });
      setList(getLecturesByfolderTitle);
    }
    console.log(folderName, !toggle);
  };
  //   console.log(colorId)
  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
          handleGetLectures(folderName);
        }}
        key={folderName}
        className="w-full h-10 flex justify-between items-center border border-black px-2"
      >
        <p>{folderName}</p>{" "}
        {toggle ? (
          <img src={upArrowIcon} alt="up arrow "></img>
        ) : (
          <img src={downArrowIcon} alt="down arrow"></img>
        )}
      </button>
      <div className="">
        {toggle && (
          <>
            {list.map((Item, index) => {
              const { _id, title } = Item;
              return (
                <button
                  key={_id}
                  onClick={() => {
                    handleLecture(Item);
                  }}
                  className={clsx(
                    "w-full text-black h-10 px-5 bg-blue-200 flex justify-between rounded-lg shadow-lg items-center border border-black",
                    { "bg-gray-200 text-white": lecture._id === _id }
                  )}
                >
                  <p>{index + 1}</p>
                  <p>{title}</p>
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default LectureList;
