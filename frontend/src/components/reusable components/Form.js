import clsx from "clsx";
import React from "react";

const Form = ({
  data,
  handleChange,
  handleSubmit,
  submitValue,
  handleCancel,
  errors,
}) => {
  const select = ["Add Course", "Add Lecture"];
  const toggle = select.includes(submitValue);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 justify-center items-center"
    >
      {Object.keys(data).map((key, i) => {
        const { placeholder, value, type, name } = data[key];
        // console.log(i);
        if (type === "textarea") {
          return (
            <div
              key={i}
              className="flex w-full flex-col justify-center items-center gap-2"
            >
              <textarea
                className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full"
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
              ></textarea>
              {errors?.data.errors[key] && (
                <p className="text-base text-red-500 font-bold">
                  {errors?.data.errors[key]?.message}
                </p>
              )}
            </div>
          );
        } else if (type === "text") {
          return (
            <div
              key={i}
              className="flex w-full flex-col justify-center items-center gap-2"
            >
              <input
                className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full"
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
              ></input>
              {errors?.data.errors[key] && (
                <p className="text-base text-red-500 font-bold">
                  {errors?.data.errors[key]?.message}
                </p>
              )}
            </div>
          );
        } else if (type === "number") {
          return (
            <div
              key={i}
              className="flex w-full flex-col justify-center items-center gap-2"
            >
              <input
                className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full"
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
              ></input>
              {errors?.data.errors[key] && (
                <p className="text-base text-red-500 font-bold">
                  {errors?.data.errors[key]?.message}
                </p>
              )}
            </div>
          );
        } else if (type === "select") {
          const { selectData } = data[key];
          return (
            <div key={i} className="flex w-full flex-col justify-center items-center gap-2">
              <select
                className="flex justify-center items-center w-full border border-solid border-black rounded-lg shadow-lg pl-6 h-10"
                name={name}
                value={value}
                onChange={handleChange}
              >
                <option value="">--select asset type--</option>
                {selectData.map((option, i) => {
                  return (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  );
                })}
              </select>
              {errors?.data.errors[key] && (
                <p className="text-base text-red-500 font-bold">
                  {errors?.data.errors[key]?.message}
                </p>
              )}
            </div>
          );
        } else {
          return null
        }
      })}

      <div
        className={clsx(
          "flex flex-row w-full items-center",
          toggle ? "justify-between px-4" : "justify-center"
        )}
      >
        {toggle && (
          <button
            onClick={handleCancel}
            className="bg-blue-200 px-5 py-2 shadow-lg rounded-lg border"
          >
            Cancel
          </button>
        )}

        <input
          type="submit"
          className="bg-red-200 px-5 py-2 shadow-lg rounded-lg border"
          value={submitValue}
        ></input>
      </div>
    </form>
  );
};

export default Form;
