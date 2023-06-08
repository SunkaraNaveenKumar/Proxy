import React, { useEffect, useRef, useState } from "react";
import {
  useDeleteUserMutation,
  useDeleteUserProfileMutation,
  useGetAllUsersQuery,
} from "../../store/apis/adminApi";
import loadingIcon from "../../assets/loading.svg";
import SearchBar from "../reusable components/SearchBar";
import clsx from "clsx";
import { normalToaster } from "../../utils/helpers";
import Toaster from "../reusable components/Toaster";
import Logout from "../authentication/Logout";

const AllUsers = () => {
  console.log("allUsers");
  const {
    data: users,
    isLoading,
    error: allUsersError,
  } = useGetAllUsersQuery();
  const [
    deleteUser,
    {
      data: deletedUserData,
      isLoading: delterUserLoading,
      error: deleteUserError,
    },
  ] = useDeleteUserMutation();
  const [
    deleteUserProfile,
    { isLoading: deleteUserProfileLoading, error: deleteUserProfileError },
  ] = useDeleteUserProfileMutation();
  const [filteredUsersData, setFilteredUsersData] = useState([]);
  const [searchText, setSearchText] = useState("");
  let timer = useRef(null);
  console.log("data", users);
  //////////////////////////////useEffects
  useEffect(() => {
    if (users) {
      setFilteredUsersData(filteredDataFunc(searchText));
    }
  }, [users]);
  useEffect(() => {
    if (deletedUserData) {
      if (Object.keys(deletedUserData)?.length > 0) {
        normalToaster("Successfully user has been deleted");
      }
    }
  }, [deletedUserData]);
  //////////////////////////////////////////helpers
  const filteredDataFunc = (value) => {
    const filteredData = users.filter((user) => {
      return (
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.split("@")[0].toLowerCase().includes(value.toLowerCase())
      );
    });
    return filteredData;
  };
  ////////////////////////////////////////////////////
  const searchFunc = (value) => {
    setFilteredUsersData(filteredDataFunc(value));
  };
  const handleDeleteUser = (id) => {
    deleteUser(id);
  };
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      searchFunc(value);
    }, 500);
  };
  const handleDeleteUserProfile = (id) => {
    deleteUserProfile(id);
  };
  if (isLoading) {
    return (
      <div className=" flex w-full h-screen justify-center items-center">
        {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <>
      {allUsersError?.status === 401 ||
      deleteUserError?.status === 401 ||
      deleteUserProfileError?.status === 401 ? (
        <Logout />
      ) : (
        <>
          <div className="flex flex-col gap-10 justify-center items-center p-10">
            <Toaster />
            <div className="flex flex-row gap-20">
              <SearchBar searchText={searchText} handleSearch={handleSearch} />
              <p>Total Users:{users?.length}</p>
              <p>FilteredUsers:{filteredUsersData?.length}</p>
            </div>
            {!filteredUsersData.length ? (
              // <div className="w-full h-screen flex justify-center items-center">
              <div className="bg-pink-200 rounded-lg  h-16 flex items-center justify-center w-2/5">
                <h1 className=" text-xl text-center font-bold ">
                  No user Found with this Name or Email please search with some
                  other Name or Email
                </h1>
                {/* </div> */}
              </div>
            ) : (
              <>
                <table className="border border-black border-solid ">
                  <thead className="bg-gray-200 p-10">
                    <tr className="flex flex-row gap-10">
                      <th className="w-56">id</th>
                      <th className="w-56">Name</th>
                      <th className="w-80 ">Email</th>
                      <th className="w-8">Role</th>
                      <th className="w-18">Delete User</th>
                      <th className="w-18">Delete Profile</th>
                    </tr>
                  </thead>
                  <tbody className="flex flex-col gap-10 mt-10">
                    {filteredUsersData?.map((user) => {
                      const { username, email, _id, role, profileId } = user;
                      return (
                        <tr key={_id} className="flex flex-row gap-10">
                          <td className="w-56 ">{_id}</td>
                          <td className="w-56 overflow-x-auto">{username}</td>
                          <td className="w-80 overflow-x-auto">{email}</td>
                          <td className="w-8">{role}</td>
                          <td className="w-18">
                            <button
                              className="bg-red-300 rounded-lg shadow-lg w-20"
                              onClick={() => {
                                handleDeleteUser(_id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          <td className="w-18">
                            <button
                              disabled={!profileId}
                              onClick={() => {
                                handleDeleteUserProfile(_id);
                              }}
                              className={clsx(
                                "bg-red-300 rounded-lg shadow-lg w-20",
                                { "opacity-30": !profileId }
                              )}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default React.memo(AllUsers);
