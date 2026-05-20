
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

const Mall = () => {
    const userData = useLoaderData();
    console.log("mall页面",userData);
    useEffect(() => {
        console.log("mall页面的userEffect 执行");
        return () => {
            console.log("mall页面的userEffect 清理函数")
        }
    },[])
    return (
        <div>
            商品
        </div>
    )
}

export default Mall;