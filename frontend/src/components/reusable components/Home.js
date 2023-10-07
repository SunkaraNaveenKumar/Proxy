import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("home");
  }, []);
  return (
    <div className="mt-[200px]">
   Home
    </div>
  );
};

export default Home;
