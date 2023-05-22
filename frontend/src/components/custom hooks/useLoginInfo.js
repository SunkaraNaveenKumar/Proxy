const useLoginInfo = (location) => {
  const userType = location.pathname.split("/")[1];
  let isAdminLogin = false;
  if (userType === "admin") {
    isAdminLogin = true;
  }
  return { isAdminLogin };
};
export default useLoginInfo;
