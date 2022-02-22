import * as echarts from "echarts";

// 引入 中国地图数据并注册
import ChinaMapData from "../data/China.json";

echarts.registerMap("China", ChinaMapData);

export function useEchart(el: HTMLElement) {
  // 1. echart 初始化
  const echartsInstance = echarts.init(el);

  // 2. 传入 参数配置
  const setOptions = (options: echarts.EChartsOption) => {
    echartsInstance.setOption(options);
  };

  // 3. echarts 重置大小 方法
  const updateSize = () => {
    echartsInstance.resize();
  };

  // 4. echarts 跟随 window 变化而变化
  window.addEventListener("resize", () => {
    echartsInstance.resize();
  });

  // 5. 对象方式导出
  // 5.1. 元组方式, [] 要求引入时必须全部引入
  // 5.2. 对象方式, {} 引入时根据所需引入
  return {
    echartsInstance,
    setOptions,
    updateSize,
  };
}
