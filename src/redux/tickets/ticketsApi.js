import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketsApi = createApi({
    reducerPath: "ticketsApi",
    tagTypes: ["Tickets"],
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers) => {
            const authData = JSON.parse(localStorage.getItem("authData"));

            if (authData) {
                headers.set("authorization", `Bearer ${authData["access_token"]}`);
            }
        },
    }),
    endpoints: (builder) => ({
        getTickets: builder.query({
            query: (page = 1, size = 10) => `api/v1/tickets/?page=${page}&size=${size}`,
            // providesTags: (result, error, page) => result
            //   ? [
            //         ...result.map(({ id }) => ({ type: "Tickets", id })),
            //         { type: "Tickets", id: "LIST" },
            //     ]
            //   : [{ type: "Tickets", id: "LIST" }], 
        }),
        searchTicket: builder.mutation({
            query: (body) => ({
                url: `api/v1/tickets/search`,
                method: "POST",
                body,
            }),
        }),
        addTicket: builder.mutation({
            query: (body) => ({
                url: `tickets/`,
                method: "POST",
                body,
            }),
            // invalidatesTags: [{ type: "Tickets", id: "LIST" }]
        }),
        deleteTicket: builder.mutation({
            query: (id) => ({
                url: `tickets/${id}`,
                method: "DELETE"
            }),
            // invalidatesTags: [{ type: "Tickets", id: "LIST" }]
        }),
    }),
    refetchOnMountOrArgChange: true
});

export const { 
    useGetTicketsQuery,
    useSearchTicketMutation,
    useAddTicketMutation, 
    useDeleteTicketMutation 
} = ticketsApi;