import React from "react";
import { Link } from "react-router-dom";

export const AboutUs = () => {
  return (
    <div className="relative group">
      <Link className="text-black hover:bg-gray-300 px-3 py-2 rounded-lg">
        ABOUT US
      </Link>
      <div className="w-52 absolute hidden group-hover:block text-white">
        <div className="bg-gray-700 mt-5 rounded-b-xl">
          <Link
            to="/about/who-we-are"
            className="flex hover:bg-gray-600 py-2 px-4"
          >
            Who we are
          </Link>
          <Link
            to="/about/board-of-directors"
            className="flex hover:bg-gray-600 py-2 px-4"
          >
            Board of Directors
          </Link>
          <Link
            to="/about/mile-stone"
            className="flex hover:bg-gray-600 py-2 px-4"
          >
            Milestones
          </Link>
          <Link
            to="/about/partnerships"
            className="flex hover:bg-gray-600 py-2 px-4 rounded-b-xl"
          >
            Partnerships
          </Link>
        </div>
      </div>
    </div>
  );
};
