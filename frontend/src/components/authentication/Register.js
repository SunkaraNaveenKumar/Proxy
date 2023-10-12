import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRegisterUserEmail,
  setRegisterUserName,
  setRegisterUserPassword,
} from "../../store/slices/userSlice";
import { useAddUserMutation } from "../../store/apis/userApi";
import { Link, useNavigate } from "react-router-dom";
import loadingIcon from "../../assets/loading.svg";
import { bodyBackgroundImage } from "../../utils/staticImageUrls";

const Register = () => {
  console.log("register");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userRegisterInfo } = useSelector((state) => state.user);
  const {
    registerUserName,
    registerUserEmail,
    registerUserPassword,
    registerError,
  } = userRegisterInfo;
  // console.log("registerError", registerError);
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName") {
      dispatch(setRegisterUserName(value));
    }
    if (name === "userEmail") {
      dispatch(setRegisterUserEmail(value));
    }
    if (name === "userPassword") {
      dispatch(setRegisterUserPassword(value));
    }
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const formData = {
      username: registerUserName,
      email: registerUserEmail,
      password: registerUserPassword,
    };
    addUser(formData)
      .unwrap()
      .then((res) => {
        if (res.isRegistered) {
          navigate("/user/login");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  if (isLoading) {
    return (
      <div
        className="flex w-full h-59 justify-center items-center"
        style={{
          backgroundImage: `url(${bodyBackgroundImage})`,
          backgroundSize: "cover",
        }}
      >
        {/* <p className="text-xl font-bold text-red-100">isLoading........</p> */}
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <div
      className="w-full h-59 flex flex-col justify-center items-center gap-y-5"
      style={{
        backgroundImage: `url(${bodyBackgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      {registerError && typeof registerError == "string" && (
        <p className="text-xl font-bold text-red-500">{registerError}</p>
      )}
      <h1 className="text-gray-100 text-3xl font-bold font-Georgia tracking-wider">
          Register To Navushh
        </h1>
        <p className="text-slate-300 text-sm mt-0 tracking-widest">
          Land Your Dream Job
        </p>
      <form
        onSubmit={handleRegister}
        className=" flex flex-col justify-center items-center gap-4 p-7 w-1/3 border border-gray-100 border-solid rounded-lg "
      >
        <div className="flex flex-col w-full">
          {registerError?.username && (
            <p className="text-sm font-bold text-red-500">
              {registerError.username.message}
            </p>
          )}
          <input
            type="text"
            className="rounded-lg shadow-lg pl-6 h-10 w-full"
            placeholder="Username..."
            name="userName"
            value={registerUserName}
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex flex-col w-full">
          {registerError?.email && (
            <p className="text-sm font-bold text-red-500">
              {registerError.email.message}
            </p>
          )}
          <input
            type="text"
            className="rounded-lg shadow-lg pl-6 h-10 w-full"
            placeholder="Email..."
            name="userEmail"
            value={registerUserEmail}
            onChange={handleChange}
          ></input>
        </div>
        <div className="flex flex-col w-full">
          {registerError?.password && (
            <p className="text-sm font-bold text-red-500">
              {registerError.password.message}
            </p>
          )}
          <input
            type="text"
            className="rounded-lg shadow-lg pl-6 h-10 w-full"
            placeholder="password..."
            name="userPassword"
            value={registerUserPassword}
            onChange={handleChange}
          ></input>
        </div>

        <input
          type="submit"
          value="Register"
          className="w-20 rounded-lg h-10 bg-blue-200 shadow-lg"
        ></input>
        <p className="text-gray-100">
          Already Logged In ?{" "}
          <Link
            to="/user/login"
            className="text-blue-500 underline underline-offset-4"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default React.memo(Register);
