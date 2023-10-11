import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("home");
  }, []);
  return <div className="">Home</div>;
};

export default Home;