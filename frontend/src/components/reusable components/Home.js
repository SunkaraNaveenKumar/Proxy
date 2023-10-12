import React, { useEffect } from "react";
import {
  bodyBackgroundImage,
  onlineCoursesImage,
} from "../../utils/staticImageUrls";

const Home = () => {
  useEffect(() => {
    console.log("home");
  }, []);
  return (
    <div
      className="min-h-59 flex flex-wrap gap-y-5 justify-around py-10"
      style={{
        backgroundImage: `url(${bodyBackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="h-96 w-80 shadow-xl rounded-xl pt-28 px-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${onlineCoursesImage})` }}
      >
        <h1 className="w-4 text-3xl font-bold font-serif text-blue-500">
          Our Services
        </h1>
      </div>
      <div
        className="h-96 w-80 shadow-xl rounded-xl pt-28 px-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${onlineCoursesImage})` }}
      >
        <h1 className="w-4 text-3xl font-bold font-serif text-blue-500">
          Job Support
        </h1>
      </div>
      <div
        className="h-96 w-80 shadow-xl rounded-xl pt-28 px-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${onlineCoursesImage})` }}
      >
        <h1 className="w-4 text-3xl font-bold font-serif text-blue-500">
          Proxy
        </h1>
      </div>
      <div
        className="h-96 w-80 shadow-xl rounded-xl pt-28 px-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${onlineCoursesImage})` }}
      >
        <h1 className="w-4 text-3xl font-bold font-serif text-blue-500">
          Online Courses
        </h1>
      </div>
    </div>
  );
};

export default Home;
