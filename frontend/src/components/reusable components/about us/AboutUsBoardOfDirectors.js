import React, { useEffect } from "react";
import { aboutUsBoardOfDirectorsBanner, ceoImage, marketingManagerImage } from "../../../utils/staticImageUrls";
const AboutUsBoardOfDirectors = () => {

  useEffect(() => {
    console.log("board of directors");
  }, []);
  return (
    <>
      <div
        className="h-65 flex justify-start items-center w-100"
        style={{ backgroundImage: `url(${aboutUsBoardOfDirectorsBanner})`, backgroundSize: "cover" }}
      >
        <div className="h-full w-50 flex flex-col justify-center pl-32">
          <h5 className="text-gray-600 font-serif text-2xl mb-4 font-thin">
            THE NAVUSHH TEAM
          </h5>
          <h1 className="text-black font-serif text-5xl leading-snug">
            Creating velocity for clients, <br />
            every day <br />
          </h1>
        </div>
      </div>
      <div className="h-65 w-100 bg-slate-100 px-12 py-5 flex flex-row justify-around">
        <div className="h-full w-1/4 flex flex-col border-2 rounded-xl shadow-lg">
          <div className="h-4/5 w-full">
            <img
              src={ceoImage}
              alt="CEO"
              className="h-full w-full rounded-t-xl"
            />
          </div>
          <div className="h-1/4 pl-10 w-full flex flex-col justify-center">
            <h1 className="text-3xl mb-2 font-serif text-ellipsis">Naveen Sunkara</h1>
            <h2 className="">CEO</h2>
          </div>
        </div>
        <div className="h-full w-1/4 flex flex-col rounded-xl shadow-lg">
          <div className="h-4/5 w-full">
            <img
              src={marketingManagerImage}
              alt="Markeing Manager"
              className="h-full w-full rounded-t-xl"
            />
          </div>
          <div className="h-1/4 pl-10 w-full flex flex-col justify-center">
            <h1 className="text-3xl mb-2 font-serif text-ellipsis">Akbar Ali Khan</h1>
            <h2 className="">Marketing Manager</h2>
          </div>
        </div>
        <div className="h-full w-1/4 flex flex-col border-2 rounded-xl shadow-lg">
          <div className="h-4/5 w-full">
          <img
              src={ceoImage}
              alt="CEO"
              className="h-full w-full rounded-t-xl"
            />
          </div>
          <div className="h-1/4 pl-10 w-full flex flex-col justify-center">
            <h1 className="text-3xl mb-2 font-serif text-ellipsis">Naveen Sunkara</h1>
            <h2 className="">Founder</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsBoardOfDirectors;
