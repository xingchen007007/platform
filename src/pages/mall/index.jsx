
import { useLoaderData } from "react-router-dom";

const Mall = ()=>{
        const userData = useLoaderData();
        console.log("页面渲染，获取路由数据：",userData);
    return (
        <div>
            商品
        </div>
    )
}

export default Mall;