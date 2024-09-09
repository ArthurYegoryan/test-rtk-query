import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({baseUrl: "/api"}),
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                mode: "no-cors",
                url: `jwt/login`,
                method: "POST",
                body,
            }),
        }),
        refreshToken: build.mutation({
            query: (body) => ({
                mode: "no-cors",
                url: `jwt/refresh`,
                method: "POST",
                body,
            }),
        }),
    })
});

export const { 
    endpoints,
    useLoginMutation, 
    useRefreshTokenMutation 
} = authApi;