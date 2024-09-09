import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSelector } from "react-redux";

export const ticketsApi = createApi({
    reducerPath: "ticketsApi",
    tagTypes: ["Tickets"],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers) => {
            const token = useSelector((state) => state.auth.authData?.access_token);

            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
        },
    }),
    endpoints: (build) => ({
        getTickets: build.query({
            query: () => `api/v1/tickets/`,
            providesTags: (result) => result
              ? [
                    ...result.map(({ id }) => ({ type: "Tickets", id })),
                    { type: "Tickets", id: "LIST" },
                ]
              : [{ type: "Tickets", id: "LIST" }], 
        }),
        addTicket: build.mutation({
            query: (body) => ({
                url: `tickets/`,
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Tickets", id: "LIST" }]
        }),
        deleteTicket: build.mutation({
            query: (id) => ({
                url: `tickets/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [{ type: "Tickets", id: "LIST" }]
        }),
    })
});

export const { useGetTicketsQuery, useAddTicketMutation, useDeleteTicketMutation } = ticketsApi;