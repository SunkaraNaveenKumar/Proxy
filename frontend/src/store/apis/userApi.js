import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (formData) => ({
        url: "user/login",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    addUser: builder.mutation({
      query: (formData) => ({
        url: "user/register",
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
  }),
});
export const {
  useLoginMutation,
  useAddUserMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
} = userApi;
