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
// import DefaultComponent from "./Battlefield/DefaultComponent/DefaultComponent.tsx";
// import User from "./Battlefield/User/User.tsx";
import LogIn from "./Battlefield/LogIn/LogIn.tsx";
import ErrorPage from "./Errorpage/ErrorPage.tsx";
import UserData from "./Battlefield/UserData/UserData.tsx";
import ErrorTest from "./Battlefield/UserData/ErrorTest/ErrorTest.tsx";
import StarTest from "./Battlefield/UserData/StarTest/StarTest.tsx";


const router = createBrowserRouter([
    // {
    //     path: "/",
    //     element: <Bf/>,
    //     errorElement:<ErrorPage/>,
    //     children:[
    //         {
    //             index: true,
    //             element: <Tickets/>
    //         },
    //         {
    //             path:"/allquestions",
    //             element: <Allquestions/>
    //         },
    //         {
    //             path:"/search",
    //             element: <Search/>
    //         },
    //         {
    //             path:"/examticket",
    //             element: <Tickets/>,
    //         },
    //         {
    //             path:"/examticket/ticket",
    //             element: <ExamArea/>,
    //         },
    //         {
    //             path:"/userdata",
    //             element: <UserData/>,
    //             children:[
    //                 {
    //                     path:"/userdata/stars",
    //                     element: <StarTest/>
    //                 },
    //                 {
    //                     path:"/userdata/errors",
    //                     element:<ErrorTest/>
    //                 }
    //             ]
    //         },
    //         {
    //             path:"/login",
    //             element: <LogIn/>
    //         }
    //     ]
    // }

    ///

    {
        path: "/",
        element: <Bf/>,
        errorElement: <ErrorPage/>,
        children: [
            { index: true, path: "examticket", element: <Tickets/> },
            { path: "allquestions", element: <Allquestions/> },
            { path: "search", element: <Search/> },
            { path: "examticket/ticket", element: <ExamArea/> },
            { path: "userdata", element: <UserData/> },
            { path: "stars", element: <StarTest/> },
            { path: "errors", element: <ErrorTest/> },
            { path: "/login", element: <LogIn/> }
        ]
    },

]);

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>

    </React.StrictMode>,
)
