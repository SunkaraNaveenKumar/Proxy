import useAuth from "../custom hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  console.log("protected Routes");
  const { isLoggedIn, role } = useAuth();
  const location = useLocation();
  if (isLoggedIn) {
    return (
      <>
        {allowedRoles.includes(role) ? (
          <Outlet />
        ) : (
          <Navigate to="/" state={{ from: location }}></Navigate>
        )}
      </>
    );
  }
  return <Navigate to="/user/login" state={{ from: location }}></Navigate>;
};

export default ProtectedRoutes;
