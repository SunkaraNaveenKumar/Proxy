import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import useAuth from "../../components/custom hooks/useAuth";
// import axios from 'axios'

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      // console.log("state", getState());
      const token = localStorage.getItem("token");
      headers.set("authorization", token);
      return headers;
    },
    // fetchFn: async (url, { method, data, headers }) => {
    //   const response = await axios({
    //     url,
    //     method,
    //     data,
    //     headers,
    //   });
    //   return response.data;
    // },
  }),
  tagTypes: ["User", "Profile", "courses", "mycourses","lectures"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: "/user/login",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (formData) => ({
        url: "/user/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (formData) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation({
      query: ({ formData, token }) => ({
        url: `/user/change-password/${token}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    getAccountDetails: builder.query({
      query: () => ({
        url: "/user/account",
        method: "GET",
      }),
      provideTags: ["Profile"],
    }),
    // postAccountDetails: builder.mutation({
    //   query: (formData) => ({
    //     url: "/user/account",
    //     method: "POST",
    //     body: { data: formData },
    //     headers: {
    //       "Content-Type": `multipart/form-data; boundary=${formData?._boundary}`,
    //     },
    //   }),
    //   invalidatesTags: ["Profile"],
    // }),
    allCourses: builder.query({
      query: () => ({
        url: "/allcourses",
        method: "GET",
      }),
      providesTags: ["courses"],
    }),
    getUserMyCourses: builder.query({
      query: () => ({
        url: "/user/mycourses",
        method: "GET",
      }),
      providesTags: ["mycourses"],
    }),
    getUserLectures:builder.query({
      query:(courseId)=>`/user/course/${courseId}/lectures`,
      providesTags:["lectures"]
    })
  }),
});
export const {
  useLoginMutation,
  useAddUserMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useGetAccountDetailsQuery,
  // usePostAccountDetailsMutation,
  useAllCoursesQuery,
  useGetUserMyCoursesQuery,
  useGetUserLecturesQuery
} = userApi;
export default userApi;
