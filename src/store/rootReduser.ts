import {combineReducers} from "@reduxjs/toolkit";
import searchSlice from './searchSlice.ts'
import marafonSlice from "./marafonSlice.ts";
import styleSlice from "./styleSlise.ts";

export const rootReduser = combineReducers({
    // defSlice,
    styleSlice,
    marafonSlice,
    searchSlice
})