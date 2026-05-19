import { createSlice } from "@reduxjs/toolkit";

const INITIAL = {
  path: '/home',
  name: 'home',
  label: '首页'
}
const tabsSlice = createSlice({
  name: 'tab',
  initialState: {
    isCollapse: false,
    //点击过的菜单列表，用于面包屑
    tabList: [{ ...INITIAL }],
    //当前选中的菜单
    currentMenu: { ...INITIAL }
  },
  reducers: {
    collapseMenu: state => {
      // Redux Toolkit 允许在 reducers 中编写 "mutating" 逻辑。
      // 它实际上并没有改变 state，因为使用的是 Immer 库，检测到“草稿 state”的变化并产生一个全新的
      // 基于这些更改的不可变的 state。
      state.isCollapse = !state.isCollapse;
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
    }
  }
});
export const { collapseMenu, selectMenuList, closeTag,setCurrentMenu } = tabsSlice.actions;

export default tabsSlice.reducer;
