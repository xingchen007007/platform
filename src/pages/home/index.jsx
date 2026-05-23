// import { createElement } from "react";
import styles from './index.module.scss';
import { Row, Col, Card, Table } from "antd";
// import * as Icon from '@ant-design/icons';
import Echarts from '../components/Echarts/index';
import { getAssetsFile } from "../../utils";
import { useLoaderData } from "react-router-dom";
import DataCard from "./components/DataCard";
//table数据
const columns = [
    {
        title: '课程',
        dataIndex: 'name'
    },
    {
        title: '今日购买',
        dataIndex: 'todayBuy'
    },
    {
        title: '本月购买',
        dataIndex: 'monthBuy'
    },
    {
        title: '总购买',
        dataIndex: 'totalBuy'
    }
];
//订单统计数据
const countData = [
    {
        "name": "今日支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "今日收藏订单",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "今日未支付订单",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    },
    {
        "name": "本月支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "本月收藏订单",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "本月未支付订单",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    }
];
// const iconToElement = (name) => createElement(Icon[name]);
const Home = () => {
    const { tableData, lineData, barData, pieData } = useLoaderData();
    return (
        <>
            <Row gutter={[8, 8]}>
                <Col
                    className={styles.user_info}
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 8 }}
                // lg={{ flex: '30%' }}
                // xl={{ flex: '30%' }}
                // span={8}
                >
                    <Card hoverable
                        className={styles.user_card}
                    >
                        <div className={styles.container}>

                            <div className={styles.user}>
                                <img className={styles.user_img} src={getAssetsFile('user.png')} alt="用户头像无法显示" />
                                <div className={styles.userinfo}>
                                    <p className={styles.name}>Admin</p>
                                    <p className={styles.access}>超级管理员</p>
                                </div>
                            </div>
                            <div className={styles.login_info}>
                                <p>上次登录时间：<span>2021-7-19</span></p>
                                <p>上次登录地点：<span>武汉</span></p>
                            </div>
                        </div>
                    </Card>
                </Col>
                <Col
                    // className={styles.info}
                    // span={16}
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 16 }}
                // lg={{ flex: '70%' }}
                // xl={{ flex: '70%' }}
                >
                    <Row gutter={[8, 8]} className={styles.row} >
                        {countData.map((item, index) => {
                            return (
                                <Col
                                    key={index}
                                    xs={{ span: 24 }}
                                    sm={{ span: 12 }}
                                    md={{ span: 12 }}
                                    xl={{ span: 8 }}
                                >
                                    <DataCard {...item} />
                                </Col>
                            )
                        })}
                    </Row>
                </Col>
            </Row>
            <Row gutter={[8, 8]} className={styles.chartRow}>
                <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span:8}}
                >
                    <Card>
                        <Table rowKey={'name'} columns={columns} dataSource={tableData} />
                    </Card>
                </Col>
                <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span:16}}
                >
                    <Row>
                        {lineData && <Echarts style={{ height: '280px'}} chartData={lineData} />}
                    </Row>
                    <Row>
                        <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 12 }}
                        >
                            {barData && <Echarts style={{ height: '240px' }} chartData={barData} />}
                        </Col>
                        <Col
                            xs={{ span: 24 }}
                            sm={{ span: 24 }}
                            md={{ span: 12 }}
                        >
                            {pieData && <Echarts style={{ height: '260px'}} chartData={pieData} isAxisChart={false} />}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
export default Home;