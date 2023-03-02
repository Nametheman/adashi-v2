/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: "adashiWebApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://api.adashiesusuakawo.com",
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      // const clientJwtToken = process.env.REACT_APP_AUTH_TOKEN;
      const clientJwtToken = localStorage.getItem("token");
      if (clientJwtToken) {
        headers.set("authorization", `Bearer ${clientJwtToken}`);
        //set domain as header
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
