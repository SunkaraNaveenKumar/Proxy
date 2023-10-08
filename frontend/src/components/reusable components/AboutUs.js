import React, { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    console.log("about us");
  }, []);
  return <div className="mt-[200px]">AboutUs</div>;
};

export default AboutUs;
