import {createElement} from 'react';
import { Menu, Layout } from 'antd';
import * as Icon from '@ant-design/icons';
import MenuConfig from '../../../config';
import { useNavigate } from 'react-router-dom';
import { selectMenuList } from "../../../store/reducers/tab";
import { useDispatch, useSelector } from 'react-redux';

const { Sider } = Layout;

//动态获取icon
const iconToElement = (name) => createElement(Icon[name]);

//递归构建items
const createItems = (config) => {
    const child = {
        key: config.path,
        label: config.label,
        icon: iconToElement(config.icon)
    }
    if (config.children) {
        child.children = config.children.map((v) => createItems(v));
    }
    return child;
}

const items = MenuConfig.map((v) => createItems(v));


const CommonAside = ({ collapsed }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentMenu = useSelector(state=>state.tab.currentMenu);
    const selectMenu = (e) => {
        //如果当前导航被重复点击，则无效果，不更新状态
        if(e.key===currentMenu.path) return;
        let data;
        for (let item of MenuConfig) {
            if (item.path === e.keyPath[e.keyPath.length - 1]) {
                if (e.keyPath.length > 1) {
                    data = item.children.find((v) => v.path === e.key)
                } else data = item;
                break;
            }
        }
        dispatch(selectMenuList({
            path:data.path,
            name:data.name,
            label:data.label
        }));
        navigate(e.key);
    }
    return (
        <Sider trigger={null} collapsed={collapsed}>
            <h3 className='app-name'>{collapsed ? "后台" : "通用后台管理系统"}</h3>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
                selectedKeys={[currentMenu.path]}
                items={items}
                style={{
                    height: '100%'
                }}
                onClick={selectMenu}
            />
        </Sider>
    )
}
export default CommonAside;
