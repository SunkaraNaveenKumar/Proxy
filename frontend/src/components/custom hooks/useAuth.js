import jwt_decode from "jwt-decode";
const useAuth = () => {
  let authInfo = {};
  const token = localStorage.getItem("token");
  if (token) {
    const tokenInfo = jwt_decode(token);
    authInfo.isLoggedIn = true;
    authInfo.role = tokenInfo.role;
    authInfo.token = token;
  }

  return authInfo;
};

export default useAuth;
