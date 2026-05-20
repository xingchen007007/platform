import { useLoaderData } from "react-router-dom";


const PageOne = ()=>{
    const data = useLoaderData();
    console.log("PageOne",data);
    return(
        <div>
            第一个子页面
        </div>
    )
}

export default PageOne;