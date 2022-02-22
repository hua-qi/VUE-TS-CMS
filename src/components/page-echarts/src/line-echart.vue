<template>
  <div class="line-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { BaseEchart } from "@/base-ui/echart";
import { defineProps, computed, withDefaults } from "vue";

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
    title: {
      text: props.title,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.xLabels,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "分别销量",
        type: "line",
        stack: "总量",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
        data: props.values,
      },
    ],
  };
});
</script>

<style scoped></style>
