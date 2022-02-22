<template>
  <div class="bar-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { BaseEchart } from "@/base-ui/echart";
import { defineProps, computed, withDefaults } from "vue";
// 引入 echarts 供 bar.option 使用
import * as echarts from "echarts";

// 定义接收父组件元素类型
const props = withDefaults(
  defineProps<{ title?: string; xLabels: string[]; values: any[] }>(),
  {
    title: "",
  }
);

// computed 响应式处理 option 数据变化
const option = computed(() => {
  return {
    xAxis: {
      data: props.xLabels,
      axisLabel: {
        inside: true,
        color: "#fff",
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "#999",
      },
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#83bff6" },
            { offset: 0.5, color: "#188df0" },
            { offset: 1, color: "#188df0" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: props.values,
      },
    ],
  };
});
</script>

<style scoped></style>
