import React, { useEffect } from "react";
import {
  contactUsImage,
  homeBodyFrameBackgroundImage,
} from "../../utils/staticImageUrls";

const ContactUs = () => {
  useEffect(() => {
    console.log("contact us");
  }, []);
  return (
    <div
      className="min-h-59 flex justify-center items-center"
      style={{
        backgroundImage: `url(${homeBodyFrameBackgroundImage})`,
        backgroundSize: "contain",
      }}
    >
      <img src={contactUsImage} alt="" className="h-80" />
    </div>
  );
};

export default ContactUs;
