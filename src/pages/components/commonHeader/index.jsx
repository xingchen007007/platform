
import {Button,Layout,Avatar,Dropdown } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import {collapseMenu} from '../../../store/reducers/tab';
import { useNavigate } from 'react-router-dom';
import { getAssetsFile } from '../../../utils';

const {Header} = Layout;

const CommonHeader = ()=>{
  const collapsed = useSelector(state=>state.tab.isCollapse);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function logOut(){
      //清除token
      localStorage.removeItem('token');
      navigate('/login');
    }
    function handleClick(){
        dispatch(collapseMenu(!collapsed));
    }

    const items = [
      {
        key: '1',
        label: (
          <a target="_blank" rel="noopener noreferrer" >
            个人中心
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a onClick={logOut} target="_blank" rel="noopener noreferrer" >
            退出
          </a>
        ),
        // icon: <DownOutlined />,
        // disabled: true,
      }
    ];

    return(
        <Header className='header-container' >
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={handleClick}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 32,
                    backgroundColor:'#fff'
                }}
            />
            <Dropdown menu={{items}}>
                <Avatar size={36} src={<img src={getAssetsFile("user.png")} alt="图片无法显示"/>}/>
            </Dropdown>
        </Header>
    )
}

export default CommonHeader;