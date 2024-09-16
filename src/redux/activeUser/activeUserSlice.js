import { createSlice } from "@reduxjs/toolkit";

const username = localStorage.getItem("username");

const initialState = {
    username: username ?? "",
};

export const activeUserSlice = createSlice({
    name: "activeUser",
    initialState,
    reducers: {
        editUsername(state, username) {
            return {
                ...initialState,
                username,
            };
        },
    },
});

export const { editUsername } = activeUserSlice.actions;