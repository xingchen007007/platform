import {createElement } from "react";
import './index.scss';
import { Row, Col, Card, Table } from "antd";
import * as Icon from '@ant-design/icons';
import Echarts from '../components/Echarts/index';
import { getAssetsFile } from "../../utils";
import { useLoaderData } from "react-router-dom";

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
const iconToElement = (name)=>createElement(Icon[name]);
const Home = () => {
    const {tableData,lineData,barData,pieData} = useLoaderData();
    return (
        <Row className="home">
            <Col span={8}>
                <Card hoverable>
                    <div className="user">
                        <img src={getAssetsFile('user.png')} alt="用户头像无法显示" />
                        <div className="userinfo">
                            <p className="name">Admin</p>
                            <p className="access">超级管理员</p>
                        </div>
                    </div>
                    <div className="login-info">
                        <p>上次登录时间：<span>2021-7-19</span></p>
                        <p>上次登录地点：<span>武汉</span></p>
                    </div>
                </Card>
                <Card>
                    <Table rowKey={'name'} columns={columns} dataSource={tableData} pagination={false}/>
                </Card>
            </Col>
            <Col span={16}>
                <div className="num">
                    {
                        countData.map((item,index)=>{
                            return(
                                <Card key={index} className="el-card">
                                    <div className="icon-box" style={{backgroundColor:item.color}}>
                                        {iconToElement(item.icon)}
                                    </div>
                                    <div className="detail">
                                        <p className="num">¥{item.value}</p>
                                        <p className="txt">{item.name}</p>
                                    </div>
                                </Card>
                            )
                        })
                    }
                </div>
                {lineData&&<Echarts style={{height:'280px'}} chartData={lineData}/>}
                <div className="graph">
                    {barData&&<Echarts style={{height:'240px',width:"50%"}} chartData={barData}/>}
                    {pieData&&<Echarts style={{height:'260px',width:"50%"}} chartData={pieData} isAxisChart={false}/>}
                </div>
            </Col>
        </Row>
    )
}
export default Home;