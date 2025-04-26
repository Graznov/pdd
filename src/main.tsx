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
import Search from "./Battlefield/Search/Search.tsx";
// import Exam from "./Battlefield/Exam/Exam.tsx";
import ExamArea from "./Battlefield/Exam/ExamArea/ExamArea.tsx";
import Tickets from "./Battlefield/Exam/Tickets/Tickets.tsx";
import DefaultComponent from "./Battlefield/DefaultComponent/DefaultComponent.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Bf/>,
        // errorElement:<ErrorPage/>,
        children:[
            {
                index: true,
                element: <DefaultComponent />
            },
            {
                path:"/allquestions",
                // index,
                element: <Allquestions/>
            },
            {
                path:"/search",
                // index,
                element: <Search/>
            },
            {
                path:"/examticket",
                element: <Tickets/>,
            },
            {
                path:"/examticket/ticket",
                element: <ExamArea/>,
            },
            {
                path:"/user",
                // index,
                element:(
                    <div>
                        USER
                    </div>)
            },


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
