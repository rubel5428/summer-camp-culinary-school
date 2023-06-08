import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../pages/Home/Home/Home";
import NotFound from "../component/NotFound/NotFound";
import SignUp from "../pages/Shared/SignUp/SignUp";
import Login from "../pages/Login/Login";

  export const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path:'*',
        element:<NotFound></NotFound>
    }
  ])