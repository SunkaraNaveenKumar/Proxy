import React, { useEffect, useState } from "react";
import { clsx } from "clsx";
import { useGetAccountDetailsQuery } from "../../store/apis/userApi";
import axios from "axios";
import useAuth from "../custom hooks/useAuth";
import loadingIcon from "../../assets/loading.svg";
import ShowFile from "../reusable components/ShowFile";
import { convertFilesToArr, normalToaster } from "../../utils/helpers";
import Toaster from "../reusable components/Toaster";
// import { useLocation } from "react-router-dom";
const UserAccount = () => {
  // const location = useLocation()
  console.log("user Account");
  const { token } = useAuth();
  const {
    data,
    isLoading,
    refetch: fetchUserAccount,
  } = useGetAccountDetailsQuery();
  // const [postAccountDetails] = usePostAccountDetailsMutation();
  // console.log("profileData",profileData)
  // console.log("profileError",profileError)
  // console.log("accountData", data);

  const [profile, setProfile] = useState({
    fullName: "",
    adharImages: [],
    adharError: "",
    panImages: [],
    panError: "",
    phoneNumber: "",
    address: "",
    isSaved: false,
  });
  // console.log("profile",profile)
  useEffect(() => {
    if (data) {
      if (Object.keys(data)?.length > 0) {
        const {
          fullName,
          address,
          panImages,
          adharImages,
          isSaved,
          phoneNumber,
        } = data;
        setProfile({
          ...profile,
          fullName,
          panImages,
          adharImages,
          phoneNumber,
          address,
          isSaved,
        });
      } else {
        setProfile({
          fullName: "",
          adharImages: [],
          adharError: "",
          panImages: [],
          panError: "",
          phoneNumber: "",
          address: "",
          isSaved: false,
        });
      }
    }
    // eslint-disable-next-line
  }, [data]);
  // useEffect(() => {
  //   refetch();
  //   console.log("refetch");
  // }, []);
  // console.log("profile", profile);
  const [errors, setErrors] = useState(null);
  const handleChange = (e) => {
    const files = e.target.files;
    const { name, value } = e.target;
    if (name === "adhar") {
      if (files?.length === 2) {
        // const newAdharArr = [];
        // for (let i of files) {
        //   newAdharArr.push(i);
        // }
        // console.log("newAdharArr", newAdharArr);
        setProfile({
          ...profile,
          adharImages: convertFilesToArr(files),
          adharError: "",
        });
      } else {
        setProfile({
          ...profile,
          adharError: "Both front and back pics of ADHAR should be uploaded",
          adharImages: [],
        });
      }
    }
    if (name === "pan") {
      if (files?.length === 2) {
        // const newPanFiles = [];
        // for (let file of files) {
        //   newPanFiles.push(file);
        // }
        setProfile({
          ...profile,
          panImages: convertFilesToArr(files),
          panError: "",
        });
      } else {
        setProfile({
          ...profile,
          panError: "Both front and back pics of PAN should be uploaded",
          panImages: [],
        });
      }
    }
    if (name === "fullName") {
      setProfile({ ...profile, fullName: value });
    }
    if (name === "phonenumber") {
      setProfile({ ...profile, phoneNumber: value });
    }
    if (name === "address") {
      setProfile({ ...profile, address: value });
    }
  };

  const handleUserDetails = (e) => {
    e.preventDefault();
    const { fullName, address, adharImages, panImages, phoneNumber } = profile;
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("address", address);
    formData.append("phoneNumber", phoneNumber);
    for (let i = 0; i < adharImages?.length; i++) {
      formData.append("adhar", adharImages[i]);
      formData.append("pan", panImages?.[i]);
    }
    // formData.append("adhar",Array.from(adharImages))
    // formData.append("pan",Array.from(panImages))
    // console.log("formData", adharImages);
    // postAccountDetails(formData)
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/user/account`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: token,
        },
      })
      .then((res) => {
        const { data } = res;
        if (data?.errors) {
          setErrors(data.errors);
        } else {
          fetchUserAccount();
          setErrors(null);
          const {
            fullName,
            address,
            phoneNumber,
            panImages,
            adharImages,
            isSaved,
          } = data;
          setProfile({
            ...profile,
            fullName,
            address,
            phoneNumber,
            panImages,
            adharImages,
            isSaved,
          });
          normalToaster("Profile got successfully saved")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("adharImages",profile.adharImages,profile.panImages, typeof profile.adharImages)
  if (isLoading) {
    return (
      <div className=" flex w-full h-screen justify-center items-center">
        {/* <p className="text-xl font-bold text-red-400">isLoading........</p> */}
        <img src={loadingIcon} alt="loading"></img>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <Toaster/>
      {errors && (
        <p className="text-red-500 text-bold text-base flex justify-center items-center mt-5">
          {errors}
        </p>
      )}

      <form
        className="flex flex-col py-10 gap-y-7 px-20"
        onSubmit={handleUserDetails}
      >
        <div className="flex flex-row flex-wrap gap-x-20">
          <div className="w-2/5 flex flex-col gap-y-2">
            <label htmlFor="fullName">Name *</label>
            <input
              id="fullName"
              type="text"
              value={profile.fullName}
              name="fullName"
              placeholder="Full Name"
              disabled={profile.isSaved}
              className={clsx(
                "border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full",
                { "opacity-30": profile.isSaved }
              )}
              onChange={handleChange}
            ></input>
          </div>
          <div className="w-2/5 flex flex-col gap-y-2">
            <label htmlFor="address">Address *</label>
            <input
              id="address"
              type="text"
              value={profile.address}
              name="address"
              placeholder="Full Addess..."
              disabled={profile.isSaved}
              className={clsx(
                "border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full",
                { "opacity-30": profile.isSaved }
              )}
              onChange={handleChange}
            ></input>
          </div>
          <div className="w-2/5 flex flex-col gap-y-2">
            <label htmlFor="mobile">Mobile *</label>
            <input
              id="mobile"
              type="number"
              value={profile.phoneNumber}
              name="phonenumber"
              placeholder="Enter your 10 digit Phone Number"
              disabled={profile.isSaved}
              onChange={(e) => {
                handleChange(e);
              }}
              className={clsx(
                "border border-solid border-black rounded-lg shadow-lg pl-6 h-10 w-full",
                { "opacity-30": profile.isSaved }
              )}
            ></input>
          </div>
        </div>

        <div className="flex flex-row gap-x-20">
          <div className="w-2/5 flex flex-col justify-end  self-start rounded-lg shadow-lg bg-red-100 gap-y-2">
            {profile.adharError && (
              <p className="text-red-500 text-bold text-md">
                {profile.adharError}
              </p>
            )}
            <div className="flex flex-row gap-x-4">
              <label
                htmlFor="adhar"
                className={clsx(
                  "w-44 h-10 flex justify-center items-center font-bold bg-blue-200 rounded-lg shadow-lg",
                  { "opacity-30": profile.isSaved }
                )}
              >
                Upload ADHAR
              </label>
              <input
                id="adhar"
                name="adhar"
                className="hidden"
                type="file"
                accept="image/*"
                disabled={profile.isSaved}
                multiple
                onChange={handleChange}
              ></input>
              {profile.adharImages && (
                <p className="text-blue-400 font-bold">
                  Uploaded {profile.adharImages.length}...
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-5">
              {profile?.adharImages?.map((file, i) => {
                return <ShowFile key={i} file={file} />;
              })}
            </div>
          </div>
          <div className="w-2/5 flex flex-col self-start justify-end shadow-lg bg-red-100 rounded-lg  gap-y-2">
            {profile.panError && (
              <p className="text-red-500 text-bold text-md">
                {profile.panError}
              </p>
            )}
            <div className="flex flex-row gap-x-4 items-center">
              <label
                htmlFor="pan"
                className={clsx(
                  "w-44 h-10 flex justify-center items-center font-bold bg-blue-200 rounded-lg shadow-lg",
                  { "opacity-30": profile.isSaved }
                )}
              >
                Upload PAN
              </label>
              <input
                id="pan"
                type="file"
                className="hidden"
                name="pan"
                disabled={profile.isSaved}
                accept="image/*"
                multiple
                onChange={handleChange}
              ></input>
              {profile.panImages && (
                <p className="text-blue-400 font-bold">
                  Uploaded {profile.panImages.length}...
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-5">
              {profile.panImages.map((file, i) => {
                return <ShowFile key={i} file={file} />;
              })}
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center">
          <input
            disabled={profile.isSaved}
            type="submit"
            value="save"
            className={clsx("bg-blue-300 rounded-lg shadow-lg px-20 py-3", {
              "opacity-30": profile.isSaved,
            })}
          ></input>
        </div>
      </form>
    </div>
  );
};

export default UserAccount;
