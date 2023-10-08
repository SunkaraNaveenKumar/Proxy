import React, { useEffect } from "react";
import Footer from "../footer/Footer";
const AboutUsMileStone = () => {
  const banner =
    "https://www.infovision.com/sites/default/files/images/banner/cover/2022-01/InfoVision%20Bannerr_option%205%20copy%202.png";
  useEffect(() => {
    console.log("milestone");
  }, []);
  return (
    <>
      <div
        className="mt-16 h-[80vh] flex justify-start items-center w-100"
        style={{ backgroundImage: `url(${banner})`, backgroundSize: "cover" }}
      >
        <div className="h-[80vh] w-[50vw] flex flex-col justify-center pl-32">
          <h5 className="text-gray-600 font-serif text-2xl mb-4 font-thin">
            OUR MILESTONES
          </h5>
          <h1 className="text-black font-serif text-5xl leading-snug">
            Our journey over the years, <br />
            as we #AccelerateDigital <br />
          </h1>
        </div>
      </div>
      <Footer className={"absolute"} />
    </>
  );
};

export default AboutUsMileStone;
