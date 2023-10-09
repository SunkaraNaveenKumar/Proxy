import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useChangePasswordMutation } from "../../store/apis/userApi";
import loadingIcon from "../../assets/loading.svg";
const ChangePassword = () => {
  console.log("change password");
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [data, setData] = useState({ error: "", isSuccess: "" });
  const { error, isSuccess } = data;
  const { newPassword, confirmPassword } = password;

  const { token } = useParams();
  useEffect(() => {
    const getToken = localStorage.getItem("forgotPasswordToken");
    if (getToken) {
      if (token === getToken) {
        setData({
          ...data,
          isSuccess:
            "Password alrdeay changed, if you want to change again click on forgot password",
        });
      } else {
        setData({ ...data, isSuccess: "", error: "" });
      }
    } else {
      setData({ ...data, isSuccess: "", error: "" });
    }
  }, [data,token]);
  const handlePassword = (e) => {
    const { value, name } = e.target;
    if (name === "newpassword") {
      setPassword({ ...password, newPassword: value });
    }
    if (name === "confirmpassword") {
      setPassword({ ...password, confirmPassword: value });
    }
  };
  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const formData = {
      newPassword,
    };
    if (newPassword === confirmPassword) {
      setData({ ...data, error: "" });
      // console.log("token", token);
      changePassword({ formData, token })
        .unwrap()
        .then((res) => {
          if (res.isSuccess) {
            setData({ ...data, isSuccess: res.isSuccess, error: "" });
            setPassword({ ...password, newPassword: "", confirmPassword: "" });
            localStorage.setItem("forgotPasswordToken", token);
          } else if (res.errors) {
            setData({ ...data, error: res.errors });
          } else {
            setData({
              ...data,
              error: res.message + "Please click on the forgot again",
            });
          }
          // console.log("res", res.isSuccess);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      setData({ ...data, error: "Both the passwords are not same" });
    }
  };
  if (isLoading) {
    return (
      <div className=" flex w-full h-59 justify-center items-center">
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <div className="w-full bg-gray-100 h-59 flex justify-center items-center gap-y-5 bg-gray-300">
      {isSuccess ? (
        <p className="text-2xl text-green-400 font-bold">{isSuccess}</p>
      ) : (
        <form
          onSubmit={handleSubmitPassword}
          className=" flex flex-col justify-center items-center gap-4 p-7 w-2/5   border border-black border-solid rounded-lg "
        >
          {typeof error == "string" && error && (
            <p className="text-2xl font-bold text-red-500">{error}</p>
          )}
          {error?.password && (
            <p className="text-2xl font-bold text-red-500">
              {error.password.message}
            </p>
          )}
          <input
            type="text"
            className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full"
            placeholder="Enter New Password"
            name="newpassword"
            value={newPassword}
            onChange={handlePassword}
          ></input>
          <input
            type="text"
            className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full"
            placeholder="confirm password"
            name="confirmpassword"
            value={confirmPassword}
            onChange={handlePassword}
          ></input>
          <input
            type="submit"
            value="Change Password"
            className="px-5 flex justify-center items-center rounded-lg h-10 bg-blue-200 shadow-lg"
          ></input>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
