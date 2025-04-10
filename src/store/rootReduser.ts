import {combineReducers} from "@reduxjs/toolkit";
import defSlice from './searchSlice.ts'
import styleSlice from "./styleSlise.ts";

export const rootReduser = combineReducers({
    defSlice,
    styleSlice
})