import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slice.js";

const store = configureStore({
    reducer:{
        books: bookSlice,
    },
});

export default store;
