<template>
  <div class="pie-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { BaseEchart } from "@/base-ui/echart";
import { defineProps, computed } from "vue";
import { IDataType } from "../types";

// 定义接收父组件元素类型
const props = defineProps<{ pieData: IDataType[] }>();

// computed 响应式处理 option 数据变化
const option = computed(() => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      left: "left",
    },
    series: [
      {
        name: "分类数据",
        type: "pie",
        radius: "50%",
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
});
</script>

<style scoped></style>
