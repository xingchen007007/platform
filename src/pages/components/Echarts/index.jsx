import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

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
const Echarts =({style,chartData,isAxisChart=true})=>{
    const ref = useRef();
    const echartObj = useRef(null);
    useEffect(()=>{
      if(chartData){
        echartObj.current = echarts.init(ref.current);
        let options;
       //设置options
       if(isAxisChart){
         //有坐标轴
         //设置X轴
         axisOption.xAxis.data = chartData.xData;
         axisOption.series = chartData.series;
         options = axisOption;
       }else{
         //无坐标轴，例如饼图
         normalOption.series = chartData.series;
         options = normalOption;
       }
       echartObj.current.setOption(options);
      }
        return ()=>{
          //销毁实例
          if(echartObj.current) echartObj.current.dispose();
        }
    },[isAxisChart,chartData]);
    return(
        <div style={style} ref = {ref}>
        </div>
    )

}
export default Echarts;