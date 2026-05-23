import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import styles from './login.module.scss';
import { getMenu } from "../../api";
import { useNavigate, Navigate } from "react-router-dom";
import { setTabList, setCurrentMenu } from "../../store/reducers/tab";
import { useDispatch } from "react-redux";

const DEMO_USER = {
    username: "admin",
    password: 'admin'
}
const INITIAL = {
    path: '/home',
    name: 'home',
    label: '首页'
}

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //在登录状态下，需要跳转到home
    if (localStorage.getItem('token')) {
        return <Navigate to="/home" replace />
    }
    const hanldeSubmit = (formData) => {
        if (!formData.username || !formData.password) {
            return message.open({
                type: "warning",
                content: "请输入用户名和密码"
            })
        }
        //校验通过
        getMenu(formData).then(({ data }) => {
            if (data.code === 20000) {
                //缓存token
                // console.log("缓存token");
                localStorage.setItem('token', data.data.token);
                //需要重置状态

                dispatch(setCurrentMenu(INITIAL));
                dispatch(setTabList([INITIAL]));

                navigate('/home');
            } else {
                //密码错误、找不到
                console.log(data);
            }
        })
    }

    const handleClick = () => {
        form.setFieldsValue(DEMO_USER);
    }
    return (
        <div className={styles.image_bg}>
            <Form
                form={form}
                className={styles.login_container}
                onFinish={hanldeSubmit}
            >
                <div className={styles.login_title}>后台管理</div>
                <Form.Item
                    name="username"
                // label="账号"
                // rules={[{required:true,message:"请输入账号"}]}
                >
                    <Input prefix={<UserOutlined />} placeholder="请输入账号" className={styles.el_input} />
                </Form.Item>
                <Form.Item
                    name="password"
                // label="密码"
                // rules={[{required:true,message:"请输入密码"}]}
                >
                    <Input.Password prefix={<LockOutlined />} className={styles.el_input} placeholder="请输入密码" />
                </Form.Item>
                <Form.Item className={styles.login_button}>
                    <Button type="primary" htmlType="submit">登录</Button>
                </Form.Item>
                <div >
                    <Button type="primary" className={styles.demo_button} onClick={handleClick}>演示账号登录</Button>
                </div>

            </Form>
        </div>
    )
}
export default Login;