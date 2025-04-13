import {combineReducers} from "@reduxjs/toolkit";
import searchSlice from './searchSlice.ts'
import marafonSlice from "./marafonSlice.ts";
import styleSlice from "./styleSlise.ts";
import examSlice from "./examSlice.ts";

export const rootReduser = combineReducers({
    // defSlice,
    styleSlice,
    marafonSlice,
    searchSlice,
    examSlice
})