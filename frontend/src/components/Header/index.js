import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../custom hooks/useAuth";
import { useSelector } from "react-redux";

const Header = () => {
  const userLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const adminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  // const adminLoggedIn  = useSelector((state) => state.admin.isLoggedIn);

  const { role } = useAuth();
  console.log("header");
  return (
    <div>
      <div className="flex flex-row gap-x-10 justify-end items-center bg-red-200 pr-10 h-16">
        <div>
          <Link to="/">Home</Link>
        </div>
        {/* <div>
          <Link to="/user/resetpassword/hebfwhfbewjf">Link</Link>
        </div> */}
        {!userLoggedIn && !adminLoggedIn && (
          <>
            <div>
              <Link to="/user/login">Login</Link>
            </div>
            <div>
              <Link to="/user/register">register</Link>
            </div>
            <div>
              <Link to="/admin/login">Admin</Link>
            </div>
          </>
        )}

        {(userLoggedIn || adminLoggedIn) && (
          <>
            <div>
              <Link to={`/${role}/account`}>Account</Link>
            </div>
            <div>
              <Link to={`/logout/${role}`}>logout</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
