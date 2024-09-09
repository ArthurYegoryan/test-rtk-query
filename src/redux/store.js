import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { authApi } from "./auth/authApi";
import { ticketsApi } from "./tickets/ticketsApi";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [ticketsApi.reducerPath]: ticketsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(ticketsApi.middleware)
})