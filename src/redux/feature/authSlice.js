import { createSlice } from "@reduxjs/toolkit";

//Check if user is already logged in (persist state)
const initialState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    user: localStorage.getItem("user") || null, // Store username if needed
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload; // Store username
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", action.payload);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("isAuthenticated");
            localStorage.removeItem("user");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
