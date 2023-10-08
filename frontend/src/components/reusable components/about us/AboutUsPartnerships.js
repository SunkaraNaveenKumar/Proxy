import React, { useEffect } from "react";
import Footer from "../footer/Footer";
const AboutUsPartnerships = () => {
  const banner =
    "https://www.infovision.com/sites/default/files/images/banner/cover/2022-12/Web%201920%20%E2%80%93%2015-min.jpg";
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
          <h1 className="text-black font-serif text-5xl leading-snug">
            Startegic Partnerships <br />
            to <span className="text-blue-700">#AccelerateDigital</span>
          </h1>
          <h5 className="text-gray-600 font-serif text-2xl mb-4 font-thin">
            Moving Together & Forward
          </h5>
        </div>
      </div>
      <Footer className={"absolute"} />
    </>
  );
};

export default AboutUsPartnerships;
