import { createElement, useState } from 'react';
import { Menu, Layout } from 'antd';
import * as Icon from '@ant-design/icons';
import MenuConfig from '../../../config';
import { useNavigate } from 'react-router-dom';
import { collapseMenu, selectMenuList } from "../../../store/reducers/tab";
import { useDispatch, useSelector } from 'react-redux';
import "./index.scss"

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
const PHONE_MENU_STYLES = {
    item: {
        paddingLeft: 6,
        paddingRight: 6,
    }
}


const CommonAside = () => {
    const collapsed = useSelector(state => state.tab.isCollapse);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentMenu = useSelector(state => state.tab.currentMenu);
    const [style, setStyle] = useState({
        siderWidth: 200,
        siderCollapsedWidth: 70,
        menuStyles: {}
    });
    const selectMenu = (e) => {
        //如果当前导航被重复点击，则无效果，不更新状态
        if (e.key === currentMenu.path) return;
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
            path: data.path,
            name: data.name,
            label: data.label
        }));
        navigate(e.key);
    }
    const handleBreakpoint = (e) => {
        //触发断点，小于断点宽度则为true，大于断点宽度则为false
        console.log("触发断点", e)
        if (e) setStyle({ siderWidth: 100, siderCollapsedWidth: 50, menuStyles:PHONE_MENU_STYLES});
        else setStyle({ siderWidth: 200, siderCollapsedWidth: 70,menuStyles: {}});
        // dispatch(collapseMenu(e))
    }

    return (
        <Sider
            className='sider'
            breakpoint='xs'
            collapsedWidth={style.siderCollapsedWidth}
            onBreakpoint={handleBreakpoint}
            trigger={null}
            collapsed={collapsed}
            width={style.siderWidth}
        >
            <h3 className='app-name'>{collapsed ? "后台" : "后台管理"}</h3>
            <Menu
                tooltip={{ placement: 'right' }}
                className='menu'
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['/home']}
                selectedKeys={[currentMenu.path]}
                items={items}
                onClick={selectMenu}
                styles={style.menuStyles}
            />
        </Sider>
    )
}
export default CommonAside;
