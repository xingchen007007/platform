import {  Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import CommonAside from './components/commonAside/index';
import CommonHeader from "./components/commonHeader/index";
import CommonTag from './components/commonTag/index';
import { useSelector } from 'react-redux';
import RouterAuth from '../router/routerAuth'; 
const {  Content } = Layout;
const Main = () => {
    const collapsed = useSelector(state=>state.tab.isCollapse);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <RouterAuth>

            <Layout className='main-container'>
                <CommonAside collapsed={collapsed}/>
                <Layout>
                    <CommonHeader collapsed={collapsed}  />
                    <CommonTag/>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </RouterAuth>
    );
}
export default Main;