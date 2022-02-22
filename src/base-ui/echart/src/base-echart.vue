<template>
  <div class="base-echart">
    <!-- :style={} es6 加强语法 -->
    <div ref="echartDivRef" :style="{ width, height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from "vue";

// echart 类型
import { EChartsOption } from "echarts";
import { useEchart } from "../hooks/useEchart";

// 定义props
// withDefaults 与 defineProps 配合使用
const props = withDefaults(
  // 1.  定义泛型, 设置类型  (对比 options API 写法)
  defineProps<{
    width?: string;
    height?: string;
    options: EChartsOption;
  }>(),
  // 2. 设置默认值
  {
    width: "100%",
    height: "360px",
  }
);

const echartDivRef = ref<HTMLElement>();

onMounted(() => {
  // onMounted 使用原因
  // 1. setup 处于 create 阶段，此时 ref 并未于 html 元素进行绑定
  // 2. 为获取 echartDivRef, 将此操作置于 mounted 阶段
  const { setOptions } = useEchart(echartDivRef.value!);

  // 3. 响应式处理 props.options
  watchEffect(() => {
    setOptions(props.options);
  });
});
</script>

<style scoped></style>
