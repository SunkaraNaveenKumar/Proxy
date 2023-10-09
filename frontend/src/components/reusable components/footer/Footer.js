import React from "react";
import { FaTwitter, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black w-100 h-17 flex justify-end items-center px-10 mt-auto shrink-0">
      <div className="flex flex-row gap-x-7 text-white">
        <h1 className="">FOLLOW US ON</h1>
        <a href="/" className="">
          <FaTwitter size={26} />
        </a>
        <a href="/" className="">
          <FaLinkedinIn size={26} />
        </a>
        <a href="/" className="">
          <FaFacebookF size={26} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
