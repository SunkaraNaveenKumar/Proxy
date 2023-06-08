import React, { useEffect } from "react";
import Courses from "./Courses";

const Home = () => {
  useEffect(() => {
    console.log("home");
  }, []);
  return (
    <div className="bg-gray-300 h-screen">
      <Courses />
    </div>
  );
};

export default Home;
