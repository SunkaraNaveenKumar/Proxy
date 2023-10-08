import React, { useEffect } from "react";

const ContactUs = () => {
  useEffect(() => {
    console.log("contact us");
  }, []);
  return <div className="mt-[200px]">ContactUs</div>;
};

export default ContactUs;
