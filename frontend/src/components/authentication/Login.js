import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginUserEmail,
  setLoginUserPassword,
} from "../../store/slices/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLoginInfo from "../custom hooks/useLoginInfo";
import { useLoginMutation } from "../../store/apis/userApi";
import { useAdminLoginMutation } from "../../store/apis/adminApi";
import loadingIcon from "../../assets/loading.svg";
import { setAdminEmail, setAdminPassword } from "../../store/slices/adminSlice";
const Login = () => {
  console.log("login");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdminLogin } = useLoginInfo(location);
  const [login, { isLoading: userLoginLoading }] = useLoginMutation();
  const [adminLogin, { isLoading: adminLoginLoading }] =
    useAdminLoginMutation();
  const { loginUserEmail, loginUserPassword, loginError } = useSelector(
    (state) => state.user.userLoginInfo
  );
  const { adminLoginError, adminEmail, adminPassword } = useSelector(
    (state) => state.admin
  );
  // console.log("loginError", loginError);
  // console.log("isSucess",isSuccess)
  // console.log(useAuth());
  // console.log("isLoading", userLoginLoading, adminLoginLoading);
  // useEffect(() => {
  //   dispatch(resetUserLogin());
  //   dispatch(resetAdminLogin());
  // }, [isAdminLogin]);
  //   useEffect(()=>{
  // console.log("login")
  //   },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userEmail") {
      isAdminLogin
        ? dispatch(setAdminEmail(value))
        : dispatch(setLoginUserEmail(value));
    }
    if (name === "userPassword") {
      isAdminLogin
        ? dispatch(setAdminPassword(value))
        : dispatch(setLoginUserPassword(value));
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      email: isAdminLogin ? adminEmail : loginUserEmail,
      password: isAdminLogin ? adminPassword : loginUserPassword,
    };
    if (isAdminLogin) {
      adminLogin(formData)
        .unwrap()
        .then((res) => {
          // console.log("admin",res)
          if (res.token) {
            navigate("/");
          }
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      login(formData)
        .unwrap()
        .then((res) => {
          if (res.token) {
            navigate("/");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  if (userLoginLoading || adminLoginLoading) {
    return (
      <div className=" flex w-full h-screen justify-center items-center">
        {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <div className=" bg-gray-100 w-full h-screen flex flex-col justify-center items-center gap-y-5">
      {!isAdminLogin && loginError && (
        <p className="text-red-500 text-xl font-bold">{loginError}</p>
      )}
      {isAdminLogin && adminLoginError && (
        <p className="text-red-500 text-xl font-bold">{adminLoginError}</p>
      )}
      <form
        onSubmit={handleLogin}
        className=" flex flex-col justify-center items-center gap-4 p-7 w-2/5   border border-black border-solid rounded-lg "
      >
        <input
          type="text"
          className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full"
          placeholder="Email..."
          name="userEmail"
          value={isAdminLogin ? adminEmail : loginUserEmail}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          className="border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full"
          placeholder="password..."
          name="userPassword"
          value={isAdminLogin ? adminPassword : loginUserPassword}
          onChange={handleChange}
        ></input>
        <input
          type="submit"
          value="Login"
          className="w-20 rounded-lg h-10 bg-blue-200 shadow-lg"
        ></input>
        {!isAdminLogin && (
          <div className="flex flex-col gap-5 bg-red-100 w-full font-bold">
            <p>
              No account?{" "}
              <Link
                to="/user/register"
                className="text-blue-500 underline underline-offset-4"
              >
                Create New Account
              </Link>
            </p>
            <p>
              <Link
                to="/user/forgot-password"
                className="text-blue-500 underline underline-offset-4"
              >
                Forgot Password
              </Link>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
