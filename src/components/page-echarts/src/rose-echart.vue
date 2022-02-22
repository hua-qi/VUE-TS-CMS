<template>
  <div class="rose-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import { BaseEchart } from "@/base-ui/echart";
import { defineProps, computed } from "vue";
import { IDataType } from "../types";

// 定义接收父组件元素类型
const props = defineProps<{ roseData: IDataType[] }>();

// computed 响应式处理 option 数据变化
const option = computed(() => {
  return {
    legend: {
      top: "bottom",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "类别数据",
        type: "pie",
        radius: [9, 90],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: props.roseData,
      },
    ],
  };
});
</script>

<style scoped></style>
