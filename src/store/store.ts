import {configureStore} from "@reduxjs/toolkit";
import {rootReduser} from './rootReduser.ts';

export const store = configureStore({
    reducer:rootReduser,
    devTools:true,
    middleware:getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk:true,
            serializableCheck:false
        })
});

export type AppDispatch = typeof store.dispatch;
// export type AppState = ReturnType<typeof store.dispatch>;
export type AppState = ReturnType<typeof store.getState>;