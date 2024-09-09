import { createSlice } from "@reduxjs/toolkit";
import { endpoints } from "./authApi";

const authData = localStorage.getItem("authData");

const initialState = {
    authData: !authData ? null : JSON.parse(authData),
}

const { login, refreshToken } = endpoints;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut() {
            localStorage.removeItem("authData");

            return {
                ...initialState,
                authData: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(login.matchFulfilled, (state, action) => {
                state.authData = action.paylaod;

                localStorage.setItem("authData", JSON.stringify(action.payload));
            });
    },
});

export const { logOut } = authSlice.actions;