import { Outlet, useLoaderData } from "react-router-dom";


const PageTwo = ()=>{
    const data = useLoaderData();
    console.log("pageTwo",data);
    return(
        <div>
            第二个子页面
            <Outlet/>
        </div>
    )
}

export default PageTwo;