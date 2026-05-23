import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import styles from "./index.module.scss";

const axisOption = {
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
}

const normalOption = {
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
}

//封装echarts
const Echarts =({style,chartData,isAxisChart=true,xAxisType='category'})=>{
    const ref = useRef();
    const echartObj = useRef(null);
    useEffect(()=>{
      // console.log('初始化图表：',chartData);
      echartObj.current = echarts.init(ref.current);
      const fn = ()=>echartObj.current.resize();
      window.addEventListener('resize', fn);
      if(chartData){
        // // 获取 ECharts 实例
        // var myChart = echarts.init(document.getElementById('myChart'));
        // // 监听窗口 resize 事件
        let op;
       //设置options
       if(isAxisChart){
         //有坐标轴
         //设置X轴
         op = {...axisOption};
         op.xAxis.data = chartData.xData;
         op.series = chartData.series;
         op.xAxis.type = xAxisType;
       }else{
         //无坐标轴，例如饼图
         op = {...normalOption};
         op.series = chartData.series;
       }
       echartObj.current.setOption(op);
      }
        return ()=>{
          //销毁实例
          // console.log('销毁图表，释放资源');
          window.removeEventListener('resize',fn);
          if(echartObj.current) echartObj.current.dispose();
        }
    },[isAxisChart,chartData,xAxisType]);
    return(
        <div style={style} ref = {ref} className={styles.container}>
        </div>
    )

}
export default Echarts;