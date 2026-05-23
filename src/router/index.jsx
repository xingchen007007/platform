import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
// import Main from '../pages/main';
// import Home from '../pages/home/index';
// import Mall from "../pages/mall/index";
// import User from "../pages/user/index";
// import PageOne from "../pages/other/pageOne";
// import PageTwo from "../pages/other/pageTwo";
// import Login from "../pages/login/index";
import { getData, getUserListData } from "../api";
import { lazy } from "react";

export const BASE_URL = "/platform";

const routes = createBrowserRouter([
    {
        path: "/",
        Component:lazy(()=>import('../pages/main')),
        loader: () => {
            // console.log("运行/下的加载器");
            if (!localStorage.getItem('token')) return redirect('/login');
            return {};
        },
        children: [
            // 访问/platform/重定向/platform/home
            {
                path: "/",
                element: <Navigate to='home' replace />
            },
            {
                path: 'home',
                Component:lazy(()=>import('../pages/home/index')),
                loader: async () => {
                    if (!localStorage.getItem('token')) return {};
                    const data = await getData();
                    // console.log('运行home页面的加载器', data);
                    const { tableData, orderData, userData, videoData } = data.data.data;
                    // console.log("data.data",data.data);
                    //处理折线图数据
                    const keys = Object.keys(orderData.data[0]);
                    const series = [];
                    keys.forEach(key => {
                        series.push({
                            name: key,
                            type: "line",
                            data: orderData.data.map((item) => item[key])
                        })
                    });
                    return {
                        tableData,
                        lineData: { xData: orderData.date, series: series },
                        barData: {
                            xData: userData.map(item => item.date),
                            series: [
                                {
                                    name: '新增用户',
                                    type: 'bar',
                                    data: userData.map(item => item.new)
                                },
                                {
                                    name: '活跃用户',
                                    type: 'bar',
                                    data: userData.map(item => item.active)
                                }
                            ]
                        },
                        pieData: {
                            series: [
                                {
                                    type: 'pie',
                                    data: videoData,
                                }
                            ]
                        }
                    };
                }
            },
            {
                path: 'mall',
                Component:lazy(()=>import("../pages/mall/index")),
                loader: async () => {
                    if (!localStorage.getItem('token')) return {};
                    const data = await getData();
                    // console.log('运行mall页面的加载器',data);
                    // if(true){
                    //     console.log('重定向');
                    //     throw redirect('/home');
                    // }
                    return data;
                }
            },
            {
                path: 'user',
                Component: lazy(()=>import("../pages/user/index")),
                loader: async () => {
                    if (!localStorage.getItem('token')) return {};
                    const data = await getUserListData({ name: '' });
                    // console.log("运行user页面的加载器", data);
                    return data.data.list;
                }
            },
            {
                path: 'other',
                children: [
                    {
                        path: 'pageOne',
                        Component:lazy(()=>import("../pages/other/pageOne")),
                        loader: async () => {
                            if (!localStorage.getItem('token')) return {};
                            const data = await getData();
                            console.log("pageOne的loader", data);
                            return {}
                        }
                    },
                    {
                        path: "pageTwo",
                        Component: lazy(()=>import("../pages/other/pageTwo")),
                        loader: async () => {
                            if (!localStorage.getItem('token')) return {};
                            const data = await getData();
                            console.log("pageTwo的loader", data);
                            return {}
                        }
                    }
                ]
            }
        ]
    },
    {
        path:"/login",
        Component: lazy(()=>import("../pages/login/index")) ,
        // loader: () => {
        //     console.log('运行login页面加载器');
        //     return {}
        // }
    }
], { basename: BASE_URL });


export default routes;