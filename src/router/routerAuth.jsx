import { Navigate } from "react-router-dom";

const RouterAuth = ({children})=>{
    const token = localStorage.getItem('token');
    //未登录
    if(!token){
        return (<Navigate to="/login" replace/>)
    }
    return (
        children
    )
}

export default RouterAuth;