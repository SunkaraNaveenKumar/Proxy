import React, { useEffect } from "react";
import { aboutUsPartnershipsBanner } from "../../../utils/staticImageUrls";
const AboutUsPartnerships = () => {
  useEffect(() => {
    console.log("milestone");
  }, []);
  return (
    <>
      <div
        className="h-59 flex justify-start items-center w-100"
        style={{ backgroundImage: `url(${aboutUsPartnershipsBanner})`, backgroundSize: "cover" }}
      >
        <div className="h-59 w-50 flex flex-col justify-center pl-32">
          <h1 className="text-black font-serif text-5xl leading-snug">
            Startegic Partnerships <br />
            to <span className="text-blue-700">#AccelerateDigital</span>
          </h1>
          <h5 className="text-gray-600 font-serif text-2xl mb-4 font-thin">
            Moving Together & Forward
          </h5>
        </div>
      </div>
    </>
  );
};

export default AboutUsPartnerships;
