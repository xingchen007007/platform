import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import CommonAside from './components/commonAside/index';
import CommonHeader from "./components/commonHeader/index";
import CommonTag from './components/commonTag/index';
import styles from "./index.module.scss"
import { useSelector } from 'react-redux';

const { Content } = Layout;
const Main = () => {
    const fullscreenLoading = useSelector((state)=>state.tab.fullscreenLoading);
    console.log("main页面重绘");
    return (
        <Layout className={styles.main_container}>
            <CommonAside />
            <Layout >
                <CommonHeader />
                <CommonTag />
                <Content
                    className={styles.content}
                >
                    <Outlet />
                </Content>
            </Layout>
            <Spin className={styles.spin} spinning={fullscreenLoading} size='large' fullscreen/>
        </Layout>
    );
}
export default Main;