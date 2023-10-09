import React, { useEffect } from "react";
import { aboutUsMileStoneBanner } from "../../../utils/staticImageUrls";
const AboutUsMileStone = () => {
  useEffect(() => {
    console.log("milestone");
  }, []);
  return (
    <>
      <div
        className="mt-16 h-59 flex justify-start items-center w-100"
        style={{ backgroundImage: `url(${aboutUsMileStoneBanner})`, backgroundSize: "cover" }}
      >
        <div className="h-59 w-50 flex flex-col justify-center pl-32">
          <h5 className="text-gray-600 font-serif text-2xl mb-4 font-thin">
            OUR MILESTONES
          </h5>
          <h1 className="text-black font-serif text-5xl leading-snug">
            Our journey over the years, <br />
            as we #AccelerateDigital <br />
          </h1>
        </div>
      </div>
    </>
  );
};

export default AboutUsMileStone;
