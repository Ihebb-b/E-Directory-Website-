import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({ baseUrl: "/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo?.token; // Get token from redux store
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
   });
  

export const apiSlice = createApi({
  baseQuery,
  reducerPath: "api",
  tagTypes: ["User"],
  endpoints: (builder) => ({

  }),
});

