import React, { useEffect } from "react";
import Footer from "../footer/Footer";
const AboutUsBoardOfDirectors = () => {
  const banner =
    "https://www.infovision.com/sites/default/files/images/banner/cover/2022-01/InfoVision%20Bannerr_option%205%20copy%203.png";
  useEffect(() => {
    console.log("board of directors");
  }, []);
  return (
    <>
      <div
        className="mt-16 h-[90vh] flex justify-start items-center w-100"
        style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}
      >
        <div className="h-[80vh] w-[50vw] flex flex-col justify-center pl-32">
          <h5 className="text-gray-600 font-serif text-2xl mb-4 font-thin">
            THE NAVUSHH TEAM
          </h5>
          <h1 className="text-black font-serif text-5xl leading-snug">
            Creating velocity for clients, <br />
            every day <br />
          </h1>
        </div>
      </div>
      <div className="h-[80vh] w-100 bg-slate-100 px-12 py-5 flex flex-row justify-around">
        <div className="h-full w-1/4 flex flex-col border-2 rounded-xl shadow-lg">
          <div className="h-4/5 w-full">
            <img
              src="https://cdn.pixabay.com/photo/2021/12/16/17/25/man-6874912_1280.jpg"
              alt="CEO"
              className="h-full w-full rounded-t-xl"
            />
          </div>
          <div className="h-1/4 pl-10 w-full flex flex-col justify-center">
            <h1 className="text-4xl mb-2 font-serif">Naveen Sunkara</h1>
            <h2 className="">CEO</h2>
          </div>
        </div>
        <div className="h-full w-1/4 flex flex-col rounded-xl shadow-lg">
          <div className="h-4/5 w-full">
            <img
              src="https://cdn.pixabay.com/photo/2020/05/13/21/24/nigerian-5169008_1280.jpg"
              alt="Markeing Manager"
              className="h-full w-full rounded-t-xl"
            />
          </div>
          <div className="h-1/4 pl-10 w-full flex flex-col justify-center">
            <h1 className="text-4xl mb-2 font-serif">Akbar Ali Khan</h1>
            <h2 className="">Marketing Manager</h2>
          </div>
        </div>
        <div className="h-full w-1/4 flex flex-col border-2 rounded-xl shadow-lg">
          <div className="h-4/5 w-full">
          <img
              src="https://cdn.pixabay.com/photo/2021/12/16/17/25/man-6874912_1280.jpg"
              alt="CEO"
              className="h-full w-full rounded-t-xl"
            />
          </div>
          <div className="h-1/4 pl-10 w-full flex flex-col justify-center">
            <h1 className="text-4xl mb-2 font-serif">Naveen Sunkara</h1>
            <h2 className="">Founder</h2>
          </div>
        </div>
      </div>
      <Footer className={"absolute"} />
    </>
  );
};

export default AboutUsBoardOfDirectors;
