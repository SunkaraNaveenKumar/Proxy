import React, { useState } from "react";
import { useForgotPasswordMutation } from "../../store/apis/userApi";
import loadingIcon from "../../assets/loading.svg";

const ForgetPassword = () => {
  const [forgotUserEmail, setForgotUserEmail] = useState("");
  const [
    forgotPassword,
    { isLoading, data: passwordData, error: passwordError },
  ] = useForgotPasswordMutation();
  console.log("data", passwordData);
  console.log("error", passwordError);
  const handleForgotPassword = (e) => {
    const { value } = e.target;
    setForgotUserEmail(value);
  };
  const handleSubmitForgotPassword = () => {
    const formData = {
      email: forgotUserEmail,
    };
    forgotPassword(formData);
    // .unwrap()
    // .then((res) => {
    //   console.log(res.errors);
    //   if (res.errors) {
    //     setData({ ...data, error: res.errors, isSuccess: "" });
    //   } else {
    //     const { message } = res;
    //     setData({ ...data, error: "", isSuccess: message });
    //     setForgotUserEmail("")
    //   }
    // })
    // .catch((err) => {
    //  console.log("err",err)
    // });
  };
  if (isLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <div className="w-full bg-gray-100 h-screen flex  justify-center items-center">
      {passwordError ? (
        <p className="text-3xl text-red-500 font-bold">
          SERVER ISSUE PLEASE TRY AFTER SOME TIME
        </p>
      ) : passwordData?.message ? (
        <div>
          <p className="text-2xl font-bold text-green-300">
            {passwordData.message}
          </p>
          <p>
            If you dint recieve email ?{" "}
            <button
              className="text-red-300"
              onClick={handleSubmitForgotPassword}
            >
              resend it
            </button>
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmitForgotPassword}
          className="flex flex-col justify-center items-center gap-8 border border-black border-solid w-2/5 p-5"
        >
          {passwordData?.errors && (
            <p className="text-xl font-bold text-red-500">
              {passwordData.errors}
            </p>
          )}
          <p className="text-2xl font-bold">Forgot Password</p>
          <input
            type="text"
            className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full"
            placeholder="Enter your Email..."
            name="useremail"
            value={forgotUserEmail}
            onChange={handleForgotPassword}
          ></input>

          <input
            type="submit"
            value="send"
            className="flex justify-center items-center w-20 rounded-lg h-10 bg-blue-200 shadow-lg"
          ></input>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
