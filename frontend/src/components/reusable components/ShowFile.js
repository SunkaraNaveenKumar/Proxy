import React from "react";

const ShowFile = ({ file }) => {
  let path;
  if (file?.path) {
    path = process.env.REACT_APP_SERVER_URL + file.path.replace("public", "");
  } else {
    path = URL.createObjectURL(file);
  }
  // console.log(path)
  return (
    <div>
      <img className="h-44" src={path} alt={file.name}></img>
    </div>
  );
};

export default ShowFile;
