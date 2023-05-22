import React from "react";

const UserAccount = () => {
  console.log("user Account");
  const handleChange = (e) => {
    e.target.value = e.target.value.slice(0, 10);
  };
  return (
    <div>
      <form className="flex flex-row flex-wrap">
        <input
          type="text"
          placeholder="Full Name"
          className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-2/5"
        ></input>
        <input
          type="text"
          placeholder="Full Addess..."
          className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-2/5"
        ></input>
        <input
          type="number"
          placeholder="Enter your 10 digit Phone Number"
          onChange={(e) => {
            handleChange(e);
          }}
          className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-2/5"
        ></input>
      </form>
    </div>
  );
};

export default UserAccount;
