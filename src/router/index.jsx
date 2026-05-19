import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from '../pages/main';
import Home from '../pages/home/index';
import Mall from "../pages/mall/index";
import User from "../pages/user/index";
import PageOne from "../pages/other/pageOne";
import PageTwo from "../pages/other/pageTwo";
import Login from "../pages/login/index";
import { getData } from "../api";

const routes = createBrowserRouter([
    {
        path: "/",
        Component: Main,
        children: [
            //访问/management-platform重定向/management-platform/home
            {
                path: "/",
                element: <Navigate to='home' replace />
            },
            {
                path: 'home',
                Component: Home,
            },
            {
                path: 'mall',
                Component: Mall,
                loader: async () => {
                    const data = await getData();
                    console.log('mall的loder加载');
                    // if(true){
                    //     console.log('重定向');
                    //     throw redirect('/home');
                    // }

                    return data;
                }
            },
            {
                path: 'user',
                Component: User
            },
            {
                path: 'other',
                children: [
                    {
                        path: 'pageOne',
                        Component: PageOne
                    },
                    {
                        path: "pageTwo",
                        Component: PageTwo
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        Component: Login
    }
], { basename: "/platform" });
export default routes;