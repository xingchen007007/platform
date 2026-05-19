import { Button, Form, Input,message } from "antd";
import './login.css';
import { getMenu } from "../../api";
import { useNavigate,Navigate } from "react-router-dom";


const Login = ()=>{
    const navigate = useNavigate();
    //在登录状态下，需要跳转到home
    if(localStorage.getItem('token')){
        return <Navigate to="/home" replace/>
    }
    const hanldeSubmit = (formData)=>{
        if(!formData.username||!formData.password){
            return message.open({
                type:"warning",
                content:"请输入用户名和密码"
            })
        }
        //校验通过
        getMenu(formData).then(({data})=>{
            if(data.code===20000){
                //缓存token
                console.log("缓存token");
                localStorage.setItem('token',data.data.token);
                navigate('/home');
            }else{
                //密码错误、找不到
                console.log(data);
            }
        })
    }
    return(
        <Form 
            className="login-container"
            onFinish={hanldeSubmit}
        >
            <div className="login_title">系统登录</div>
            <Form.Item
                name="username"
                label="账号"
                // rules={[{required:true,message:"请输入账号"}]}
            >
                <Input placeholder="请输入账号" className="el-input"/>
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                // rules={[{required:true,message:"请输入密码"}]}
            >
                <Input.Password className="el-input" placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item className="login-button">
                <Button  type="primary" htmlType="submit">登录</Button>
            </Form.Item>
        </Form>
    )
}
export default Login;