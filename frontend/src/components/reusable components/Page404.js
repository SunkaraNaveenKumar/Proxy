import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  console.log("404page");
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, [navigate]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="bg-pink-200 rounded-lg  h-16 flex items-center justify-center w-2/5">
        <h1 className=" text-xl text-center font-bold ">
          The Link that you are looking for is not Present <br />
          So Automatically navigating to the Home Page
        </h1>
      </div>
    </div>
  );
};

export default Page404;
