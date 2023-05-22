import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("home");
  }, []);
  return <div>Home</div>;
};

export default Home;
