import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import CommonAside from './components/commonAside/index';
import CommonHeader from "./components/commonHeader/index";
import CommonTag from './components/commonTag/index';
import "./index.scss"

const { Content } = Layout;
const Main = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    console.log("main页面重绘");

    return (
        <Layout className='main-container'>
            <CommonAside />
            <Layout>
                <CommonHeader />
                <CommonTag />
                <Content
                    className='content'
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
export default Main;