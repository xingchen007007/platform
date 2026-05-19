import { Space, Tag } from "antd";
import './index.css';
import { useDispatch, useSelector } from "react-redux";
import { closeTag,setCurrentMenu } from "../../../store/reducers/tab";
import { useNavigate } from "react-router-dom";

const INITIAL = {
  path: '/home',
  name: 'home',
  label: '首页'
}

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList);
    const currentMenu = useSelector(state => state.tab.currentMenu);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClose = (item, index) => {
        //需要在这里计算然后重定向
        //关闭tag，计算下一个选中tag，按照添加的顺序
        //后面还有有tag则选中后面一个；如果关闭的是最后一个，前面有tag则选中前面一个；关闭最后一个tag，如果是home则跳过关闭，否则初始化为home
        let cur,list,target;
        if (tabList.length === 1) {
            //只有一个tag，且不在home页面
            cur={ ...INITIAL};
            list = [{...INITIAL}];
            target = INITIAL.path;   
        } else {
            //有两个及以上的tag
            if (index < tabList.length - 1) {
                cur = { ...tabList[index + 1] }
            } else {
                //删除的是最后一个标签，则需要往前找
                cur = { ...tabList[index - 1] }
            }
            target = cur.path;
            list = tabList.toSpliced(index, 1);
        }
        navigate(target);
        dispatch(closeTag({ current:cur, list }));
    }
    const handleChange = (item) => {
        //需要修改current，然后进行跳转
        navigate(item.path);
        dispatch(setCurrentMenu(item));
    }
    return (
        <Space className="common-tag" wrap>
            {
                tabList.map((item, index,tabs) => {
                    let flag = currentMenu.name === item.name;
                    //只有一个tag且为首页，则不可关闭
                    let closable = !(currentMenu.name==='home'&&tabs.length===1);
                    return (flag ?
                        <Tag
                            className="tag"
                            closable={closable}
                            key={item.name}
                            variant="solid"
                            color="processing"
                            onClose={() => handleClose(item, index)}
                        >
                            {item.label}
                        </Tag>
                        :
                        <Tag onClick={() => handleChange(item)} key={item.name} variant="outlined" color="default" className="tag">
                            {item.label}
                        </Tag>
                    )
                })
            }
        </Space>
    )
}
export default CommonTag;