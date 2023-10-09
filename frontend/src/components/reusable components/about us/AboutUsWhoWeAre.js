import React, { useEffect } from "react";
import { aboutUsWhoWeAreBanner } from "../../../utils/staticImageUrls";
const AboutUsWhoWeAre = () => {
  useEffect(() => {
    console.log("who we are");
  }, []);
  return (
    <>
      <div
        className="mt-16 h-59 flex justify-start items-center w-100"
        style={{ backgroundImage: `url(${aboutUsWhoWeAreBanner})`, backgroundSize: "cover" }}
      >
        <div className="h-59 w-50 flex flex-col justify-center pl-32">
          <h5 className="text-gray-600 font-serif text-2xl mb-4 font-thin">
            WHO WE ARE
          </h5>
          <h1 className="text-black font-serif text-5xl leading-snug">
            Helping clients <br />
            #AccelerateDigital to face <br />
            Challenges of today and <br />
            tomorrow
          </h1>
        </div>
      </div>
    </>
  );
};

export default AboutUsWhoWeAre;
