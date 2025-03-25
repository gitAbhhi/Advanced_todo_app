import {configureStore}from "@reduxjs/toolkit"
import {thunk} from "redux-thunk";
import todoReducer from "./feature/todoSlice"
import authReducer from "./feature/authSlice";

export const store=configureStore({
    reducer:{
        todos:todoReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})