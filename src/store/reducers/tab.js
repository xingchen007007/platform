import { createSlice } from "@reduxjs/toolkit";

import  CONFIG from "../../config/index";

//依据location的pathnam进行INITIAL的设置
function init(){
  console.log("init函数执行,依据当前url设置菜单初始位置");
  //没有登录，初始值就是首页，登陆后直接到首页
  if(!localStorage.getItem('token')) return {
    path:'/home',
    name:'home',
    label:'首页'
  };
  
  let path = window.location.pathname.replace("/platform","").split('/');
  path.shift();
  //登录了，/和/login对应的是home
  
  if(path.length===1&&(path[0]===''||path[0]==='login'))
    return {
    path:'/home',
    name:'home',
    label:'首页'
  };
  let target;
  //依照二级菜单深度，没有递归
  let url = '/'+path[0];
  target = CONFIG.find(item=>item.path===url);
  if(path.length>1){
    url +='/'+path[1];
    target = target.children.find(child=>child.path===url);
  }
  
  return {path:target.path,name:target.name,label:target.label};
}
const initial_current_menu = init();

console.log("initial_current_menu:",initial_current_menu);

const tabsSlice = createSlice({
  name: 'tab',
  initialState: {
    isCollapse: true,
    //点击过的菜单列表,用于面包屑
    tabList: [{ ...initial_current_menu }],
    //当前选中的菜单
    currentMenu: { ...initial_current_menu },
    //当前是pc端还是移动端,默认pc端
    isPC:true
  },
  reducers: {
    collapseMenu:  (state, { payload: val })  => {
      state.isCollapse = val;
    },
    selectMenuList: (state, { payload: val }) => {
      state.currentMenu = val;
      //如果已经存在的tag则不需要添加
      if (!state.tabList.some(value => value.name === val.name))
        state.tabList.push(val);
    },
    closeTag: (state, { payload: val }) => {
      state.tabList = val.list;
      state.currentMenu = val.current;
    },
    setCurrentMenu:(state,{payload:val})=>{
      state.currentMenu = val;
    },
    setIsPC:(state,{payload:val})=>{
      state.isPC = val;
    }
  }
});
export const { collapseMenu, selectMenuList, closeTag,setCurrentMenu,setIsPC } = tabsSlice.actions;

export default tabsSlice.reducer;
