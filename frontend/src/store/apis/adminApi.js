import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: REACT_APP_SERVER_URL }),
  tagTypes: ["admin"],
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (formData) => ({
        url: "/admin/login",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const { useAdminLoginMutation } = adminApi;
