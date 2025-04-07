// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import React from 'react';
import {Provider} from "react-redux";
import Bf from "./Battlefield/Bf.tsx";
import {store} from "./store/store.ts";
import Allquestions from "./Battlefield/Allquestions/Allquestions.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Bf/>,
        // errorElement:<ErrorPage/>,
        children:[
            {
                path:"/allquestions",
                // index,
                element: <Allquestions/>
            },
            // {
            //     path:"/login",
            //     element: <LogInWind/>
            // },
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>

    </React.StrictMode>,
)
