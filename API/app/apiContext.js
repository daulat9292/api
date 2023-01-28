import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiContext = createApi({
  reducerPath: "apiContext",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
  }),

  endpoints: (builder) => ({
    //GET ALL COURSE
    getAllCourses: builder.query({
      query: () => `overView`,
    }),

    //* Get COURSE
    getSingleCourse: builder.query({
      query: (slug) => `/course/lession/${slug}`,
    }),

    //GET USER DATA
    getUserData: builder.query({
      query: () => `/me`,
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetSingleCourseQuery,
  useGetUserDataQuery,
} = apiContext;
