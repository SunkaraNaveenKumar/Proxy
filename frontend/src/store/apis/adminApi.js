import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
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
