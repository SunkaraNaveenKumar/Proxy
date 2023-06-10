import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


///////////////////////////////////// rtk admin query
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: REACT_APP_SERVER_URL,
    // fetchFn: axiosQuery,
    // onError: (error) => {
    //   // Default error handling logic
    //   console.error("API error:", error);
    // },
    prepareHeaders: (headers, { getState }) => {
      // console.log("state", getState());
      const token = localStorage.getItem("token");
      headers.set("authorization", token);
      return headers;
    },
  }),
  tagTypes: ["admin", "mycourses", "users", "lectures", "enrolledCourses"],
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (formData) => ({
        url: "/admin/login",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["admin"],
    }),
    getAdminCourses: builder.query({
      query: () => ({
        url: "/admin/mycourses",
        method: "GET",
      }),
      onError: (error) => {
        // Default error handling logic
        console.error("API error:", error);
      },
      providesTags: ["mycourses"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    deleteUserProfile: builder.mutation({
      query: (userId) => ({
        url: `/admin/user/profile/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
    addCourse: builder.mutation({
      query: (formData) => ({
        url: "/admin/courses",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["mycourses"],
    }),
    addLecture: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/admin/course/${courseId}/lecture`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["lectures"],
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/admin/course/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["mycourses"],
    }),
    getLectures: builder.query({
      query: (courseId) => ({
        url: `/admin/course/${courseId}/lectures`,
        method: "GET",
      }),
      providesTags: ["lectures"],
    }),
    getUserEnrolledCourses: builder.query({
      query: (userId) => ({
        url: `/admin/user/${userId}/courses`,
        method: "GET"
      }),
      providesTags:["enrolledCourses"]
    }),
    enrollUser: builder.mutation({
      query:({userId,courseId})=>({
        url:`/admin/enroll?userId=${userId}&courseId=${courseId}`,
       method:"PATCH"
      }),
      invalidatesTags:["enrolledCourses"]
    }),
    unEnrollUser : builder.mutation({
      query:({userId,courseId})=>({
        url:`/admin/unenroll?userId=${userId}&courseId=${courseId}`,
        method:"PATCH"
      }),
      invalidatesTags:["enrolledCourses"]
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAddCourseMutation,
  useGetAdminCoursesQuery,
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useDeleteUserProfileMutation,
  useAddLectureMutation,
  useDeleteCourseMutation,
  useGetLecturesQuery,
  useGetUserEnrolledCoursesQuery,
  useEnrollUserMutation,
  useUnEnrollUserMutation
} = adminApi;
export default adminApi
////////////////////////////////// replacing fetch with axios
// const axiosBaseQuery =
//   ({ baseUrl } = { baseUrl: REACT_APP_SERVER_URL }) =>
//   async ({ url, method, data, params }) => {
//     console.log(baseUrl+url)
//     console.log(method)
//     console.log(data)
//     console.log(params)
//     try {
//       const result = await axios({ url: baseUrl + url, method, data , params })
//       return { data: result.data }
//     } catch (axiosError) {
//       let err = axiosError
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       }
//     }
//   }
// const axiosIntance = async (baseQueryArgs, fetch, baseQueryApi) => {
//   const { url, method, body, headers } = baseQueryArgs;

//   try {
//     const response = await axios({ url, method, data: body, headers });

//     // Create a clone-like object
//     const clonedResponse = Object.assign({}, response, {
//       clone: () => axiosIntance(baseQueryArgs, fetch, baseQueryApi),
//     });

//     return {
//       data: response.data,
//       error: null,
//       status: response.status,
//       headers: response.headers,
//       config: response.config,
//       clone: clonedResponse(),
//     };
//   } catch (error) {
//     return {
//       data: null,
//       error: {
//         status: error.response?.status,
//         data: error.response?.data || error.message,
//       },
//       status: error.response?.status,
//       headers: error.response?.headers,
//       config: error.response?.config,
//       clone: null,
//     };
//   }
// };
///////////////////////////////
// const axiosQuery =async(request)=>{
//   const  {
//     url
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined
//   }=request;
//   console.log(request)
//   try {
//     const response = await fetch(url, request);

//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     const data = await response.json();

//     return { data };
//   } catch (error) {
//     return { error };
//   }

// }
////////////////////////////////////////////
// const fetchBaseQuery = async (args, api, extraOptions) => {
//   console.log(args)
//   console.log(args.prepareHeaders())
//   const { baseUrl, prepareHeaders } = extraOptions|| {};
//   const resolvedBaseUrl = baseUrl || REACT_APP_SERVER_URL;
//   const { url, method = "GET", body, prepareHeaders: customHeaders } = args;

//   const fetchUrl = `${resolvedBaseUrl}${url}`;

//   const headers = new Headers();
//   headers.set("Content-Type", "application/json");

//   if (customHeaders) {
//     Object.entries(customHeaders).forEach(([header, value]) => {
//       headers.set(header, value);
//     });
//   }

//   if (prepareHeaders) {
//     prepareHeaders(headers, args, api, extraOptions);
//   }

//   const request = {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//   };

//   try {
//     const response = await fetch(fetchUrl, request);

//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     const data = await response.json();

//     return { data };
//   } catch (error) {
//     return { error };
//   }
// };

// export default fetchBaseQuery;


/////////////////////////////////// logout function